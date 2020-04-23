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

  async getCandleSticks(start?: number, end?: number): Promise<IPHDSElement[]> {
    console.log("Called phdsController getCandleSticks");

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

    console.log("Generated Query at Time", currentTime, query);

    // First check if current Info is in Mongo
    const results = await this.queryDocuments(query);

    console.log("Query Results Recieved", results.length);
    // If end is included make sure, we have all data up to endtime (within an interval) Or else all data up to current time
    if (
      results.length > 0 &&
      ((!end &&
        results[results.length - 1].closeTime >=
          subtractTime(currentTime, this.interval)) ||
        (end &&
          results[results.length - 1].closeTime >=
            subtractTime(end, this.interval)))
    ) {
      console.log("Contains all needed Results, Return");
      // IF SO return that info
      return results;
    }
    //return results;
    else {
      console.log("Doesn't Contain all needed results, Get Results");
      // ELSE GET Info from api, add to Mongo, then return to user
      let marketAPI: IMarket;
      switch (this.exchange) {
        case "Binance":
          marketAPI = new BinanceAPI();
          break;
        default:
          throw new Error("Requesting Exchange that doesn't exist");
      }

      const candles = await marketAPI.getCandleSticks(
        this.basecurrency,
        this.altcurrency,
        this.interval,
        startTime,
        end
      );
      console.log("Got results from marketAPI", candles.length);

      // Add Extra information to Candles
      let docPromises: Promise<IPHDSElement>[] = [];

      for (const candle of candles) {
        const phdsdoc = {
          _id: candle.openTime, // ID of document is openTime
          ...candle,
        } as any;

        docPromises.push(this.createDocument(phdsdoc));
      }
      console.log("Setup Document Creation Promises");
      const results = await Promise.all(docPromises);
      console.log("Finished Document Creation Promises");

      if (!start && docPromises.length === 0) {
        // if binance doesn't have any now, pull an earlier interval
        // TODO May Tank perfomance if binance servers go down
        return this.getCandleSticks(subtractTime(startTime, this.interval));
      } else {
        return results;
      }
    }
  }
}
