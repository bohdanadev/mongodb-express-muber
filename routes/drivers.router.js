import express from "express";

import { driversController } from "../controllers/drivers.controller.js";

const router = express.Router();

router.post("/drivers", driversController.create);
router.put("/drivers/:id", driversController.update);
router.delete("/drivers/:id", driversController.delete);
router.get("/drivers", driversController.index);

export const driversRouter = router;
