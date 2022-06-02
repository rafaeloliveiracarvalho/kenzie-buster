import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Cart, CartsDvds, Dvd, Stock } from "../entities";
import { ICartsDvdsRepo } from "../interfaces";

class CartsDvdsRepo implements ICartsDvdsRepo {
  private repo: Repository<CartsDvds>;

  constructor() {
    this.repo = AppDataSource.getRepository(CartsDvds);
  }

  save = async (quantity: number, cart: Cart, dvd: Dvd) => {
    return await this.repo.save({
      quantity,
      unitPrice: dvd.stock.price,
      cart,
      dvd,
    });
  };

  dvdIsInCart = async (cart: Cart, dvd: Dvd) => {
    return await this.repo.findOne({ where: { cart, dvd } });
  };

  updateCartsDvds = async (payload: CartsDvds) => {
    return await this.repo.save(payload);
  };

  getDvdsInCart = async (cart: Cart) => {
    const columns = [
      "d.id AS id",
      "SUM(cd.quantity) AS quantity",
      "d.name AS name",
      "d.duration AS duration",
      "cd.unit_price AS price",
      "s.id AS stockId",
    ];
    return await this.repo
      .createQueryBuilder("cd")
      .select(columns)
      .innerJoin(Dvd, "d", "cd.dvd_id = d.id")
      .innerJoin(Stock, "s", "d.stockId = s.id")
      .where("cd.cart_id = :id", { id: cart.id })
      .groupBy("d.id, cd.unit_price, s.id")
      .getRawMany();
  };

  calculateTotalPriceCart = async (cart: Cart) => {
    return await this.repo
      .createQueryBuilder("carts_dvds")
      .select("SUM(quantity * unit_price)", "total")
      .where("cart_id = :id", { id: cart.id })
      .getRawOne();
  };

  calculateTotalQuantityByDvdInCart = async (cart: Cart, dvd: Dvd) => {
    return await this.repo
      .createQueryBuilder("carts_dvds")
      .select("SUM(quantity)", "quantity")
      .where("cart_id = :cartId", { cartId: cart.id })
      .andWhere("dvd_id = :dvdId", { dvdId: dvd.id })
      .getRawOne();
  };
}

export default new CartsDvdsRepo();
