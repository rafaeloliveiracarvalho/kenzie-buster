import { Cart, Dvd, User } from "../entities";
import { ICreateManyDvds, IAddDvdInCart, IUserDecoded } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | ICreateManyDvds | IAddDvdInCart;
      dvd: Dvd;
      decoded: User | IUserDecoded;
      cart: Cart;
    }
  }
}
