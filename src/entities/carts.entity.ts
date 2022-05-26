import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ type: 'boolean', default: false })
  paid: boolean;

  @Column({ type: 'float', nullable: false })
  total: number;
}
