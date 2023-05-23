import express from "express";
import mongoose from "mongoose";
// import cors from "cors";
import Router from "./routes.js";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Failed to connect:", error);
  });

const app = express();
// app.use(cors());
app
  .use(express.json())
  .use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)))
  .use("/api/v1", Router)
  .use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
