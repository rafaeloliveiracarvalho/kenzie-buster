import { Request } from "express";
import { ICreateDvd } from "../interfaces";
import { dvdRepo, stockRepo } from "../repositories";

class DvdService {
  createDvd = async ({ validated }: Request) => {
    const { name, duration, ...stockInfo } = validated as ICreateDvd;
    const newStock = await stockRepo.save({ ...stockInfo });
    const newDvd = await dvdRepo.save({ name, duration, stock: newStock });

    return newDvd;
  };
}

export default new DvdService();
