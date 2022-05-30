import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid4 } from "uuid";
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

  @ManyToMany(() => Dvd, (dvd) => dvd.carts, { eager: true, cascade: true })
  @JoinTable()
  dvds: Dvd[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
