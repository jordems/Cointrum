import BinanceClient,{Binance, CandleChartInterval, Candle, ReconnectingWebSocketHandler} from 'binance-api-node'

import dotenv from "dotenv";
import IMarket from './IMarket';
import ICandle from './types/ICandle';
import { IBaseCurrencies, IAltCurrencies, ICycleDurations } from '../../types/exchange';

import {cycledurations} from '../../types/exchange/cycledurations';
dotenv.config();


const apiKey = process.env.BINANCE_API_KEY; 
const apiSecret = process.env.BINANCE_API_SECRET_KEY;


export default class BinanceAPI implements IMarket {
    private client: Binance;

    constructor(){
        if(!apiKey || !apiSecret){
            throw new Error("Set Binace API Key in .env File")
        }
        
        this.client = BinanceClient({
            apiKey,
            apiSecret
        });
    }

    getCandleSticks(basecurrency: IBaseCurrencies, altcurrency: IAltCurrencies, interval: ICycleDurations, start?: Date, end?: Date): Promise<ICandle[]> {
        return this.client.candles({ symbol: `${basecurrency}${altcurrency}`, interval: interval as CandleChartInterval , startTime: start?.getMilliseconds(), endTime: end?.getMilliseconds()});;
    }

    getLiveCandleSocket(basecurrency: IBaseCurrencies, altcurrency: IAltCurrencies, interval: ICycleDurations, callback: (ticker: Candle) => void): ReconnectingWebSocketHandler {
        return this.client.ws.candles(`${basecurrency}${altcurrency}`, interval as CandleChartInterval, callback );
    }


}
