import { Cart } from "../entities";

interface ICartRepo {
  createCart: (payload: Partial<Cart>) => Promise<Cart>;
}

export { ICartRepo };
