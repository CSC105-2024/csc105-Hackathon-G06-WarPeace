import { Hono } from "hono";
import { getUserData, login, profileUpdate, signup, deleteAccount} from "../controllers/auth.controller.ts";
const authRouter = new Hono();
authRouter.post('/signup', signup);
authRouter.post('/login',login );
authRouter.patch('/update-Username', profileUpdate);
authRouter.get('/getUserData/:userId', getUserData);
authRouter.delete('/deleteAccount',deleteAccount );
export default authRouter;