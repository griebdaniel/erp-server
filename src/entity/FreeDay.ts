import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Skill } from './Skill';
import { Employee } from './Employee';

@Entity()
export class FreeDay {
  @PrimaryColumn('string')
  @ManyToOne(type => Employee, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'employee' })
  employee: string;

  @PrimaryColumn()
  startDate: Date;

  @PrimaryColumn()
  endDate: Date;
}