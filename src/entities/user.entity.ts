import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";
import { Cart } from "./cart.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "boolean", default: false, name: "is_admin" })
  isAdmin?: boolean;

  @OneToMany(() => Cart, (cart) => cart.customer)
  carts?: Cart[];

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
