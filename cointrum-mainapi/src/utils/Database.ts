import { ConnectionOptions, connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

/*
  @Requires
  `.env` File for MongoDB Cluster
  Format:
  ....
  DB_URL= ....
  DB_USER= ....
  DB_PASS= ....
  .....
*/

const serverurl = process.env.DB_URL;
// const user = process.env.DB_USER;
// const password = process.env.DB_PASS;

export const connectDB = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(`mongodb://${serverurl}`, options);

    require("mongoose").Promise = global.Promise;
  } catch (err) {
    console.error(err);
    // Exit process with failure
    process.exit(1);
  }
};
