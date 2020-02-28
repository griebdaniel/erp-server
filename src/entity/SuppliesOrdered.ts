import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { Supply } from "./Supply";
import { SupplyOrder } from './SupplyOrder';

@Entity()
export class SuppliesOrdered {
  @PrimaryColumn('string')
  @ManyToOne(type => Supply, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'supply' })
  supply: string;

  @PrimaryColumn('string')
  @ManyToOne(type => SupplyOrder, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'supplyOrder' })
  supplyOrder: string;

  @Column({ nullable: true })
  quantity: number;
}