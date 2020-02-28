import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Phase } from './Phase';
import { Supply } from './Supply';

@Entity()
export class PhaseNecessary {
  @PrimaryColumn('string')
  @ManyToOne(type => Phase, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'phase' })
  phase: string;

  @PrimaryColumn('string')
  @ManyToOne(type => Supply, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'supply' })
  supply: string;

  @Column({ nullable: true })
  quantity: number;
}