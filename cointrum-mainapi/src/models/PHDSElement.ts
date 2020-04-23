import { Schema, Document, model, Model } from "mongoose";
import { IExchanges, IBaseCurrencies, IAltCurrencies } from "../types/exchange";

export interface IPHDSElement extends Document {
  exchange: IExchanges;
  basecurrency: IBaseCurrencies;
  altcurrency: IAltCurrencies;
  openTime: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  closeTime: Date;
  quoteVolume: number;
  trades: number;
  baseAssetVolume: number;
  quoteAssetVolume: number;
}

const PHDSElementSchema = new Schema({
  exchange: {
    type: String,
    required: "exchange required",
  },
  basecurrency: {
    type: String,
    required: "basecurrency required",
  },
  altcurrency: {
    type: String,
    required: "altcurrency required",
  },
  openTime: {
    type: Date,
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
    type: Date,
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

const PHDSElement: Model<IPHDSElement> = model(
  "PHDSElement",
  PHDSElementSchema
);

export default PHDSElement;
