import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Phase } from './Phase';

@Entity()
export class PhaseDependency {
  @PrimaryColumn('string')
  @ManyToOne(type => Phase, {  onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'phase' })
  phase: string;

  @PrimaryColumn('string')
  @ManyToOne(type => Phase, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'dependency' })
  dependency: string;
}