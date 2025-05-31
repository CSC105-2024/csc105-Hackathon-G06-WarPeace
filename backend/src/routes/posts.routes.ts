import { Hono } from "hono";
import * as postsController from '../controllers/posts.controller.ts';
import { authMiddleWare } from "../middleware/auth.middleware.ts";
export const recipeRouter = new Hono();
recipeRouter.get('/all',postsController.getAllPosts);
recipeRouter.use('*', authMiddleWare);
recipeRouter.get('/', postsController.getMyPosts);
recipeRouter.post('/addPost', postsController.addPost);
recipeRouter.post('/addReply', postsController.addReply);


