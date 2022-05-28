import express, { NextFunction, Request, Response } from "express";
import { errorHandler } from "./errors";
import registerRoutes from "./routes";

const app = express();

app.use(express.json());
registerRoutes(app);
app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(error, res);
});

export default app;
