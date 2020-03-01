import { Schema, Document, model, Model } from "mongoose";

export interface ITradingMap extends Document {
  name: string;
  desc: string;
  exchange: string;
  basecurrency: string;
  altcurrency: string;
}

const TradingMapSchema = new Schema({
  name: {
    type: String,
    required: "You Must enter a name."
  },
  desc: {
    type: String
  },
  exchange: {
    type: String,
    required: "You Must select an Exchange"
  },
  basecurrency: {
    type: String,
    required: "You Must select a Base Currency"
  },
  altcurrency: {
    type: String,
    required: "You Must select a Alternate Currency"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const TradingMap: Model<ITradingMap> = model("TradingMap", TradingMapSchema);

export default TradingMap;
