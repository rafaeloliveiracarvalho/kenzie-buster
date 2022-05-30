import { Cart } from "../entities";

interface ICartRepo {
  createCart: (payload: Partial<Cart>) => Promise<Cart>;
  getNoPaidCart: (payload: object) => Promise<Cart>;
}

export { ICartRepo };
