import { hash } from "bcrypt";
import { Request } from "express";
import { User } from "../entities";
import { userRepo } from "../repositories";
import { userUtil } from "../utils";

class UserService {
  create = async ({ body }: Request): Promise<Partial<User>> => {
    body.password = await hash(body.password, 10);
    const newUser = await userRepo.save(body);

    const newUserWop = userUtil.removePwd(newUser);

    return newUserWop;
  };
}

export default new UserService();
