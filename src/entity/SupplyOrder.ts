import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { SuppliesOrdered } from './SuppliesOrdered';

@Entity()
export class SupplyOrder {
  @PrimaryColumn()
  name: string;

  @Column()
  deadLine: Date;

  @Column()
  arrived: boolean;

  @OneToMany(type => SuppliesOrdered, supplyOrderd => supplyOrderd.supplyOrder, { eager: true })
  supplies: SuppliesOrdered[];
}