import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from "typeorm";
import { Product } from "./Product";
import { Supply } from "./Supply";

@Entity()
export class SupplyNecessary {
  @ManyToOne(type => Product, { primary: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_name' })
  product: Product;

  @ManyToOne(type => Supply, { primary: true, eager: true, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supply_name' })
  supply: Supply;

  @Column()
  quantity: number;
}