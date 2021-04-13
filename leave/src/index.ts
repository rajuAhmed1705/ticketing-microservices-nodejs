import mongoose from "mongoose";
import { app } from "./app";
// import { MongoMemoryServer } from "mongodb-memory-server";
import scheduler from "./jobs/scheduler";

process.env.JWT_KEY = "raju";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("mongo uri must be defined");
  }
  console.log(process.env.JWT_KEY);

  try {
    // mongo = new MongoMemoryServer();
    // const mongoUri = await mongo.getUri();
    // const mongoUri =
    // "mongodb+srv://raju1705:raju1705@cluster0.dzzot.mongodb.net/leave?retryWrites=true&w=majority";

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("connected to mongo DB");
  } catch (error) {
    console.error(error);
  }

  //jobs
  scheduler;

  app.listen(3000, () => {
    console.log(`listening on port 3000!!`);
  });
};

start();
