import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError } from "@shurjomukhi/common";
import { categoryRouter } from "./routes/category";

const app = express();
app.use(json());
app.use(cors());
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

app.use(categoryRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
