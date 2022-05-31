import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./cart.entity";
import { Dvd } from "./dvd.entity";

@Entity("carts_dvds")
export class CartsDvds {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "float" })
  unitPrice: number;

  @ManyToOne((type) => Cart, (cart) => cart.cartDvd)
  cart?: string;

  @ManyToOne((type) => Dvd, (dvd) => dvd.cartDvd)
  dvd?: String;
}
