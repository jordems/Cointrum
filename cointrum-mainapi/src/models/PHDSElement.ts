import { Schema, Document, model, Model } from "mongoose";
import {
  IExchanges,
  IBaseCurrencies,
  IAltCurrencies,
  ICycleDurations,
} from "../types/exchange";

export interface IPHDSElement extends Document {
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

  RSI14: number;

  SAR00202: number;
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
  RSI14: {
    type: Number,
  },
  SAR00202: {
    type: Number,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const PHDSElement = (
  exchange: IExchanges,
  basecurrency: IBaseCurrencies,
  altcurrency: IAltCurrencies,
  interval: ICycleDurations
): Model<IPHDSElement> => {
  return model(
    `${exchange}:${basecurrency}:${altcurrency}:${interval}:`,
    PHDSElementSchema
  );
};
export default PHDSElement;
