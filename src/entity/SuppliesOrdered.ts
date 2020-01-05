import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { Supply } from "./Supply";
import { SupplyOrder } from './SupplyOrder';

@Entity()
export class SuppliesOrdered {
  @PrimaryColumn('string')
  @ManyToOne(type => Supply, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'supply' })
  supply: Supply;

  @PrimaryColumn('string')
  @ManyToOne(type => SupplyOrder, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supplyOrder' })
  supplyOrder: SupplyOrder;

  @Column({nullable: true})
  quantity: number;
}