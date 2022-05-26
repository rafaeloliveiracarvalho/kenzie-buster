import { Router } from "express";
import { userController } from "../controllers";
import { verifyEmailAlreadyExists } from "../middlewares";
import validateSchema from "../middlewares/validateSchema.middleware";
import { createUserSchema } from "../schema/user";

const userRouter = Router();

userRouter.post(
  "/users/register",
  validateSchema(createUserSchema),
  verifyEmailAlreadyExists,
  userController.create,
);

export default userRouter;
