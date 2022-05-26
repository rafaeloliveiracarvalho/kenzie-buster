import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("stock")
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "integer", nullable: false })
  quantity: number;

  @Column({ type: "float", nullable: false })
  price: number;
}
