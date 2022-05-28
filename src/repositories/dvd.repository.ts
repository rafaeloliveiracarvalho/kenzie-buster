import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Dvd } from "../entities";
import { IDvdRepo } from "../interfaces";

class DvdRepo implements IDvdRepo {
  private repo: Repository<Dvd>;

  constructor() {
    this.repo = AppDataSource.getRepository(Dvd);
  }

  save = async (dvd: Partial<Dvd>) => {
    const savedDvd = await this.repo.save(dvd);
    return savedDvd;
  };

  getOneDvd = async (payload: object) => {
    const foundDvd = this.repo.findOneBy({ ...payload });
    return foundDvd;
  };
}

export default new DvdRepo();
