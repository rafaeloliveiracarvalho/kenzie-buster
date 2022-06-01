import { Request } from "express";
import { Cart, Dvd, Stock } from "../entities";
import { ICreateManyDvds, IDvdInCart } from "../interfaces";
import { cartsDvdsRepo, dvdRepo, stockRepo } from "../repositories";

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

  getAllDvds = async () => {
    return await dvdRepo.getAllDvds();
  };

  updateStock = async (cart: Cart) => {
    const dvdsInCart: IDvdInCart[] = await cartsDvdsRepo.getDvdsInCart(cart);
    const allDvds = await this.getAllDvds();

    for (let i = 0; i < dvdsInCart.length; i++) {
      const currentQuantityInStock = allDvds.find(
        ({ id }) => id === dvdsInCart[i].id,
      ).stock.quantity;

      const updatedQuantity =
        currentQuantityInStock - parseInt(dvdsInCart[i].quantity);

      await stockRepo.updateStock(dvdsInCart[i].stockid, updatedQuantity);
    }
  };
}

export default new DvdService();
