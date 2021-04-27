import express from "express";
import "express-async-errors";
import { json, urlencoded } from "body-parser";
import cookieSession from "cookie-session";

import { errorHandler, NotFoundError } from "@shurjomukhi/common";

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

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
