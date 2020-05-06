import GenericController from "../../utils/GenericController";
import PHDSElement, { IPHDSElement } from "../../models/PHDSElement";
import BinanceAPI, {
  BINANCE_INIT_START_TIME,
} from "../../utils/markets/BinanceAPI";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
  IExchanges,
} from "../../types/exchange";
import IMarket from "../../utils/markets/IMarket";
import subtractTime from "../../utils/math/TimeSubtractor";
import { IndicatorDecorator } from "../../utils/math/IndicatorDecorator";
import ICandle from "../../utils/markets/types/ICandle";
import APILimiter from "../../utils/markets/APILimiter";

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

    const startTime = start ? start : subtractTime(currentTime, this.interval);

    const endTime = end ? end : currentTime;

    // First check if current Info is in db
    const results = await this.getExistingDBResults(startTime, endTime);

    // Check if there is any missing zones in data
    let missingZones = this.findMissingZones(results, startTime, endTime);

    if (missingZones.length === 0) {
      return results;
    } else {
      // ELSE Fill mongo with data upto and including current current query. Then return current query
      let lastKnownDocuments = await this.queryDocuments(
        {},
        { openTime: -1 },
        30
      );
      lastKnownDocuments = results.reverse();
      console.log("He");
      let marketAPI: IMarket;
      switch (this.exchange) {
        case "Binance":
          try {
            marketAPI = APILimiter.getInstance(new BinanceAPI());
          } catch (e) {
            console.log(e);
            throw new Error(e);
          }
          break;
        default:
          throw new Error("Requesting Exchange that doesn't exist");
      }

      let finalresults: IPHDSElement[] = [...results];
      const timeofLastCandleLoaded = lastKnownDocuments[
        lastKnownDocuments.length - 1
      ]
        ? lastKnownDocuments[lastKnownDocuments.length - 1].closeTime
        : marketAPI.getInitialStartTime();
      const PAGINATION_LIMIT = marketAPI.getPaginationInterval();
      const TIME_DIFF = endTime - timeofLastCandleLoaded;
      const NUM_CYCLES = TIME_DIFF / (60000 * PAGINATION_LIMIT);

      let sectionPromises: Promise<ICandle[]>[] = [];

      // Get all Results from market API
      for (let x = 0; x < NUM_CYCLES; x++) {
        sectionPromises.push(
          new Promise(async (res, rej) => {
            const timeSectionStart =
              timeofLastCandleLoaded + x * 60000 * PAGINATION_LIMIT;
            const timeSectionEnd =
              timeofLastCandleLoaded + (x + 1) * 60000 * PAGINATION_LIMIT - 1;

            console.log(
              `cycle ${x}: TIME:${timeSectionStart}-${timeSectionEnd}`
            );

            marketAPI
              .getCandleSticks(
                this.basecurrency,
                this.altcurrency,
                this.interval,
                timeSectionStart,
                timeSectionEnd
              )
              .then((candles) => {
                console.log(
                  `cycle ${x}: FINISHED getting Candles ${candles.length}`
                );
                res(candles);
              })
              .catch((e) => {
                rej(e);
              });
          })
        );
      }

      let candleSections: ICandle[][] = [];
      try {
        candleSections = await Promise.all(sectionPromises);
      } catch (e) {
        throw new Error(e);
      }

      candleSections[0] = IndicatorDecorator(candleSections[0]);
      for (let x = 1; x < candleSections.length; x++) {
        console.log(`cycle ${x - 1}: Finished Decorating Indicators`);
        candleSections[x] = IndicatorDecorator(
          candleSections[x],
          candleSections[x - 1]
        );
      }
      // candles = IndicatorDecorator(candles, lastKnownDocuments);

      // let phdsdocs = [];

      // for (const candle of candles) {
      //   let phdsdoc = {
      //     _id: candle.openTime, // ID of document is openTime
      //     ...candle,
      //   } as any;

      //   phdsdocs.push(phdsdoc);
      // }

      // try {
      //   const section = await this.insertBatch(phdsdocs);
      //   res(section);
      // } catch (e) {
      //   rej(e);
      //   return;
      // }

      // Not with additional zones added, Resort the result array
      //freshresults.sort((a, b) => a._id - b._id);
      console.log("end");
      if (!start && finalresults.length === 0) {
        // if binance doesn't have any now, pull an earlier interval
        return this.getPHDS(subtractTime(startTime, this.interval), endTime);
      } else {
        return finalresults.filter((ele) => ele.openTime >= startTime);
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
    start: number,
    end: number
  ): Array<[number, number]> {
    if (phdselements.length === 0) {
      return [[start, end]];
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
    if (end && currentValue.closeTime < subtractTime(end, this.interval)) {
      untouchedZones.push([currentValue.closeTime + 1, end - 1]);
    }

    return untouchedZones;
  }
}
