import { db } from "../index.ts";
import {hash, compare} from 'bcrypt';
export const createUser = async (username:string , password:string)=>{
    const hashedPassword = await hash(password,10);
    return db.user.create({
        data:{
            username,
            password:hashedPassword,
        }
    })
}
export const findUser = async(username:string)=>{
    return db.user.findUnique(
        {
            where:{username}
        }
    )
}


export const validatePassword = async(input:string , hash:string)=>{
    return compare(input,hash)
}

export const updateUserProfile = async (
    userId:number,
    newPassword:string,
)=>{
    return db.user.update({
        where: {id:userId},
        data:{
            password:newPassword,
        }
    })
}
export const getUserData = async (userId: number) => {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      posts:true,
      replies:true
    },
  });
};


export const deleteUserAccount = async(userId:number)=>{
    return db.user.delete({
        where:{id:userId}
    })
}






