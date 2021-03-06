import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Cart, CartsDvds, Dvd, User } from "../entities";
import { ICartRepo } from "../interfaces";

class CartRepo implements ICartRepo {
  private repo: Repository<Cart>;

  constructor() {
    this.repo = AppDataSource.getRepository(Cart);
  }

  createCart = async (payload: Partial<Cart>) => {
    return this.repo.save({ ...payload });
  };

  getNoPaidCart = async (payload: object) => {
    return this.repo.findOneBy({ ...payload });
  };

  getAllCartsByCustomer = async (customer: Partial<User>) => {
    return await this.repo.findBy({ customer });
  };

  updateCart = async (payload: Cart) => {
    return await this.repo.save(payload);
  };
}

export default new CartRepo();
