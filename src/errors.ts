import { Response } from "express";

class ErrorHandler {
  public statusCode: number;
  public message: string;

  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (error: Error, res: Response) => {
  if (error instanceof ErrorHandler) {
    res.status(error.statusCode).json({ error: error.message });
  }

  console.error(error);

  res.status(500).json({ message: "Internal server error" });
};

export { ErrorHandler, errorHandler };
