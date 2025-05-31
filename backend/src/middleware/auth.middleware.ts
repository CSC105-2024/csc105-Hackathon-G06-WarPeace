import type { MiddlewareHandler } from "hono";
import { getCookie } from "hono/cookie";
export const authMiddleWare: MiddlewareHandler = async(c,next)=>{
    const userId =  await getCookie(c,'userId');
    if(!userId){
        return c.json({
            success:false,
            mgs:"Unauthorized"
        },401)
    }
    c.set('userId', Number(userId))
    await next();

}