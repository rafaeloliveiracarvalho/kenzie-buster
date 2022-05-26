import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
    }
  }
}
