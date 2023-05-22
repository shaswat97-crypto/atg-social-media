import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  content: { type: String, required: true },
  likes: { type: Boolean, default: false },
  comments: [{ type: String }],
});

export const Post = mongoose.model("Post", postSchema);
