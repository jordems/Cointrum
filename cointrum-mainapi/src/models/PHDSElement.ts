import { Schema, Document, model, Model } from "mongoose";
import {
  IExchanges,
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../types/exchange";
import ICurrencyPair from "../types/ICurrencyPair";

export interface IPHDSElement extends Document {
  discriminator: "IPHDSELEMENT";
  openTime: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: number;
  quoteVolume: number;
  trades: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;

  atr14: number;

  BBmiddle: number;
  BBupper: number;
  BBlower: number;

  ElderRay: [number, number];

  ema26: number;
  ema12: number;
  ema13: number;

  forceindex13: number;

  MACD: number;

  RSIGAIN: number;
  RSILOSS: number;
  RSI14: number;

  PSAR_EP: number;
  PSAR_ACC: number;
  PSAR_INIT: number;
  PSAR_TREND: "Falling" | "Rising";
  PSAR: number;
}

const PHDSElementSchema = new Schema({
  _id: {
    type: Number,
  },
  openTime: {
    type: Number,
    required: "openTime required",
  },
  open: {
    type: Number,
    required: "open required",
  },
  high: {
    type: Number,
    required: "high required",
  },
  low: {
    type: Number,
    required: "low required",
  },
  close: {
    type: Number,
    required: "close required",
  },
  volume: {
    type: Number,
    required: "volume required",
  },
  closeTime: {
    type: Number,
    required: "closeTime required",
  },
  quoteVolume: {
    type: String,
    required: "quoteVolume required",
  },
  trades: {
    type: Number,
    required: "trades required",
  },
  baseAssetVolume: {
    type: Number,
    required: "baseAssetVolume required",
  },
  quoteAssetVolume: {
    type: Number,
    required: "quoteAssetVolume required",
  },
  atr14: {
    type: Number,
  },
  BBmiddle: {
    type: Number,
  },
  BBupper: {
    type: Number,
  },
  BBlower: {
    type: Number,
  },
  ElderRay: {
    type: [Number, Number],
  },
  ema26: {
    type: Number,
  },
  ema12: {
    type: Number,
  },
  ema13: {
    type: Number,
  },
  forceindex13: {
    type: Number,
  },
  MACD: {
    type: Number,
  },
  RSIGAIN: {
    type: Number,
  },
  RSILOSS: {
    type: Number,
  },
  RSI14: {
    type: Number,
  },
  PSAR_EP: {
    type: Number,
  },
  PSAR_ACC: {
    type: Number,
  },
  PSAR_INIT: {
    type: Number,
  },
  PSAR_TREND: {
    type: String,
  },
  PSAR: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const PHDSElement = (currencyPair: ICurrencyPair): Model<IPHDSElement> => {
  return model(
    `${currencyPair.exchange}:${currencyPair.basecurrency}:${currencyPair.altcurrency}:${currencyPair.interval}:`,
    PHDSElementSchema
  );
};
export default PHDSElement;
