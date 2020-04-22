import BinanceClient,{Binance} from 'binance-api-node'

import dotenv from "dotenv";
import IMarket from './IMarket';
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

    getCandleSticks(): void {
        throw new Error("Method not implemented.");
    }


}
