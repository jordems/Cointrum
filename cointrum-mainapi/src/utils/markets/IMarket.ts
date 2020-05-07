import ICandle from "./types/ICandle";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../../types/exchange";
import { ReconnectingWebSocketHandler, Candle } from "binance-api-node";
import { IPHDSElement } from "../../models/PHDSElement";
import ICurrencyPair from "../../types/ICurrencyPair";

export default interface IMarket {
  getMarketName(): string;
  getRequestsPerMinute(): number;
  getCandleSticks(
    currencyPair: ICurrencyPair,
    start?: number,
    end?: number
  ): Promise<ICandle[]>;
  getLiveCandleSocket(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
    callback: (ticker: Candle) => void
  ): ReconnectingWebSocketHandler;

  getInitialStartTime(): number;
  getPaginationInterval(): number;
}
