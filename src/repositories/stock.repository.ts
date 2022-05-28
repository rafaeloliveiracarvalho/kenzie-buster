import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Stock } from "../entities";
import { IStockRepo } from "../interfaces";

class StockRepo implements IStockRepo {
  private repo: Repository<Stock>;

  constructor() {
    this.repo = AppDataSource.getRepository(Stock);
  }

  save = async (stock: Partial<Stock>) => {
    const savedStock = await this.repo.save(stock);
    return savedStock;
  };
}

export default new StockRepo();
