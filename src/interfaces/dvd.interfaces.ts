import { Dvd } from "../entities";

interface IDvdRepo {
  saveMany: (dvds: Partial<Dvd>[]) => Promise<Dvd[]>;
  getAllDvds: () => Promise<Dvd[]>;
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

interface IAddDvdInCart {
  quantity: number;
}

export { IDvdRepo, ICreateDvd, ICreateManyDvds, IAddDvdInCart };
