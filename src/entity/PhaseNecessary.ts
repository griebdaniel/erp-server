import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

import { Phase } from './Phase';
import { Supply } from './Supply';

@Entity()
export class PhaseNecessary {
  @ManyToOne(type => Phase, { onDelete: "CASCADE", onUpdate: "CASCADE", primary: true })
  @JoinColumn([{ name: 'phase', referencedColumnName: 'name' }, { name: 'product', referencedColumnName: 'product' }])
  phase: Phase;

  @PrimaryColumn('string')
  @ManyToOne(type => Supply, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'supply' })
  supply: string;

  @Column({ nullable: true })
  quantity: number;
}