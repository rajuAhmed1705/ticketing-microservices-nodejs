import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";
import {
    errorHandler,
    NotFoundError,
    currentuser,
} from "@shurjomukhi/ms-common";
import { indexOrderRouter } from "./routes/index";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { deleteOrderRouter } from "./routes/delete";

const app = express();
app.use(json());
app.use(
    urlencoded({
        extended: false,
    })
);
app.set("trust proxy", true);
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== "test",
    })
);

app.use(currentuser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
