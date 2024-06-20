import { StatusCodes } from "http-status-codes";

import { Driver } from "../models/driver.js";
import { MAX_DISTANCE } from "../config.js";

class DriversController {

   async index(req, res, next) {
      const { lng, lat }  = req.query;

      try{ 
         const drivers = await Driver.aggregate([
            {
              $geoNear: {
                near: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
                distanceField: 'distance',
                spherical: true,
                maxDistance: MAX_DISTANCE
              }
            }
          ]);
         res.send(drivers);
      } catch(e) {
         next(e);
      }
   }

   async create(req, res, next) {
      try {
    const driverProps = req.body;
    const driver = await Driver.create(driverProps);
    res.send(driver);
      } catch(e) {
         next(e);
      }
   }


   async update(req, res, next) {
      const driverId = req.params.id;
      const driverProps = req.body;
      try{
      await Driver.findByIdAndUpdate({_id: driverId}, driverProps);
      const editedDriver = await Driver.findById(driverId);
      res.send(editedDriver);
      } catch(e) {
         next(e);
      }
   }

   async delete(req, res, next) {
      const driverId = req.params.id;
      try{
      await Driver.findByIdAndDelete({_id: driverId});
      res.status(StatusCodes.NO_CONTENT).send({message: 'Deleted successfully'});
      } catch (e) {
         next(e);
      }
   }


};

export const driversController = new DriversController();