import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  create = async (req: Request, res: Response) => {
    const newUser = await userService.createUser(req);

    res.status(201).json(newUser);
  };

  login = async (req: Request, res: Response) => {
    const { message, status } = await userService.login(req);

    return res.status(status).json(message);
  };
}

export default new UserController();
