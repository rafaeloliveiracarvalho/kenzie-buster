import { compare, hash } from "bcrypt";
import { Request } from "express";
import { User } from "../entities";
import { userRepo } from "../repositories";
import { userUtil } from "../utils";
import { sign } from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

class UserService {
  createUser = async ({ validated }: Request): Promise<Partial<User>> => {
    validated.password = await hash(validated.password, 10);
    const newUser = await userRepo.save(validated);

    const newUserWop = userUtil.removePwd(newUser);

    return newUserWop;
  };

  login = async ({ validated }: Request) => {
    const { email, password } = validated;

    const foundUser = await userRepo.getOneUser({ email });

    if (!foundUser) {
      return { status: 400, message: { message: "Invalid email or password" } };
    }

    if (!(await compare(password, foundUser.password))) {
      return { status: 400, message: { message: "Invalid email or password" } };
    }

    const user = userUtil.removePwd(foundUser);

    const token = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { user, token },
    };
  };
}

export default new UserService();
