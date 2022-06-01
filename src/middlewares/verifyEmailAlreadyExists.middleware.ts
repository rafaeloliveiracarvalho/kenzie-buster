import { NextFunction, Request, Response } from "express";
import { userRepo } from "../repositories";

const verifyEmailAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const foundUser = await userRepo.getOneUser({ email });

  if (foundUser) {
    return res
      .status(409)
      .json({ error: `Key (email)=(${email}) already exists` });
  }

  return next();
};

export default verifyEmailAlreadyExists;
