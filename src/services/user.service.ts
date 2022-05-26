import { hash } from "bcrypt";
import { Request } from "express";
import { User } from "../entities";
import { userRepo } from "../repositories";
import { userUtil } from "../utils";

class UserService {
  create = async ({ validated }: Request): Promise<Partial<User>> => {
    validated.password = await hash(validated.password, 10);
    const newUser = await userRepo.save(validated);

    const newUserWop = userUtil.removePwd(newUser);

    return newUserWop;
  };
}

export default new UserService();
