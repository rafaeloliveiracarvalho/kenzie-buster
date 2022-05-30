import { Router } from "express";
import { dvdController, cartController } from "../controllers";
import { validateDvd, ValidateUserPermission } from "../middlewares";
import { validateSchema } from "../middlewares";
import { createDvdSchema, addDvdInCartSchema } from "../schemas";

const dvdRouter = Router();

dvdRouter.post(
  "/register",
  validateSchema(createDvdSchema),
  ValidateUserPermission.validateToken,
  ValidateUserPermission.loggedUserIsAdmin,
  dvdController.createDvd,
);

dvdRouter.get("", dvdController.getAllDvds);

dvdRouter.post(
  "/buy/:dvdId",
  ValidateUserPermission.validateToken,
  validateSchema(addDvdInCartSchema),
  validateDvd.ifExist,
  validateDvd.stockIsEnough,
  cartController.addDvdInCart,
);

export default dvdRouter;
