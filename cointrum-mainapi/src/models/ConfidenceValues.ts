import { Schema, Document, model, Model } from "mongoose";

export interface IConfidenceValues extends Document {
  classifierid: string;
  data: object;
}

const ConfidenceValuesSchema = new Schema({
  classifierid: { type: Schema.Types.ObjectId, ref: "Classifier" },
  confvaluepairs: {
    type: Object,
    required: "Requires data in `confvaluepairs`"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const ConfidenceValues: Model<IConfidenceValues> = model(
  "ConfidenceValues",
  ConfidenceValuesSchema
);

export default ConfidenceValues;
