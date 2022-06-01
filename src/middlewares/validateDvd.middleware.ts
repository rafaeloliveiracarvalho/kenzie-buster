import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors";
import { IAddDvdInCart } from "../interfaces";
import { cartsDvdsRepo, dvdRepo } from "../repositories";

class ValidadeDvd {
  ifExist = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dvdId } = req.params;

      const foundDvd = await dvdRepo.getOneDvd({ id: dvdId });

      if (!foundDvd) {
        throw new ErrorHandler(404, "dvd not found");
      }

      req.dvd = foundDvd;

      return next();
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ error: error.message });
      }
    }
  };

  stockIsEnough = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { quantity } = req.validated as IAddDvdInCart;
      const { stock } = req.dvd;

      if (req.cart) {
        const { quantity: qtdInCart } =
          await cartsDvdsRepo.calculateTotalQuantityByDvdInCart(
            req.cart,
            req.dvd,
          );

        const demand = +qtdInCart + quantity;

        if (demand > stock.quantity) {
          throw new ErrorHandler(
            422,
            `current stock: ${stock.quantity}, received demand ${demand}`,
          );
        }
      }

      if (quantity > stock.quantity) {
        throw new ErrorHandler(
          422,
          `current stock: ${stock.quantity}, received demand ${quantity}`,
        );
      }

      return next();
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({ error: error.message });
      }
    }
  };
}

export default new ValidadeDvd();
