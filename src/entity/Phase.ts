import { Entity, PrimaryColumn, OneToMany, Column, ManyToOne, JoinColumn, Unique, PrimaryGeneratedColumn } from 'typeorm';

import { PhaseSkill} from './PhaseSkill';
import { PhaseTool } from './PhaseTool';
import { Product } from './Product';
import { PhaseDependency } from './PhaseDependency';
import { PhaseNecessary } from './PhaseNecessary';

@Entity()
export class Phase {
  @PrimaryColumn()
  name: string;

  @Column('time')
  time: string;

  @Column()
  count: number;

  @OneToMany(type => PhaseSkill, phaseSkill => phaseSkill.phase, { eager: true})
  skills: PhaseSkill[];

  @OneToMany(type => PhaseTool, phaseTool => phaseTool.phase, { eager: true })
  tools: PhaseTool[];

  @OneToMany(type => PhaseDependency, phaseDependency => phaseDependency.phase, { eager: true })
  phaseDependencies: PhaseDependency[];

  @OneToMany(type => PhaseNecessary, phaseNecessary => phaseNecessary.phase, { eager: true })
  necessary: PhaseNecessary[];

  @PrimaryColumn()
  @ManyToOne(type => Product, { nullable: false, onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product' })
  product: string;
}