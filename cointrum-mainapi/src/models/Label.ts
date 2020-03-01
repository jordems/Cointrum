import { Schema, Document, model, Model } from "mongoose";

export interface ILabel extends Document {
  tradingmapid: string;
  name: string;
  desc: string;
  colour: string;
}

const LabelSchema = new Schema({
  tradingmapid: { type: Schema.Types.ObjectId, ref: "TradingMap" },
  name: {
    type: String,
    required: "You Must enter a name."
  },
  desc: {
    type: String
  },
  colour: {
    type: String,
    required: "You Must choose a colour. (hex)"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Label: Model<ILabel> = model("Label", LabelSchema);

export default Label;
