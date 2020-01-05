import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { Supply } from "./Supply";
import { Phase } from './Phase';

@Entity()
export class PhaseNecessary {
  @PrimaryColumn('string')
  @ManyToOne(type => Supply, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'supply' })
  supply: Supply;

  @PrimaryColumn('string')
  @ManyToOne(type => Phase, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phase' })
  phase: Phase;

  @Column()
  quantity: number;
}