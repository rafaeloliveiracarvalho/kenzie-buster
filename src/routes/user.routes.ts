import { Router } from "express";
import { userController } from "../controllers";
import { verifyEmailAlreadyExists } from "../middlewares";

const userRouter = Router();

userRouter.post(
  "/users/register",
  verifyEmailAlreadyExists,
  userController.create,
);

export default userRouter;
