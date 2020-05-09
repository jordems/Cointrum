import { Schema, Document, model, Model } from "mongoose";

export interface IBuySell extends Document {
  tradingmapid: string;
  type: "BUY" | "SELL";
  openTime: number;
}

const BuySellSchema = new Schema({
  tradingmapid: { type: Schema.Types.ObjectId, ref: "TradingMap" },
  type: {
    type: String,
    required: 'You Must enter a type ("BUY", OR "SELL").',
  },
  openTime: {
    type: Number,
    required: "You Must enter a openTime.",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

const BuySell: Model<IBuySell> = model("BuySell", BuySellSchema);

export default BuySell;
