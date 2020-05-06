import ICandle from "./types/ICandle";
import {
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../../types/exchange";
import { ReconnectingWebSocketHandler, Candle } from "binance-api-node";
import { IPHDSElement } from "../../models/PHDSElement";

export default interface IMarket {
  getCandleSticks(
    basecurrency: IBaseCurrencies,
    altcurrency: IAltCurrencies,
    interval: ICycleDurations,
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
