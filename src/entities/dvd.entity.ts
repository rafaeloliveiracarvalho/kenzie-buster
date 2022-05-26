import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dvds")
export class Dvd {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  duration: string;
}
