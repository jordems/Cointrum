import ICandles from "./types/ICandle";
import { IBaseCurrencies, IAltCurrencies, ICycleDurations } from "../../types/exchange";
import { ReconnectingWebSocketHandler, Candle } from "binance-api-node";

export default interface IMarket {
    getCandleSticks(basecurrency: IBaseCurrencies, altcurrency: IAltCurrencies, interval: ICycleDurations, start?: string, end?: string): Promise<ICandles[]>;
    getLiveCandleSocket(basecurrency: IBaseCurrencies, altcurrency: IAltCurrencies, interval: ICycleDurations, callback: (ticker: Candle) => void): ReconnectingWebSocketHandler;
}