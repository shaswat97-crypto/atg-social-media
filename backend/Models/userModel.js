import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  username: { type: String, unique: true },
  password: { type: String },
});
export const User = mongoose.model("User", userSchema);
