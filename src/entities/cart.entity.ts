import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
import { CartsDvds } from "./carts_dvds.entity";
import { Dvd } from "./dvd.entity";
import { User } from "./user.entity";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "boolean", default: false })
  paid?: boolean;

  @Column({ type: "float", nullable: false })
  total: number;

  @ManyToOne(() => User, (user) => user.carts, { eager: true })
  customer: Partial<User>;

  @OneToMany(() => CartsDvds, (cartDvd) => cartDvd.cart)
  cartsDvds: CartsDvds[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
