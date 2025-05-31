import type { Context } from "hono";
import { db } from "../index.ts";
import * as postModel from "../model/posts.model.ts";
type postBody = {
  userId: number;
  text: string;
  reply: string[];
};
export const getMyPosts = async (c: Context) => {
  try {
    const userId = c.get("userId");
    if (!userId) {
      return c.json({ success: false, msg: "Unauthorized" }, 401);
    }
    const posts = await postModel.getMyPosts(userId);

    return c.json({
      success: true,
      data: posts,
      msg: "Successfully fetched user posts",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal Server Error: ${e}`,
      },
      500
    );
  }
};

export const addPost = async (c: Context) => {
  try {
    const body = await c.req.json();
    const {userId, text, topic} = body;
    if (!userId || typeof text !== "string") {
      return c.json({ success: false, msg: "Missing userId or text" }, 400);
    }
    const post = await postModel.addPost(userId, text,topic);
    return c.json({
      success: true,
      data: post,
      msg: "Successfully create post",
    })

  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal server error: ${e}`,
      },
      500
    );
  }
};

export const addReply = async (c:Context)=>{
  try{
    const body = await c.req.json();
    const {userId,postId,replyText} = body;
    if (!userId || !postId|| typeof replyText !== "string") {
      return c.json({ success: false, msg: "Missing some requirement" }, 400);
    }
    const reply =await postModel.addReply(userId,postId,replyText);
    return c.json({
      success: true,
      data: reply,
      msg: "Successfully create post",
    })
  }catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `Internal server error: ${e}`,
      },
      500
    );
  }
}

export const getAllPosts = async (c:Context)=>{
  try{
    const posts = await postModel.getAllPosts();
    return c.json({
      success:true,
      data:posts,
      msg:"Sucessfully fetch all post"
    })
  }catch(e){
    return c.json({
      success:false,
      data:null,
      msg:`Internal server Error ${e}`
    },500)
  }
}


