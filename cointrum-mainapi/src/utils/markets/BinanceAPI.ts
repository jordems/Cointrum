import BinanceClient, {
  Binance,
  CandleChartInterval,
  Candle,
  ReconnectingWebSocketHandler,
  CandlesOptions,
  CandleChartResult,
} from "binance-api-node";

import dotenv from "dotenv";
import IMarket from "./IMarket";
import ICandle from "./types/ICandle";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../../types/exchange";
import ICurrencyPair from "../../types/ICurrencyPair";

dotenv.config();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET_KEY;

export const BINANCE_INIT_START_TIME = 1493929128000;
export const BINANCE_PAGINATION_INTERVAL = 1000;
export const BINANCE_REQUESTS_PER_MINUTE = 5;

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

  public getMarketName(): string {
    return "Binance";
  }

  public getRequestsPerMinute(): number {
    return BINANCE_REQUESTS_PER_MINUTE;
  }

  public async getCandleSticks(
    currencyPair: ICurrencyPair,
    start?: number,
    end?: number
  ): Promise<ICandle[]> {
    let candleParams = {
      symbol: `${currencyPair.basecurrency}${currencyPair.altcurrency}`,
      interval: currencyPair.interval as CandleChartInterval,
      limit: 1000,
    } as CandlesOptions;

    if (start) {
      // Start of Binance History
      candleParams = {
        ...candleParams,
        startTime: start,
      };
    } else {
      // Start of Binance History
      candleParams = {
        ...candleParams,
        startTime: 1493929128000,
      };
    }

    if (end) {
      candleParams = {
        ...candleParams,
        endTime: end,
      };
    }

    try {
      const results = await this.client.candles(candleParams);

      return this.convertToICandle(results);
    } catch (e) {
      console.log(e);
      throw new Error("Failed to Get Results from Binance API");
    }
  }

  private convertToICandle(results: CandleChartResult[]): ICandle[] {
    let candles: ICandle[] = [];
    for (const ele of results) {
      candles.push({
        discriminator: "ICANDLE",
        ...ele,
      });
    }
    return candles;
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

  public getInitialStartTime() {
    return BINANCE_INIT_START_TIME;
  }

  public getPaginationInterval() {
    return BINANCE_PAGINATION_INTERVAL;
  }
}
