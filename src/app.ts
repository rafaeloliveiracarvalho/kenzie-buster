import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { errorHandler } from "./errors";
import registerRoutes from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
registerRoutes(app);

app.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(error, res);
});

export default app;
