import { Schema, Document, model, Model } from "mongoose";

export interface ISeed extends Document {
  data: object;
}

const SeedSchema = new Schema({
  data: {
    type: Object,
    required: "Seed Didn't cointain any `data`"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Seed: Model<ISeed> = model("Seed", SeedSchema);

export default Seed;
