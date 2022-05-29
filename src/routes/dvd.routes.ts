import { Router } from "express";
import dvdController from "../controllers/dvd.controller";
import { ValidateUserPermission } from "../middlewares";
import { validateSchema } from "../middlewares";
import { createDvdSchema } from "../schemas";

const dvdRouter = Router();

dvdRouter.post(
  "/register",
  validateSchema(createDvdSchema),
  ValidateUserPermission.validateToken,
  ValidateUserPermission.loggedUserIsAdmin,
  dvdController.createDvd,
);

dvdRouter.get("", dvdController.getAllDvds);

export default dvdRouter;
