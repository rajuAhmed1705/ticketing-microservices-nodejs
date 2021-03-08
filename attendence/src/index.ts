import mongoose from "mongoose";
import { app } from "./app";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_KEY = "raju";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT key must be defined");
    }
    console.log(process.env.JWT_KEY);

    let mongo: any;

    try {
        mongo = new MongoMemoryServer();
        const mongoUri = await mongo.getUri();

        await mongoose.connect(mongoUri, {
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
