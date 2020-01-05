import { Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Skill } from './Skill';
import { Employee } from './Employee';

@Entity()
export class EmployeeSkill {
  @PrimaryColumn('string')
  @ManyToOne(type => Skill, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'skill' })
  skill: Skill;

  @PrimaryColumn('string')
  @ManyToOne(type => Employee, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'employee' })
  employee: Employee;
}