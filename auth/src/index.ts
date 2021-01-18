import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error("JWT key must be defined");
    }
    console.log(process.env.JWT_KEY);

    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
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
