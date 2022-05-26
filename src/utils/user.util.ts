import { User } from "../entities";

class UserUtils {
  removePwd = (user: Partial<User>): Partial<User> => {
    const { password, ...userWop } = user;
    return userWop;
  };
}

export default new UserUtils();
