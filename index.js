import mongoose from "mongoose";
import * as dotenv from "dotenv";

import app from "./app.js";
import { Driver } from "./models/driver.js";

dotenv.config();

const port = process.env.PORT;
app.listen(port, async () => {
  if (process.env.NODE_ENV !== "test") {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(async () => await Driver.init())
      .then(() => console.log("Connected to MongoDB"));
  }
  console.log(`Server is running on port ${port}`);
});
