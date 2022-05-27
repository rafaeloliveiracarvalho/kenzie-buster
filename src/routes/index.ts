import { Express } from "express";
import userRouter from "./user.routes";

const registerRoutes = (app: Express) => {
  app.use("/api/users", userRouter);
};

export default registerRoutes;
