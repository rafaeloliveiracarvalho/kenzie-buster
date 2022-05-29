import { Dvd } from "../entities";

interface IDvdRepo {
  saveMany: (dvds: Partial<Dvd>[]) => Promise<Dvd[]>;
  getOneDvd: (payload: object) => Promise<Dvd>;
}

interface ICreateDvd {
  name: string;
  duration: string;
  price: number;
  quantity: number;
}

interface ICreateManyDvds {
  dvds: ICreateDvd[];
}

export { IDvdRepo, ICreateDvd, ICreateManyDvds };
