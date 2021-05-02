import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper";
// import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_KEY = "raju";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL not defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID not found");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL not found");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID not found");
  }
  console.log(process.env.JWT_KEY);

  try {
    // const mongoUri =
    //   "mongodb+srv://raju1705:raju1705@cluster0.dzzot.mongodb.net/em?retryWrites=true&w=majority";
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on("close", () => {
      console.log("NATS conection closed");
      process.exit();
    });

    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

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
