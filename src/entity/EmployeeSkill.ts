import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Skill } from './Skill';
import { Employee } from './Employee';

const transformer = {
  from: dbValue => dbValue,
  to: entityValue => entityValue
}

@Entity()
export class EmployeeSkill {
  @PrimaryColumn({ transformer })
  @ManyToOne(type => Skill, {  onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'skill' })
  skill: string;

  @PrimaryColumn('string')
  @ManyToOne(type => Employee, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee' })
  employee: string;
}