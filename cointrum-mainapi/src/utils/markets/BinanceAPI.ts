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

dotenv.config();

const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_API_SECRET_KEY;

export const BINANCE_INIT_START_TIME = 1493929128000;
export const BINANCE_PAGINATION_INTERVAL = 1000;
export const BINANCE_REQUESTS_PER_MINUTE = 1000;

export default class BinanceAPI implements IMarket {
  private static instance: BinanceAPI;
  private client: Binance;
  private requestCountReseter: NodeJS.Timeout;
  private requestsPerMinute: number;

  private constructor() {
    if (!apiKey || !apiSecret) {
      throw new Error("Set Binace API Key in .env File");
    }
    this.requestsPerMinute = 0;
    this.requestCountReseter = setInterval(() => {
      this.requestsPerMinute = 0;
    }, 1000);
    this.client = BinanceClient({
      apiKey,
      apiSecret,
    });
  }

  public static getInstance(): BinanceAPI {
    return this.instance || (this.instance = new this());
  }

  public async getCandleSticks(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: number,
    end?: number
  ): Promise<ICandle[]> {
    this.requestsPerMinute++;

    console.log("Request", this.requestsPerMinute);
    // Wait till request limit is lowered
    const waitForLimit = async () => {
      if (this.requestsPerMinute >= BINANCE_REQUESTS_PER_MINUTE) {
        await setTimeout(waitForLimit, 100);
      }
    };
    await waitForLimit();

    let candleParams = {
      symbol: `${basecurrency}${altcurrency}`,
      interval: interval as CandleChartInterval,
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
