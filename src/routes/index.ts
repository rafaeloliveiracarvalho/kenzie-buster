import { Express } from "express";
import cartRouter from "./cart.routes";
import dvdRouter from "./dvd.routes";
import userRouter from "./user.routes";
import docRouter from "./doc.routes";

const registerRoutes = (app: Express) => {
  app.use("/api/users", userRouter);
  app.use("/api/dvds", dvdRouter);
  app.use("/api/carts", cartRouter);
  app.use("/api/docs", docRouter);
};

export default registerRoutes;
