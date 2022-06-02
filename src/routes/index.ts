import { Express } from "express";
import cartRouter from "./cart.routes";
import dvdRouter from "./dvd.routes";
import userRouter from "./user.routes";
import docRouter from "./doc.routes";

const registerRoutes = (app: Express) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/dvds", dvdRouter);
  app.use("/api/v1/carts", cartRouter);
  app.use("/api/v1/docs", docRouter);
};

export default registerRoutes;
