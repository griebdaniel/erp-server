import { Entity, ManyToMany, PrimaryColumn, JoinTable, OneToMany } from 'typeorm';
import { Supply } from './Supply';
import { SupplyNecessary } from './SupplyNecessary';

@Entity()
export class Product {
  @PrimaryColumn()
  name: string;

  @OneToMany(type => SupplyNecessary, supplyNecessary => supplyNecessary.product, { eager: true })
  necessary: SupplyNecessary[];
}