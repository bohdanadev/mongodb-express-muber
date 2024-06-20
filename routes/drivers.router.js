import express from "express";

import { driversController } from "../controllers/drivers.controller.js";

const router = express.Router();

router.post('/drivers', driversController.create);


export const driversRouter = router;