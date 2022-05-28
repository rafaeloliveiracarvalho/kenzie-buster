import { Dvd, User } from "../entities";
import { ICreateDvd } from "../interfaces";

declare global {
  namespace Express {
    interface Request {
      validated: User | ICreateDvd;
      decoded: User;
    }
  }
}
