import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

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
  isAdmin: boolean;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
