import { Hono } from "hono";
import * as postsController from '../controllers/posts.controller.ts';
import { authMiddleWare } from "../middleware/auth.middleware.ts";
const postRouter = new Hono();
postRouter.get('/all',postsController.getAllPosts);
postRouter.use('*', authMiddleWare);
postRouter.get('/', postsController.getMyPosts);
postRouter.post('/addPost', postsController.addPost);
postRouter.post('/addReply', postsController.addReply);
export default postRouter;


