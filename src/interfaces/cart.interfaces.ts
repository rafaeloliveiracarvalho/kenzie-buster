import { UpdateResult } from "typeorm";
import { Cart } from "../entities";

interface ICartRepo {
  createCart: (payload: Partial<Cart>) => Promise<Cart>;
  getNoPaidCart: (payload: object) => Promise<Cart>;
  updateCart: (payload: Cart) => Promise<Cart | UpdateResult>;
}

export { ICartRepo };
