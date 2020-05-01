import GenericController from "../../utils/GenericController";
import PHDSElement, { IPHDSElement } from "../../models/PHDSElement";
import BinanceAPI from "../../utils/markets/BinanceAPI";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
  IExchanges,
} from "../../types/exchange";
import IMarket from "../../utils/markets/IMarket";
import subtractTime from "../../utils/math/TimeSubtractor";
import { ema } from "../../utils/math/indicators/ema";
import { atr } from "../../utils/math/indicators/atr";
import { bollingerband } from "../../utils/math/indicators/bollingerband";
import { elderray } from "../../utils/math/indicators/elderray";
import { forceindex } from "../../utils/math/indicators/forceindex";
import { macd } from "../../utils/math/indicators/macd";
import { IBaseIndicator } from "../../utils/math/indicators/IBaseIndicator";
import { rsi } from "../../utils/math/indicators/rsi";

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

  async getPHDS(start?: number, end?: number): Promise<IPHDSElement[]> {
    // By default set startTime for last interval (current time - interval)
    const currentTime = new Date().getTime(); // in UTC milliseconds

    let startTime = start ? start : subtractTime(currentTime, this.interval);

    // First check if current Info is in db
    const results = await this.getExistingDBResults(startTime, end);

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
        const fullresults = await marketAPI.getCandleSticks(
          this.basecurrency,
          this.altcurrency,
          this.interval,
          subtractTime(missingZone[0], this.interval, 30), // Get 30 extra prev results for indicators
          missingZone[1]
        );

        let candles = fullresults.slice(30);

        // Add Indicators to data
        const indicators = [
          atr,
          bollingerband,
          elderray,
          ema,
          forceindex,
          macd,
          rsi,
        ];

        for (const indicator of indicators) {
          indicator(candles, fullresults);
        }

        let docPromises: Promise<IPHDSElement>[] = [];

        for (const candle of candles) {
          let phdsdoc = {
            _id: candle.openTime, // ID of document is openTime
            ...candle,
          } as any;

          // Add Indicators

          docPromises.push(this.createDocument(phdsdoc));
        }

        let tresults = await Promise.all(docPromises);
        freshresults = [...freshresults, ...tresults];
      }

      // Not with additional zones added, Resort the result array
      freshresults.sort((a, b) => a._id - b._id);

      if (!start && freshresults.length === 0) {
        // if binance doesn't have any now, pull an earlier interval
        return this.getPHDS(subtractTime(startTime, this.interval), end);
      } else {
        return freshresults;
      }
    }
  }

  private getExistingDBResults(start?: number, end?: number) {
    let query: any = {
      _id: { $gte: start },
    };

    if (end) {
      query = {
        ...query,
        closeTime: { $lte: end },
      };
    }

    return this.queryDocuments(query);
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
