import { Router } from "express";
import { userController } from "../controllers";
import {
  ValidateUserPermission,
  verifyEmailAlreadyExists,
} from "../middlewares";
import validateSchema from "../middlewares/validateSchema.middleware";
import { createUserSchema, loginUserSchema } from "../schemas/user";

const userRouter = Router();

userRouter.post(
  "/register",
  validateSchema(createUserSchema),
  verifyEmailAlreadyExists,
  ValidateUserPermission.toCreateAdminUser,
  userController.create,
);

userRouter.post(
  "/login",
  validateSchema(loginUserSchema),
  userController.login,
);

export default userRouter;
