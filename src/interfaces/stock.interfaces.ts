import { Stock } from "../entities";

interface IStockRepo {
  save: (stock: Partial<Stock>) => Promise<Stock>;
}

export { IStockRepo };
