import BinanceClient, {
  Binance,
  CandleChartInterval,
  Candle,
  ReconnectingWebSocketHandler,
  CandlesOptions,
} from "binance-api-node";

import dotenv from "dotenv";
import IMarket from "./IMarket";
import ICandle from "./types/ICandle";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../../types/exchange";

import { cycledurations } from "../../types/exchange/cycledurations";
import { IPHDSElement } from "../../models/PHDSElement";
import subtractTime from "../math/TimeSubtractor";
dotenv.config();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET_KEY;

export default class BinanceAPI implements IMarket {
  private client: Binance;

  constructor() {
    if (!apiKey || !apiSecret) {
      throw new Error("Set Binace API Key in .env File");
    }

    this.client = BinanceClient({
      apiKey,
      apiSecret,
    });
  }

  async getCandleSticks(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: number,
    end?: number,
    lastknowndocument?: IPHDSElement
  ): Promise<ICandle[]> {
    let candleParams = {
      symbol: `${basecurrency}${altcurrency}`,
      interval: interval as CandleChartInterval,
    } as CandlesOptions;

    if (lastknowndocument) {
      candleParams = {
        ...candleParams,
        startTime: lastknowndocument.close,
      };
    } else if (start) {
      candleParams = {
        ...candleParams,
        startTime: start,
      };
    }

    if (end) {
      candleParams = {
        ...candleParams,
        endTime: end,
      };
    }
    const currentTime = new Date().getTime();

    try {
      const results = (await this.client.candles(candleParams)) as ICandle[];

      if (results.length === 0) {
        return results;
      } else {
        if (
          end &&
          results[results.length - 1].closeTime < subtractTime(end, interval)
        ) {
          const section = await this.getCandleSticks(
            basecurrency,
            altcurrency,
            interval,
            results[results.length - 1].closeTime,
            end
          );

          return [...results, ...section];
        } else if (
          !end &&
          results[results.length - 1].closeTime <
            subtractTime(currentTime, interval)
        ) {
          const section = await this.getCandleSticks(
            basecurrency,
            altcurrency,
            interval,
            results[results.length - 1].closeTime,
            currentTime
          );

          return [...results, ...section];
        } else {
          return [...results];
        }
      }
    } catch (e) {
      throw new Error("Failed to Get Results from Binance API");
    }
  }

  getLiveCandleSocket(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    callback: (ticker: Candle) => void
  ): ReconnectingWebSocketHandler {
    return this.client.ws.candles(
      `${basecurrency}${altcurrency}`,
      interval as CandleChartInterval,
      callback
    );
  }
}
