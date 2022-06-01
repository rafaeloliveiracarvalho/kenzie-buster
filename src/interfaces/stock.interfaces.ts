import { UpdateResult } from "typeorm";
import { Stock } from "../entities";

interface IStockRepo {
  saveMany: (stocks: Partial<Stock>[]) => Promise<Stock[]>;
  updateStock: (stockId: string, quantity: number) => Promise<void>;
}

export { IStockRepo };
