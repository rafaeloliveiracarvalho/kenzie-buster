import { Dvd, User } from "../entities";
import { ICreateDvd, ICreateManyDvds } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | ICreateManyDvds;
      decoded: User;
    }
  }
}
