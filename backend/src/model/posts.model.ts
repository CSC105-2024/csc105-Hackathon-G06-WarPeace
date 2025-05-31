import { connect } from "http2";
import { db } from "../index.ts";

export const getMyPosts = async (userId:number)=>{
    const posts = await db.post.findMany({
        where:{
            userId,
        },
        orderBy:{
            createdAt:'desc',
        },
        include:{
          reply:true,
        }
    })
    return posts;
}

export const addPost = async(
    userId:number,
    text:string,
    topic:string,
)=>{
    return db.post.create({
       data:{
        user:{
            connect:{id:userId}
        },
        text,
        topic,
        
       }
    })
}

export const addReply = async(
    userId:number,
    postId:string,
    replyText:string,
)=>{
    return db.reply.create({
        data:{
            replyText,
            post:{
                connect:{id:postId}
            },
            ...(userId &&{
                user:{
                    connect:{id:userId}
                }
            })
            
        }
    })
}
export const getAllPosts = async ()=>{
    const allPost = await db.post.findMany({
        include:{
            user:true,
            reply:true
        },
        orderBy:{
            createdAt:"desc"
        }
    })
    return allPost;
}



