import { Entity, PrimaryColumn, OneToMany, ManyToOne, JoinColumn, Column } from 'typeorm';
import { EmployeeSkill } from './EmployeeSkill';
import { FreeDay } from './FreeDay';
import { Shift } from './Shift';

@Entity()
export class Employee {
  @PrimaryColumn()
  name: string;

  @OneToMany(type => EmployeeSkill, employeeSkill => employeeSkill.employee, { eager: true })
  skills: EmployeeSkill[];

  @OneToMany(type => FreeDay, freeDay => freeDay.employee, { eager: true })
  freeDays: FreeDay[];

  @Column()
  @ManyToOne(type => Shift, { onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'shift' })
  shift: string;
}
