import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Cart } from "./cart.entity";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;

  @OneToMany(() => Cart, (cart) => cart.dvd)
  carts: Cart[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
