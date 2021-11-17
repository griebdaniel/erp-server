import { Entity, ManyToOne, PrimaryColumn, JoinColumn, Column } from "typeorm";
import { Phase } from "./Phase";
import { Tool } from "./Tool";


@Entity()
export class PhaseTool {
  @ManyToOne(type => Phase, { onUpdate: 'CASCADE', onDelete: 'CASCADE', primary: true })
  @JoinColumn([{ name: 'phase', referencedColumnName: 'name' }, { name: 'product', referencedColumnName: 'product' }])
  phase: Phase;

  @PrimaryColumn('string')
  @ManyToOne(type => Tool, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'tool' })
  tool: string;

  @Column()
  count: number;
}