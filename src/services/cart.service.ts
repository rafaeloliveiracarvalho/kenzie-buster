import { Request } from "express";
import { IAddDvdInCart, IUserDecoded, IUserWOP } from "../interfaces";
import { cartRepo, cartsDvdsRepo } from "../repositories";
import { serializedCartSchema } from "../schemas";

class CartService {
  addDvdInCart = async ({ dvd, decoded, validated }: Request) => {
    const { quantity } = validated as IAddDvdInCart;
    const { exp, iat, ...user } = decoded as IUserDecoded;

    const cart = await this.getNoPaidCartOrCreateOne(user);

    await cartsDvdsRepo.save(quantity, cart, dvd);

    const { total } = await cartsDvdsRepo.calculateTotalCart(cart);

    cart.total = parseFloat(parseFloat(total).toFixed(2));

    const updatedCart = await cartRepo.updateCart(cart);

    const products = await cartsDvdsRepo.getProductsInCart(updatedCart);

    const response = {
      ...updatedCart,
      dvds: [...products],
    };

    return serializedCartSchema.validate(response, { stripUnknown: true });
  };

  private getNoPaidCartOrCreateOne = async (user: IUserWOP) => {
    const cart = await cartRepo.getNoPaidCart({
      customer: { ...user },
      paid: false,
    });

    if (!cart) {
      return await cartRepo.createCart({
        total: 0,
        customer: { ...user },
      });
    }

    return cart;
  };
}

export default new CartService();
