import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Phase } from "./Phase";
import { Skill } from "./Skill";

@Entity()
export class PhaseSkill {
  @PrimaryColumn('string')
  @ManyToOne(type => Phase, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phase' })
  phase: Phase;

  @PrimaryColumn('string')
  @ManyToOne(type => Skill, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'skill' })
  skill: Skill;
}