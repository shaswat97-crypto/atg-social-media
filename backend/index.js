import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Router from './routes.js'

mongoose
  .connect("mongodb://localhost:27017/atg-social-media")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.error("Failed to connect:", error);
  });

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', Router);

app.listen(5000, () => {
  console.log("Server started on port 3000");
});
