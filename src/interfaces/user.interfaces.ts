import { Timestamp } from "typeorm";
import { User } from "../entities";

interface IUserRepo {
  save: (user: Partial<User>) => Promise<User>;
  getOneUser: (payload: object) => Promise<User>;
}
interface IUserWOP {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface IUserDecoded extends IUserWOP {
  iat: Timestamp;
  exp: Timestamp;
}

export { IUserRepo, IUserDecoded, IUserWOP };
