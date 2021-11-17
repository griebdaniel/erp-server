import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { Phase } from "./Phase";
import { Product } from "./Product";
import { Skill } from "./Skill";

@Entity()
export class PhaseSkill {
  // @PrimaryColumn()
  @ManyToOne(type => Phase, { onUpdate: 'CASCADE', onDelete: 'CASCADE', primary: true })
  @JoinColumn([{ name: 'phase', referencedColumnName: 'name' }, { name: 'product', referencedColumnName: 'product' }])
  phase: Phase;


  // @PrimaryColumn('string')
  // @ManyToOne(type => Phase, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'product_name', referencedColumnName: 'name' })
  // productName: Phase;

  @PrimaryColumn('string')
  @ManyToOne(type => Skill, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'skill' })
  skill: string;
}