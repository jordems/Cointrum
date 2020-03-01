import { Schema, Document, model, Model } from "mongoose";

export interface IConfidenceValues extends Document {
  data: object;
}

const ConfidenceValuesSchema = new Schema({
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
