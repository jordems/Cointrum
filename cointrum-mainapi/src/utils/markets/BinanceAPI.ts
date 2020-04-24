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

  getCandleSticks(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: number,
    end?: number
  ): Promise<ICandle[]> {
    let candleParams = {
      symbol: `${basecurrency}${altcurrency}`,
      interval: interval as CandleChartInterval,
    } as CandlesOptions;

    if (start) {
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

    return this.client.candles(candleParams);
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
