import { Schema, Document, model, Model } from "mongoose";

export interface ISeed extends Document {
  labelid: string;
  data: object;
}

const SeedSchema = new Schema({
  labelid: { type: Schema.Types.ObjectId, ref: "Label" },
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
