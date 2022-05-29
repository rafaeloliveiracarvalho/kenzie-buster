import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Dvd } from "../entities";
import { IDvdRepo } from "../interfaces";

class DvdRepo implements IDvdRepo {
  private repo: Repository<Dvd>;

  constructor() {
    this.repo = AppDataSource.getRepository(Dvd);
  }

  saveMany = async (dvds: Partial<Dvd>[]) => {
    const insertedDvds = await this.repo
      .createQueryBuilder()
      .insert()
      .values(dvds)
      .execute();

    const savedDvds: Dvd[] = [];

    for (let { id } of insertedDvds.generatedMaps) {
      savedDvds.push(await this.repo.findOneBy({ id }));
    }
    return savedDvds;
  };

  getOneDvd = async (payload: object) => {
    const foundDvd = this.repo.findOneBy({ ...payload });
    return foundDvd;
  };
}

export default new DvdRepo();
