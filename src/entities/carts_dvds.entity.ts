import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cart } from "./cart.entity";
import { Dvd } from "./dvd.entity";

@Entity("carts_dvds")
export class CartsDvds {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer" })
  quantity: number;

  @Column({ type: "float", name: "unit_price" })
  unitPrice: number;

  @ManyToOne(() => Cart, (cart) => cart.cartsDvds, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: "cart_id" })
  cart?: Cart;

  @ManyToOne(() => Dvd, (dvd) => dvd.cartsDvds, { eager: true })
  @JoinColumn({ name: "dvd_id" })
  dvd: Dvd;
}
