import { Router } from "express";
import { cartController } from "../controllers";
import { validateUserPermission, validateCart } from "../middlewares";

const cartRouter = Router();

cartRouter.put(
  "/pay",
  validateUserPermission.validateToken,
  validateCart.existNoPaidCart,
  cartController.payment,
);

cartRouter.get(
  "",
  validateUserPermission.validateToken,
  cartController.getAllCarts,
);

export default cartRouter;
