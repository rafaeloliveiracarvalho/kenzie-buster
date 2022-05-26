import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Dvd } from "./dvd.entity";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer", nullable: false })
  quantity: number;

  @Column({ type: "float", nullable: false })
  price: number;

  @OneToOne(() => Dvd, (dvd) => dvd.stock)
  dvd: Dvd;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
