import { Router } from "express";
import { dvdController, cartController } from "../controllers";
import {
  validateCart,
  validateDvd,
  validateUserPermission,
} from "../middlewares";
import { validateSchema } from "../middlewares";
import { createDvdSchema, addDvdInCartSchema } from "../schemas";

const dvdRouter = Router();

dvdRouter.post(
  "/register",
  validateSchema(createDvdSchema),
  validateUserPermission.validateToken,
  validateUserPermission.loggedUserIsAdmin,
  dvdController.createDvd,
);

dvdRouter.get("", dvdController.getAllDvds);

dvdRouter.post(
  "/buy/:dvdId",
  validateUserPermission.validateToken,
  validateSchema(addDvdInCartSchema),
  validateCart.existNoPaidCart,
  validateDvd.ifExist,
  validateDvd.stockIsEnough,
  cartController.addDvdInCart,
);

export default dvdRouter;
