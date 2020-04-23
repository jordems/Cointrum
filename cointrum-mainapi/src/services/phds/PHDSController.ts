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
  constructor() {
    super(PHDSElement);
  }

  async getCandleSticks(
    exchange: IExchanges,
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: string,
    end?: string
  ): Promise<IPHDSElement[]> {
    // By default set startTime for last interval (current time - interval)
    let startTime = start
      ? new Date(start)
      : subtractTime(new Date(), interval);

    let query: any = {
      openTime: { $gte: startTime },
    };

    if (end) {
      query = {
        ...query,
        closeTime: { $lte: new Date(end) },
      };
    }

    // First check if current Info is in Mongo
    const results = await this.queryDocuments(query);

    // If end is included make sure, we have all data up to endtime (within an interval)
    if (
      results.length > 0 &&
      (!end ||
        results[results.length - 1].closeTime >=
          subtractTime(new Date(end), interval))
    ) {
      // IF SO return that info
      return results;
    } else {
      // ELSE GET Info from api, add to Mongo, then return to user
      let marketAPI: IMarket;
      switch (exchange) {
        case "Binance":
          marketAPI = new BinanceAPI();
          break;
        default:
          throw new Error("Requesting Exchange that doesn't exist");
      }

      const candles = await marketAPI.getCandleSticks(
        basecurrency,
        altcurrency,
        interval,
        start,
        end
      );

      // Add Extra information to Candles
      let docPromises: Promise<IPHDSElement>[] = [];

      for (const candle of candles) {
        //TODO FIX
        //@ts-ignore
        const phdsdoc = {
          ...candle,
          exchange,
          basecurrency,
          altcurrency,
        } as IPHDSElement;

        docPromises.push(this.createDocument(phdsdoc));
      }

      const results = await Promise.all(docPromises);

      return results;
    }
  }
}
