import { Request } from "express";
import { User } from "../entities";
import { IAddDvdInCart, IUserDecoded } from "../interfaces";
import { cartRepo } from "../repositories";

class CartService {
  addDvdInCart = async ({ dvd, decoded, validated }: Request) => {
    const { quantity } = validated as IAddDvdInCart;
    const { exp, iat, ...user } = decoded as IUserDecoded;
    const total = +(quantity * dvd.stock.price).toFixed(2);

    // const noCardPaid = await this.getNoPaidCart({ decoded } as Request);

    // console.log("\n\n\n");
    // console.log("noCardPaid", noCardPaid);
    // console.log("\n\n\n");

    // if (noCardPaid) {
    // }

    const newCart = await cartRepo.createCart({
      total,
      customer: { ...user },
      dvds: [dvd],
    });

    return newCart;
  };

  getNoPaidCart = async ({ decoded }: Request) => {
    const { id } = decoded;
    const cart = cartRepo.getNoPaidCart({ customer: { id }, paid: false });

    return cart;
  };

  updateCart = async () => {};
}

export default new CartService();
