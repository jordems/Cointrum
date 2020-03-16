import { Schema, Document, model, Model } from "mongoose";

export interface IClassifier extends Document {
  tradingmapid: string;
  name: string;
  desc: string;
  colour: string;
  type: string;
  data: object;
  confidencevalues: object;
}

const ClassifierSchema = new Schema({
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
  type: {
    type: String,
    required: "You Must give a `type`"
  },
  data: {
    type: Object,
    required: "You Must give `data`"
  },
  confidencevalues: {
    type: Object,
    required: "You must give `confidencevalues`"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Classifier: Model<IClassifier> = model("Classifier", ClassifierSchema);

export default Classifier;
