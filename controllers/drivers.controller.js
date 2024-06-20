import { Driver } from "../models/driver.js";

class DriversController {
   async create(req, res, next) {
    const driverProps = req.body;
    const driver = await Driver.create(driverProps);
    res.send(driver);

   }
};

export const driversController = new DriversController();