import { Entity, ManyToOne, PrimaryColumn, JoinColumn, Column } from "typeorm";
import { Phase } from "./Phase";
import { Tool } from "./Tool";


@Entity()
export class PhaseTool {
  @PrimaryColumn('string')
  @ManyToOne(type => Phase, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'phase' })
  phase: Phase;

  @PrimaryColumn('string')
  @ManyToOne(type => Tool, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'tool' })
  tool: Tool;

  @Column()
  count: number;
}