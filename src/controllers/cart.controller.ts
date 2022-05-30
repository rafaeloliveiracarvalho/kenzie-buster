import { Request, Response } from "express";
import { cartService } from "../services";

class CartController {
  addDvdInCart = async (req: Request, res: Response) => {
    const newCart = await cartService.addDvdInCart(req);

    return res.status(200).json(newCart);
  };
}

export default new CartController();
