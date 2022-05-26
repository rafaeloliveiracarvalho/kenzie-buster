import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer", nullable: false })
  quantity: number;

  @Column({ type: "float", nullable: false })
  price: number;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
