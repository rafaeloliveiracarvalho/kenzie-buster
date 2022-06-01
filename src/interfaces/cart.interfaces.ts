import { UpdateResult } from "typeorm";
import { Cart, Dvd, User } from "../entities";

interface ICartRepo {
  createCart: (payload: Partial<Cart>) => Promise<Cart>;
  getNoPaidCart: (payload: object) => Promise<Cart>;
  updateCart: (payload: Cart) => Promise<Cart | UpdateResult>;
}

interface ISerializedCart {
  id?: string;
  paid?: boolean;
  total: number;
  dvds: Partial<Dvd>[];
}

export { ICartRepo, ISerializedCart };
