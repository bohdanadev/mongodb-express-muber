import express from "express";
import bodyParser from "body-parser";

import { driversRouter } from "./routes/drivers.router.js";
import { StatusCodes } from "http-status-codes";

const app = express();

app.use(bodyParser.json());

app.use("/api", driversRouter);

app.use((err, req, res, next) => {
  res.status(StatusCodes.UNPROCESSABLE_ENTITY).send({ error: err.message });
});

export default app;
