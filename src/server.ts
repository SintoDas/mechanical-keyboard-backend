// getting-started.js

import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";


async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
main();


