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

    const maxRequestsperMinute = market.getRequestsPerMinute();

    const maxRequestsperSecond =
      1000 / (market.getRequestsPerMinute() / 60) + 5;

    this.limiter = new Bottleneck({
      reservoir: maxRequestsperMinute,
      reservoirRefreshAmount: maxRequestsperMinute,
      reservoirRefreshInterval: 60 * 1000, // must be divisible by 250

      // maxConcurrent: 1,
      minTime: maxRequestsperSecond,
    });
  }

  public async findSectionfromHistoricalData(
    currencyPair: ICurrencyPair,
    endTime: number,
    lastKnownDocuments: IPHDSElement[]
  ): Promise<ICandle[][]> {
    const timeofLastCandleLoaded = lastKnownDocuments[
      lastKnownDocuments.length - 1
    ]
      ? lastKnownDocuments[lastKnownDocuments.length - 1].closeTime
      : this.market.getInitialStartTime();

    const PAGINATION_LIMIT = this.market.getPaginationInterval();
    const TIME_DIFF = endTime - timeofLastCandleLoaded;
    const NUM_REQUESTS = TIME_DIFF / (60000 * PAGINATION_LIMIT);

    let sectionPromises: Promise<ICandle[]>[] = [];
    let requestnum = 0;
    // Get all Results from market API
    for (let x = 0; x < NUM_REQUESTS; x++) {
      const timeSectionStart =
        timeofLastCandleLoaded + x * 60000 * PAGINATION_LIMIT;
      const timeSectionEnd =
        timeofLastCandleLoaded + (x + 1) * 60000 * PAGINATION_LIMIT - 1;

      sectionPromises.push(
        this.limiter.schedule(() => {
          console.log(`Starting request ${++requestnum}`);
          return this.market.getCandleSticks(
            currencyPair,
            timeSectionStart,
            timeSectionEnd
          );
        })
      );
    }

    let candleSections: ICandle[][] = [];
    try {
      candleSections = await Promise.all(sectionPromises);
    } catch (e) {
      throw new Error(e);
    }

    candleSections[0] = IndicatorDecorator(
      candleSections[0],
      lastKnownDocuments
    );
    for (let x = 1; x < candleSections.length; x++) {
      console.log(`cycle ${x - 1}: Finished Decorating Indicators`);
      candleSections[x] = IndicatorDecorator(
        candleSections[x],
        candleSections[x - 1]
      );
    }

    return candleSections;
  }

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
