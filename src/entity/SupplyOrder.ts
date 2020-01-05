import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { SuppliesOrdered } from './SuppliesOrdered';

@Entity()
export class SupplyOrder {
  @PrimaryColumn()
  name: string;

  @Column()
  deadLine: Date;

  @Column({ nullable: true })
  arrived: boolean;

  @OneToMany(type => SuppliesOrdered, supplyOrderd => supplyOrderd.supplyOrder, { eager: true, cascade: true })
  supplies: SuppliesOrdered[];
}