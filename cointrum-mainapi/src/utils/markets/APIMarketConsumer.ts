import IMarket from "./IMarket";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
  IExchanges,
} from "../../types/exchange";
import ICandle from "./types/ICandle";
import { IPHDSElement } from "../../models/PHDSElement";
import BinanceAPI from "./BinanceAPI";
import ICurrencyPair from "../../types/ICurrencyPair";
import { IndicatorDecorator } from "../math/IndicatorDecorator";
import Bottleneck from "bottleneck";

export default class APIMarketConsumer {
  private static instances: { [marketName: string]: APIMarketConsumer } = {};
  private market: IMarket;
  private limiter: Bottleneck;

  private constructor(market: IMarket) {
    this.market = market;

    const maxRequestsperSecond =
      1000 / (market.getRequestsPerMinute() / 60) + 5;

    this.limiter = new Bottleneck({
      maxConcurrent: 1,
      minTime: maxRequestsperSecond,
    });
  }

  public async findSectionfromHistoricalData(
    currencyPair: ICurrencyPair,
    startTime: number,
    endTime: number,
    results: IPHDSElement[],
    lastKnownDocuments: IPHDSElement[]
  ): IPHDSElement[] {
    let finalresults: IPHDSElement[] = [...results];

    const timeofLastCandleLoaded = lastKnownDocuments[
      lastKnownDocuments.length - 1
    ]
      ? lastKnownDocuments[lastKnownDocuments.length - 1].closeTime
      : this.market.getInitialStartTime();
    const PAGINATION_LIMIT = this.market.getPaginationInterval();
    const TIME_DIFF = endTime - timeofLastCandleLoaded;
    const NUM_REQUESTS = TIME_DIFF / (60000 * PAGINATION_LIMIT);

    let sectionPromises: Promise<ICandle[]>[][] = [];

    const REQUESTS_PER_MINUTE = this.market.getRequestsPerMinute();

    let requestQueueidx = 0;
    let requestSectionQueue: Promise<ICandle[]>[] = [];
    // Get all Results from market API
    for (let x = 0; x < NUM_REQUESTS; x++) {
      if (Math.floor(x / REQUESTS_PER_MINUTE) !== requestQueueidx) {
        requestQueueidx = Math.floor(x / REQUESTS_PER_MINUTE);
        sectionPromises.push(requestSectionQueue);
        requestSectionQueue = [];
      }

      requestSectionQueue.push(
        new Promise(async (res, rej) => {
          const timeSectionStart =
            timeofLastCandleLoaded + x * 60000 * PAGINATION_LIMIT;
          const timeSectionEnd =
            timeofLastCandleLoaded + (x + 1) * 60000 * PAGINATION_LIMIT - 1;
          console.log(`cycle ${x}: TIME:${timeSectionStart}-${timeSectionEnd}`);
          this.market
            .getCandleSticks(currencyPair, timeSectionStart, timeSectionEnd)
            .then((candles) => {
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
      for (const requestQueue of sectionPromises) {
        candleSections = await Promise.all(requestQueue);
      }
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
  }

  private generateRequests() {}

  private consumerRequest() {}

  public static getInstance(market: IExchanges): APIMarketConsumer {
    switch (market) {
      case "Binance":
        const binanceAPI = new BinanceAPI();
        return (
          this.instances[binanceAPI.getMarketName()] ||
          (this.instances[binanceAPI.getMarketName()] = new this(binanceAPI))
        );
    }
  }
}
