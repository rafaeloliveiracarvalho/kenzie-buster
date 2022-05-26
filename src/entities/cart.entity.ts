import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("carts")
export class Cart {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "boolean", default: false })
  paid: boolean;

  @Column({ type: "float", nullable: false })
  total: number;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
