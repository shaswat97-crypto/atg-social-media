import { Post } from "../Models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({ content });
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to get posts" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    let newPost = await Post.findByIdAndUpdate(postId, { content });
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    let post = await Post.findById(postId);
    post.likes = !post.likes;
    let newPost = await post.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to like post" });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment } = req.body;
    let newPost = await Post.findByIdAndUpdate(postId, {
      $push: { comments: comment },
    });
    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};
