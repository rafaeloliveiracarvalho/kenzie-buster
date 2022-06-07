import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { User } from "../entities";
import { ErrorHandler } from "../errors";

class ValidateUserPermission {
  toCreateAdminUser = (req: Request, res: Response, next: NextFunction) => {
    if (!(req.validated as User).isAdm) {
      return next();
    }

    this.validateToken(req, res);
    this.loggedUserisAdm(req, res);

    return next();
  };

  loggedUserisAdm = (
    req: Request,
    _: Response,
    next: NextFunction | null = null,
  ) => {
    if (!req.decoded.isAdm) {
      throw new ErrorHandler(401, "Missing admin permission.");
    }

    if (next) return next();
  };

  validateToken = (
    req: Request,
    _: Response,
    next: NextFunction | null = null,
  ) => {
    const token: string = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new ErrorHandler(401, "Missing authorization token.");
    }

    return verify(
      token,
      process.env.SECRET_KEY,
      (error: VerifyErrors, decoded: string | JwtPayload) => {
        if (error) {
          throw new ErrorHandler(401, error.message);
        }

        req.decoded = decoded as User;

        if (next) return next();
      },
    );
  };
}

export default new ValidateUserPermission();
