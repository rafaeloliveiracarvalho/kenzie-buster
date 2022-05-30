import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Cart } from "../entities";
import { ICartRepo } from "../interfaces";

class CartRepo implements ICartRepo {
  private repo: Repository<Cart>;

  constructor() {
    this.repo = AppDataSource.getRepository(Cart);
  }

  createCart = async (payload: Partial<Cart>) => {
    return this.repo.save({ ...payload });
  };
}

export default new CartRepo();
