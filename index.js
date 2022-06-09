import app from "./app.js";
import dotenv from "dotenv";
import { dbConnect } from "./config/database.config.js";
dotenv.config();

dbConnect();

app.listen(process.env.PORT || port, () => {
  console.log(`API LISTENING ON PORT ${process.env.PORT}`);
});
