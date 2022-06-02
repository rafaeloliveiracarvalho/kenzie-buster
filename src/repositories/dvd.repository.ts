import { Repository } from "typeorm";
import AppDataSource from "../data-source";
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

  getAllDvds = async () => {
    return await this.repo.find();
  };

  getOneDvd = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };
}

export default new DvdRepo();
