import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  console.log("starting up....");

  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("Not connected to MongoDB");
  }
  console.log(process.env.JWT_KEY);

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongo DB");
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log(`listening on port 3000!!`);
  });
};

start();
