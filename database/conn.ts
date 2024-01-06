import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const connectMongo = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("Database Connected");
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;
