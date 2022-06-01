import { Request, Response } from "express";
import { ErrorHandler } from "../errors";
import { cartService, dvdService } from "../services";

class CartController {
  addDvdInCart = async (req: Request, res: Response) => {
    const cart = await cartService.addDvdInCart(req);

    return res.status(200).json(cart);
  };

  getAllCarts = async (req: Request, res: Response) => {
    const carts = await cartService.getAllCarts(req);

    res.status(200).json(carts);
  };

  payment = async (req: Request, res: Response) => {
    try {
      const cart = await cartService.payment(req);

      await dvdService.updateStock(req.cart);

      return res.status(200).json(cart);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ error: error.message });
      }
    }
  };
}

export default new CartController();
