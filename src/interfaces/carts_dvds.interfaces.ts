import { Cart, CartsDvds, Dvd } from "../entities";

interface ICartsDvdsRepo {
  save: (quantity: number, cart: Cart, dvd: Dvd) => Promise<CartsDvds>;

  dvdIsInCart: (cart: Cart, dvd: Dvd) => Promise<CartsDvds>;
}

export { ICartsDvdsRepo };
