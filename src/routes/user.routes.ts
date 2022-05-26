import { Router } from "express";
import { userController } from "../controllers";

const userRouter = Router();

userRouter.post("/users/register", userController.create);

export default userRouter;
