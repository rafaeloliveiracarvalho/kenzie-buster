import { Request } from "express";
import { Dvd, Stock } from "../entities";
import { ICreateManyDvds } from "../interfaces";
import { dvdRepo, stockRepo } from "../repositories";

class DvdService {
  createDvd = async ({ validated }: Request) => {
    const { dvds } = validated as ICreateManyDvds;

    const dvdsToSave: Partial<Dvd>[] = [];
    const stocksToSave: Partial<Stock>[] = [];

    for (let i = 0; i < dvds.length; i++) {
      const { name, duration, price, quantity } = dvds[i];
      dvdsToSave.push({ name, duration });
      stocksToSave.push({ quantity, price });
    }

    const savedStocks = await stockRepo.saveMany([...stocksToSave]);

    for (let i = 0; i < savedStocks.length; i++) {
      dvdsToSave[i].stock = savedStocks[i];
    }

    const savedDvds = await dvdRepo.saveMany([...dvdsToSave]);

    return savedDvds;
  };
}

export default new DvdService();
