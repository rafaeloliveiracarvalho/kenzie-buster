import { Dvd } from "../entities";

interface IDvdRepo {
  save: (dvd: Partial<Dvd>) => Promise<Dvd>;
  getOneDvd: (payload: object) => Promise<Dvd>;
}

interface ICreateDvd {
  name: string;
  duration: string;
  price: number;
  quantity: number;
}

export { IDvdRepo, ICreateDvd };
