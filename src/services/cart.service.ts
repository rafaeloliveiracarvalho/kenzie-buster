import { Request } from "express";
import { IAddDvdInCart, IUserDecoded } from "../interfaces";
import { cartRepo } from "../repositories";

class CartService {
  addDvdInCart = async ({ dvd, decoded, validated }: Request) => {
    const { quantity } = validated as IAddDvdInCart;
    const { iat, exp, ...user } = decoded as IUserDecoded;
    const total = +(quantity * dvd.stock.price).toFixed(2);

    const newCart = await cartRepo.createCart({ dvd, user, total });

    return newCart;
  };
}

export default new CartService();
