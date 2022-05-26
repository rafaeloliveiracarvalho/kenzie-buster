import { User } from "../entities";

interface IUserRepo {
  save: (user: Partial<User>) => Promise<User>;
  getOneUser: (payload: object) => Promise<User>;
}

export { IUserRepo };
