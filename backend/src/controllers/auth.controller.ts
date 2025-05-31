import type { Context } from "hono";
import * as authModel from "../model/user.model.ts";
import { generateToken } from "../utils/token.ts";
import { setCookie } from "hono/cookie";

type AuthBody = {
  userId: number;
  username: string;
  password: string;
};
export const signup = async (c: Context) => {
  try {
    const { username, password } =
      await c.req.json<AuthBody>();
    const AlreadyExisting = await authModel.findUser(username);
    if (AlreadyExisting) {
      return c.json(
        {
          success: false,
          msg: "This account alreay taken",
        },
        409
      );
    }
    const user = await authModel.createUser(
      username,
      password,
    );
    const token = generateToken(user);
    return c.json(
      {
        success: true,
        token,
      },
      201
    );
  } catch (e) {
    console.error(e);
    return c.json(
      {
        success: false,
        msg: "Failed to create user",
      },
      500
    );
  }
};

export const login = async (c: Context) => {
  try {
    const { username, password } = await c.req.json();
    const user = await authModel.findUser(username);
    if (!user) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }
    const isValid = await authModel.validatePassword(password, user.password);
    if (!isValid) {
      return c.json({ success: false, msg: "Invalid credentials" }, 401);
    }
    const token = generateToken(user);
    await setCookie(c, "userId", String(user.id), {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      path: "/",
    });
    return c.json({
      success: true,
      token,
      user: {
        id: user.id,
      },
    });
  } catch (e) {
    console.error(e);
    return c.json({ success: false, msg: "Failed to login." }, 500);
  }
};

export const profileUpdate = async (c: Context) => {
  const { password, userId } = await c.req.json<AuthBody>();

  try {
    const numericUserId = Number(userId);

    if (isNaN(numericUserId)) {
      return c.json(
        { success: false, msg: "Invalid user ID." },
        400
      );
    }

    const updatedUser = await authModel.updateUserProfile(
      numericUserId,
      password
    );

    return c.json({
      success: true,
      msg: "Updated profile",
      data: updatedUser,
    });
  } catch (e) {
    console.error(e);
    return c.json(
      { success: false, msg: "Failed to update user profile." },
      500
    );
  }
};


export const getUserData = async (c:Context)=>{
  try{
    const userId = Number(c.req.param("userId"));
    const userData = await authModel.getUserData(userId);
    if(!userData){
      return c.json({
        success:false,
        data:null,
        msg: "User not found",
      },404)
    }
    return c.json({
      success:true,
      data:userData,
      msg: "User fetched successfully",
    })
  }catch(e){
    return c.json({
      success:false,
      data:null,
      msg:`Internal Server Error ${e}`
    },500)
  }
}

export const deleteAccount = async (c: Context) => {
  try {
    // Get userId from context (must be set by auth middleware)
    const userId = c.get("userId");

    if (!userId) {
      return c.json({ success: false, msg: "Unauthorized" }, 401);
    }

    await authModel.deleteUserAccount(Number(userId));


    c.header(
      "Set-Cookie",
      "userId=; Path=/; HttpOnly; Max-Age=0"
    );

    return c.json({
      success: true,
      msg: "Account deleted successfully",
    });
  } catch (e) {
    console.error("Delete account error:", e);
    return c.json(
      { success: false, msg: "Failed to delete account" },
      500
    );
  }
};




