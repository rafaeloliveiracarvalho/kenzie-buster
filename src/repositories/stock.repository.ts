import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Stock } from "../entities";
import { IStockRepo } from "../interfaces";

class StockRepo implements IStockRepo {
  private repo: Repository<Stock>;

  constructor() {
    this.repo = AppDataSource.getRepository(Stock);
  }

  saveMany = async (stocks: Partial<Stock>[]) => {
    const insertedStocks = await this.repo
      .createQueryBuilder()
      .insert()
      .values(stocks)
      .execute();

    const returnStocks: Stock[] = [];

    for (let { id } of insertedStocks.generatedMaps) {
      returnStocks.push(await this.repo.findOneBy({ id }));
    }
    return returnStocks;
  };
}

export default new StockRepo();
