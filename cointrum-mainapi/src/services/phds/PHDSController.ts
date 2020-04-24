import GenericController from "../../utils/GenericController";
import PHDSElement, { IPHDSElement } from "../../models/PHDSElement";
import BinanceAPI from "../../utils/markets/BinanceAPI";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
  IExchanges,
} from "../../types/exchange";
import ICandle from "../../utils/markets/types/ICandle";
import IMarket from "../../utils/markets/IMarket";
import subtractTime from "../../utils/math/TimeSubtractor";

export default class PHDSController extends GenericController<IPHDSElement> {
  private exchange: IExchanges;
  private basecurrency: IBaseCurrencies;
  private altcurrency: IAltCurrencies;
  private interval: ICycleDurations;
  constructor(
    exchange: IExchanges,
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations
  ) {
    super(PHDSElement(exchange, basecurrency, altcurrency, interval));

    this.exchange = exchange;
    this.basecurrency = basecurrency;
    this.altcurrency = altcurrency;
    this.interval = interval;
  }

  async getCandleSticks(
    start?: number,
    end?: number,
    recretry?: boolean
  ): Promise<IPHDSElement[]> {
    // By default set startTime for last interval (current time - interval)

    const currentTime = new Date().getTime(); // in UTC milliseconds

    let startTime = start ? start : subtractTime(currentTime, this.interval);

    let query: any = {
      _id: { $gte: startTime },
    };

    if (end) {
      query = {
        ...query,
        closeTime: { $lte: end },
      };
    }

    // First check if current Info is in Mongo
    let results = await this.queryDocuments(query);

    // If end is included make sure, we have all data up to endtime (within an interval) Or else all data up to current time

    let missingZones = this.findMissingZones(
      results,
      currentTime,
      startTime,
      end
    );

    if (missingZones.length === 0) {
      // IF SO return that info
      return results;
    } else {
      // ELSE GET Info from api, add to Mongo, then return to user
      let marketAPI: IMarket;
      switch (this.exchange) {
        case "Binance":
          marketAPI = new BinanceAPI();
          break;
        default:
          throw new Error("Requesting Exchange that doesn't exist");
      }
      let freshresults: IPHDSElement[] = [...results];
      for (const missingZone of missingZones) {
        const candles = await marketAPI.getCandleSticks(
          this.basecurrency,
          this.altcurrency,
          this.interval,
          missingZone[0],
          missingZone[1]
        );

        let docPromises: Promise<IPHDSElement>[] = [];

        for (const candle of candles) {
          const phdsdoc = {
            _id: candle.openTime, // ID of document is openTime
            ...candle,
          } as any;

          docPromises.push(this.createDocument(phdsdoc));
        }

        const tresults = await Promise.all(docPromises);
        freshresults = [...freshresults, ...tresults];
      }

      // Not with additional zones added, Resort the result array
      freshresults.sort((a, b) => a._id - b._id);

      if (!start && freshresults.length === 0) {
        // if binance doesn't have any now, pull an earlier interval
        return this.getCandleSticks(
          subtractTime(startTime, this.interval),
          end,
          true
        );
      } else {
        return freshresults;
      }
    }
  }

  findMissingZones(
    phdselements: IPHDSElement[],
    currentTime: number,
    start: number,
    end?: number
  ): Array<[number, number]> {
    if (phdselements.length === 0) {
      return [[start, currentTime]];
    }

    let untouchedZones: Array<[number, number]> = [];
    let startidx = 0;
    let currentValue = phdselements[0];

    // Check for Missing Zone from Start to first Element
    if (start < subtractTime(currentValue.openTime, this.interval)) {
      untouchedZones.push([start, currentValue.openTime - 1]);
    }

    // Find Missing Sections between PHDS Elements
    for (let x = 1; x < phdselements.length; x++) {
      const nextValue = phdselements[x];

      if (nextValue.openTime === currentValue.closeTime + 1) {
        startidx = x;
      } else {
        untouchedZones.push([
          phdselements[startidx].closeTime + 1,
          nextValue.openTime - 1,
        ]);
      }
      currentValue = nextValue;
    }

    // Add Section from after last PHDS Element to `end`
    if (
      !end &&
      currentValue.closeTime < subtractTime(currentTime, this.interval)
    ) {
      untouchedZones.push([currentValue.closeTime + 1, currentTime - 1]);
    } else if (
      end &&
      currentValue.closeTime < subtractTime(end, this.interval)
    ) {
      untouchedZones.push([currentValue.closeTime + 1, end - 1]);
    }

    return untouchedZones;
  }
}
