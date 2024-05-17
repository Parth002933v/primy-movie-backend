import mongoose from "mongoose";

async function connectDB() {
  console.log(`${process.env.MONGODB_URL}/${process.env.MONGODB_DATABSE_NAME}`);

  return mongoose.connect(
    `${process.env.MONGODB_URL}/${process.env.MONGODB_DATABSE_NAME}`
  );
}

export default connectDB;
