import assert from "assert";
import request from "supertest";
import { describe } from "mocha";
import mongoose from "mongoose";

import app from "../../app.js";
import { DriverSchema } from "../../models/driver.js";

const Driver = mongoose.model("driver");

describe("Drivers Controller", () => {
  it("Post to /api/drivers creates a new driver", (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end(() => {
          Driver.countDocuments().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("PUT to /api/drivers/id edits an existing driver", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            assert(driver.driving);
            done();
          });
        });
    });
  });

  it("DELETE to /api/drivers/id can delete a driver", (done) => {
    const driver = new Driver({ email: "test@test.com", driving: false });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ email: "test@test.com" }).then((driver) => {
            assert(driver === null);
            done();
          });
        });
    });
  });

  it("GET to /api/drivers finds drivers in a location", (done) => {
    const seattleDriver = new Driver({
      email: "seattle@test.com",
      geometry: { type: "Point", coordinates: [-122.4759902, 47.6147628] },
    });
    const miamiDriver = new Driver({
      email: "miami@test.com",
      geometry: { type: "Point", coordinates: [-80.253, 25.791] },
    });

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        setTimeout(() => {
          request(app)
            .get("/api/drivers?lng=-80&lat=25")
            .end((err, response) => {
              if (err) return done(err);
              console.log("Response body:", response.body);
              assert(response.body.length === 1);
              assert(response.body[0].email === "miami@test.com");
              done();
            });
        }, 1000);
      })
      .catch(done);
  });
});
