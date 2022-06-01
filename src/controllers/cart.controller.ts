import { Request, Response } from "express";
import { cartService } from "../services";

class CartController {
  addDvdInCart = async (req: Request, res: Response) => {
    const cart = await cartService.addDvdInCart(req);

    return res.status(200).json(cart);
  };
}

export default new CartController();
