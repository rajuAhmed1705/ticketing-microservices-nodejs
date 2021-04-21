import mongoose from "mongoose";
import { app } from "./app";
// import { MongoMemoryServer } from "mongodb-memory-server";
import scheduler from "./jobs/scheduler";
import { natsWrapper } from "./nats-wrapper";
import { DesignationCreatedListener } from "./events/listeners/designation/designation-created-listener";
import { DesignationUpdatedListener } from "./events/listeners/designation/designation-updated-listener";
import { DesignationDeletedListener } from "./events/listeners/designation/designation-deleted-listener";
import { ReligionCreatedListener } from "./events/listeners/religion/religion-created-listener";
import { ReligionUpdatedListener } from "./events/listeners/religion/religion-update-listener";
import { ReligionDeletedListener } from "./events/listeners/religion/religion-deleted-listener";
import { DepartmentCreatedListener } from "./events/listeners/department/department-created-listener";
import { DepartmentUpdatedListener } from "./events/listeners/department/department-updated-listener";
import { DepartmentDeletedListener } from "./events/listeners/department/department-deleted-listener";
import { EmploymentTypeCreatedListener } from "./events/listeners/employment-type/employment-type-created-listener";
import { EmploymentTypeUpdatedListener } from "./events/listeners/employment-type/employment-type-updated-listener";
import { EmploymentTypeDeletedListener } from "./events/listeners/employment-type/employment-type-deleted-listener";
import { EmployeeStatusCreatedListener } from "./events/listeners/employee-status/employee-status-created-publsiher";
import { EmployeeStatusDeletedListener } from "./events/listeners/employee-status/employee-status-deleted-publsiher";
import { EmployeeStatusUpdatedListener } from "./events/listeners/employee-status/employee-status-updated-publsiher";

process.env.JWT_KEY = "raju";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT key must be defined");
  }
  if (!process.env.MONGO_URL) {
    throw new Error("mongo uri must be defined");
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
    // mongo = new MongoMemoryServer();
    // const mongoUri = await mongo.getUri();
    // const mongoUri =
    // "mongodb+srv://raju1705:raju1705@cluster0.dzzot.mongodb.net/leave?retryWrites=true&w=majority";

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

    new DesignationCreatedListener(natsWrapper.client).listen();
    new DesignationUpdatedListener(natsWrapper.client).listen();
    new DesignationDeletedListener(natsWrapper.client).listen();

    new ReligionCreatedListener(natsWrapper.client).listen();
    new ReligionUpdatedListener(natsWrapper.client).listen();
    new ReligionDeletedListener(natsWrapper.client).listen();

    new DepartmentCreatedListener(natsWrapper.client).listen();
    new DepartmentUpdatedListener(natsWrapper.client).listen();
    new DepartmentDeletedListener(natsWrapper.client).listen();

    new EmploymentTypeCreatedListener(natsWrapper.client).listen();
    new EmploymentTypeUpdatedListener(natsWrapper.client).listen();
    new EmploymentTypeDeletedListener(natsWrapper.client).listen();

    new EmployeeStatusCreatedListener(natsWrapper.client).listen();
    new EmployeeStatusUpdatedListener(natsWrapper.client).listen();
    new EmployeeStatusDeletedListener(natsWrapper.client).listen();

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
