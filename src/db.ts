import mongoose from "mongoose";
import MovieModel from "./model/movie_model";

async function connectDB() {
  console.log(`${process.env.MONGODB_URL}/${process.env.MONGODB_DATABSE_NAME}`);

  mongoose
    .connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_DATABSE_NAME}`)
    .then(() => {
      console.log("MongoDB Connected!");

      MovieModel.init().then(() => {
        console.log("Indexes ensured");
      });
    })
    .catch((e: Error) => {
      console.error(`MongoDB Connection Error : ${e.message} `);
    });
}

export default connectDB;
