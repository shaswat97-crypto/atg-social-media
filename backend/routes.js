import express  from "express";
import { forgotpassword, signin, signup } from "./Controllers/userController.js";
import { commentPost, createPost, deletePost, getPosts, likePost, updatePost } from "./Controllers/postController.js";

const router = express.Router();

export default router
.post('/signup', signup)
.post('/signin', signin)
.post('/forgotpassword', forgotpassword)
.post('/posts', createPost)
.get('/posts', getPosts)
.put('/posts/:postId', updatePost)
.delete('/posts/:postId', deletePost)
.put('/:postId/like', likePost)
.post('/:postId/comment', commentPost)
