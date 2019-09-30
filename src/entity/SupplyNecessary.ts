import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";
import { Supply } from "./Supply";

@Entity()
export class SupplyNecessary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Supply, { eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supply_name' })
  supply: Supply;

  @ManyToOne(type => Product, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_name' })
  product: Product;

  @Column()
  quantity: number;
}