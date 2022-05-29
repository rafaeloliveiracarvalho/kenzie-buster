import { Stock } from "../entities";

interface IStockRepo {
  saveMany: (stocks: Partial<Stock>[]) => Promise<Stock[]>;
}

export { IStockRepo };
