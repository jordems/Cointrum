import { ConnectionOptions, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const serverurl = process.env.DB_URL; // REPLACE WITH YOUR DB SERVER
const user = process.env.DB_USER;
const password = process.env.DB_PASS;

export const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    };
    await connect(`mongodb+srv://${user}:${password}@${serverurl}`, options);

    require("mongoose").Promise = global.Promise;

    // console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};
