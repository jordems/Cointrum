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
