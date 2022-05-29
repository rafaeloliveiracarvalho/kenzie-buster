import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Cart } from "./cart.entity";
import { Stock } from "./stock.entity";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;

  @OneToMany(() => Cart, (cart) => cart.dvd)
  carts?: Cart[];

  @OneToOne(() => Stock, (stock) => stock.dvd, { eager: true })
  @JoinColumn()
  stock: Stock;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
