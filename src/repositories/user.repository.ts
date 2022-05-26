import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { IUserRepo } from "../interfaces";

class UserRepo implements IUserRepo {
  private repo: Repository<User>;

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  save = async (user: Partial<User>) => {
    const savedUser = await this.repo.save(user);
    return savedUser;
  };
}

export default new UserRepo();
