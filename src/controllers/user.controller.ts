import { Request, Response } from "express";
import { userService } from "../services";

class UserController {
  create = async (req: Request, res: Response) => {
    const newUser = await userService.create(req);

    res.status(200).json(newUser);
  };
}

export default new UserController();
