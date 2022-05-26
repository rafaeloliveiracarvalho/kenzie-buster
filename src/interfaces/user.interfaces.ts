import { User } from "../entities";

interface IUserRepo {
  save: (user: Partial<User>) => Promise<User>;
}

export { IUserRepo };
