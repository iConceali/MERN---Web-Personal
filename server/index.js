import mongoose from "mongoose";
import { app } from "./app.js";
import {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  API_VERSION,
  IP_SERVER,
} from "./constants.js";

const PORT = process.env.PORT || 3977;

mongoose
  .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
  .then(() => {
    app.listen(PORT, () => {
      console.log("##############################");
      console.log("########## API REST ##########");
      console.log("##############################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando la base de datos:", error);
  });
