import { Router } from "express";
import { userController } from "../controllers";
import {
  validateUserPermission,
  verifyEmailAlreadyExists,
} from "../middlewares";
import validateSchema from "../middlewares/validateSchema.middleware";
import { createUserSchema, loginUserSchema } from "../schemas";

const userRouter = Router();

userRouter.post(
  "/register",
  validateSchema(createUserSchema),
  verifyEmailAlreadyExists,
  validateUserPermission.toCreateAdminUser,
  userController.create,
);

userRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  userController.login,
);

export default userRouter;
