import { Entity, PrimaryColumn, OneToMany, Column, ManyToOne, JoinColumn } from 'typeorm';

import { PhaseSkill} from './PhaseSkill';
import { PhaseTool } from './PhaseTool';
import { PhaseNecessary } from './PhaseNecessary';
import { Product } from './Product';
import { ParentPhase } from './ParentPhase';

@Entity()
export class Phase {
  @PrimaryColumn()
  name: string;

  @Column()
  time: number;

  @OneToMany(type => PhaseSkill, phaseSkill => phaseSkill.phase, { eager: true, cascade: ['insert', 'remove', 'update'] })
  skills: PhaseSkill;

  @OneToMany(type => PhaseTool, phaseTool => phaseTool.phase, { eager: true, cascade: ['insert', 'remove', 'update'] })
  tools: PhaseTool[];

  @OneToMany(type => PhaseNecessary, phaseNecessary => phaseNecessary.phase, { eager: true, cascade: ['insert', 'remove', 'update'] })
  necessary: PhaseNecessary[];

  @OneToMany(type => ParentPhase, parentPhase => parentPhase.phase, { eager: true, cascade: ['insert', 'remove', 'update'] })
  parentPhases: ParentPhase[];

  @ManyToOne(type => Product)
  @JoinColumn({ name: 'product' })
  product: Product;
}