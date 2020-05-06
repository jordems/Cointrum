import IMarket from "./IMarket";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../../types/exchange";
import ICandle from "./types/ICandle";

export default class APILimiter implements IMarket {
  private static instances: { [marketName: string]: APILimiter } = {};
  private market: IMarket;
  private requestCountReseter: NodeJS.Timeout;
  private requestsPerMinute: number;

  private constructor(market: IMarket) {
    this.market = market;
    this.requestsPerMinute = 0;
    this.requestCountReseter = setInterval(() => {
      this.requestsPerMinute = 0;
    }, 1000);
  }
  getMarketName(): string {
    return this.market.getMarketName();
  }
  getRequestsPerMinute(): number {
    return this.market.getRequestsPerMinute();
  }

  async getCandleSticks(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    start?: number,
    end?: number
  ): Promise<ICandle[]> {
    this.requestsPerMinute++;

    console.log("Request", this.requestsPerMinute);
    // Wait till request limit is lowered

    if (this.requestsPerMinute >= this.market.getRequestsPerMinute()) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.requestsPerMinute = 1;
          resolve(
            this.market.getCandleSticks(
              basecurrency,
              altcurrency,
              interval,
              start,
              end
            )
          );
        }, 60000);
      });
    } else {
      return this.market.getCandleSticks(
        basecurrency,
        altcurrency,
        interval,
        start,
        end
      );
    }
  }
  getLiveCandleSocket(
    basecurrency: "BNB" | "BTC" | "ETH" | "USDT",
    altcurrency: "BNB" | "BTC" | "ETH" | "ADA" | "NEO" | "TRX" | "XVG",
    interval:
      | "1m"
      | "3m"
      | "5m"
      | "15m"
      | "30m"
      | "1h"
      | "2h"
      | "4h"
      | "6h"
      | "8h"
      | "12h"
      | "1d"
      | "3d"
      | "1w"
      | "1M",
    callback: (ticker: import("binance-api-node").Candle) => void
  ): import("binance-api-node").ReconnectingWebSocketHandler {
    throw new Error("Method not implemented.");
  }
  getInitialStartTime(): number {
    return this.market.getInitialStartTime();
  }
  getPaginationInterval(): number {
    return this.market.getPaginationInterval();
  }

  public static getInstance(market: IMarket): APILimiter {
    return (
      this.instances[market.getMarketName()] ||
      (this.instances[market.getMarketName()] = new this(market))
    );
  }
}
