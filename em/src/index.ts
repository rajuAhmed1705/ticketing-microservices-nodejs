import mongoose from "mongoose";
import { app } from "./app";
import { MongoMemoryServer } from "mongodb-memory-server";

process.env.JWT_KEY = "raju";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT key must be defined");
    }
    // if (!process.env.MONGO_URL) {
    //     throw new Error("Not connected to MongoDB");
    // }
    console.log(process.env.JWT_KEY);

    try {
        const mongoUri =
            "mongodb+srv://raju1705:raju1705@cluster0.dzzot.mongodb.net/em?retryWrites=true&w=majority";

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log("connected to mongo DB");
    } catch (error) {
        console.error(error);
    }

    app.listen(8000, () => {
        console.log(`listening on port 8000!!`);
    });
};

start();
