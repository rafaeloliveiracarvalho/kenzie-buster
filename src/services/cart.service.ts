import { Request } from "express";
import { Cart, Dvd, User } from "../entities";
import { IAddDvdInCart, IUserDecoded } from "../interfaces";
import { cartRepo } from "../repositories";

class CartService {
  addDvdInCart = async ({ dvd, decoded, validated }: Request) => {
    const { quantity } = validated as IAddDvdInCart;

    const noPaidCart = await this.getNoPaidCart({ decoded } as Request);

    if (noPaidCart) {
      const updatedCart = this.updateCart(dvd, quantity, noPaidCart);
      return updatedCart;
    }

    const { exp, iat, ...user } = decoded as IUserDecoded;
    const total = +(quantity * dvd.stock.price).toFixed(2);

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

  updateCart = async (dvd: Dvd, quantity: number, noPaidCart: Cart) => {
    if (!noPaidCart.dvds.some(({ id }) => id === dvd.id)) {
      noPaidCart.dvds.push(dvd);
    }

    noPaidCart.total += +(quantity * dvd.stock.price).toFixed(2);

    return await cartRepo.updateCart(noPaidCart);
  };
}

export default new CartService();
