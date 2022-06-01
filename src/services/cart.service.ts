import { Request } from "express";
import { Cart } from "../entities";
import { ErrorHandler } from "../errors";
import {
  IAddDvdInCart,
  ISerializedCart,
  IUserDecoded,
  IUserWOP,
} from "../interfaces";
import { cartRepo, cartsDvdsRepo } from "../repositories";
import { serializedAllCartSchema, serializedCartSchema } from "../schemas";

class CartService {
  addDvdInCart = async ({ dvd, decoded, validated, cart }: Request) => {
    const { quantity } = validated as IAddDvdInCart;
    const { exp, iat, ...user } = decoded as IUserDecoded;

    const newCart = await this.getNoPaidCartOrCreateOne(cart, user);

    await cartsDvdsRepo.save(quantity, newCart, dvd);

    const { total } = await cartsDvdsRepo.calculateTotalPriceCart(newCart);

    newCart.total = parseFloat(parseFloat(total).toFixed(2));

    const updatedCart = await cartRepo.updateCart(newCart);

    return this.makeCartResponse(updatedCart);
  };

  payment = async ({ cart }: Request) => {
    if (!cart) {
      throw new ErrorHandler(400, "There is not cart to pay");
    }

    cart.paid = true;

    const updatedCart = await cartRepo.updateCart(cart);

    return this.makeCartResponse(updatedCart);
  };

  getAllCarts = async ({ decoded }: Request) => {
    const { exp, iat, ...user } = decoded as IUserDecoded;

    const allCarts = await cartRepo.getAllCartsByCustomer(user);

    const allCartsWithDvds = [];

    for (let i = 0; i < allCarts.length; i++) {
      const currentCart = allCarts[i];
      const dvds = await cartsDvdsRepo.getDvdsInCart(currentCart);
      const { cartsDvds, customer, ...serializedCart } = currentCart;
      (serializedCart as ISerializedCart).dvds = [...dvds];
      allCartsWithDvds.push(serializedCart);
    }

    return await serializedAllCartSchema.validate(allCartsWithDvds, {
      stripUnknown: true,
    });
  };

  private makeCartResponse = async (updatedCart: Cart) => {
    const products = await cartsDvdsRepo.getDvdsInCart(updatedCart);

    const response = {
      ...updatedCart,
      dvds: [...products],
    };

    return serializedCartSchema.validate(response, { stripUnknown: true });
  };

  private getNoPaidCartOrCreateOne = async (cart: Cart, user: IUserWOP) => {
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
