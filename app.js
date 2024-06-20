import express from "express";
import bodyParser from 'body-parser';

import { driversRouter } from "./routes/drivers.router.js";

const app = express();

app.use(bodyParser.json());

app.use('/api', driversRouter);

export default app;