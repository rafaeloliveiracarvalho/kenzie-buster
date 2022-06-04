import { Request } from "express";
import { compare, hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { config as dotenvConfig } from "dotenv";

import { User } from "../entities";
import { userRepo } from "../repositories";
import { serializedUserSchema } from "../schemas";

dotenvConfig();

class UserService {
  createUser = async ({ validated }: Request): Promise<Partial<User>> => {
    (validated as User).password = await hash((validated as User).password, 10);
    const newUser = await userRepo.save(validated as User);

    const newUserWop = await serializedUserSchema.validate(newUser, {
      stripUnknown: true,
    });

    return newUserWop;
  };

  login = async ({ validated }: Request) => {
    const { email, password } = validated as User;

    const foundUser = await userRepo.getOneUser({ email });

    if (!foundUser) {
      return { status: 400, message: { message: "Invalid email or password" } };
    }

    if (!(await compare(password, foundUser.password))) {
      return { status: 400, message: { message: "Invalid email or password" } };
    }

    const user = await serializedUserSchema.validate(foundUser, {
      stripUnknown: true,
    });

    const token = sign({ ...user }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      status: 200,
      message: { token },
    };
  };
}

export default new UserService();
