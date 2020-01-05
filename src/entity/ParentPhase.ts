import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Phase } from './Phase';

@Entity()
export class ParentPhase {
  @PrimaryColumn('string')
  @ManyToOne(type => Phase)
  @JoinColumn({ name: 'phase' })
  phase: Phase;

  @PrimaryColumn('string')
  @ManyToOne(type => Phase)
  @JoinColumn({ name: 'parent' })
  parent: Phase;
}