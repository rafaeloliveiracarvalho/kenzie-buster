import { Cart, CartsDvds, Dvd } from "../entities";

interface ICartsDvdsRepo {
  save: (quantity: number, cart: Cart, dvd: Dvd) => Promise<CartsDvds>;

  dvdIsInCart: (cart: Cart, dvd: Dvd) => Promise<CartsDvds>;

  updateCartsDvds: (payload: CartsDvds) => Promise<CartsDvds>;

  getDvdsInCart: (cart: Cart) => Promise<Dvd[]>;

  calculateTotalPriceCart: (cart: Cart) => Promise<any>;

  calculateTotalQuantityByDvdInCart: (cart: Cart, dvd: Dvd) => Promise<any>;
}

export { ICartsDvdsRepo };
