import { NextFunction, Request, Response } from "express";
import { IUserDecoded } from "../interfaces";
import { cartRepo } from "../repositories";

class ValidateCart {
  existNoPaidCart = async (req: Request, _: Response, next: NextFunction) => {
    const { iat, exp, ...user } = req.decoded as IUserDecoded;

    const cart = await cartRepo.getNoPaidCart({
      customer: { ...user },
      paid: false,
    });

    if (cart) req.cart = cart;

    return next();
  };
}

export default new ValidateCart();
