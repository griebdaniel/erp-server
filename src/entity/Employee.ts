import { Entity, PrimaryColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { EmployeeSkill } from './EmployeeSkill';
import { FreeDay } from './FreeDay';
import { Shift } from './Shift';


@Entity()
export class Employee {
  @PrimaryColumn()
  name: string;

  @OneToMany(type => EmployeeSkill, employeeSkill => employeeSkill.employee, { eager: true, cascade: true })
  skills: EmployeeSkill[];

  @OneToMany(type => FreeDay, freeDay => freeDay.employee, { eager: true, cascade: true })
  freeDays: FreeDay[];

  @ManyToOne(type => Shift, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE", nullable: false })
  @JoinColumn({ name: 'shift' })
  shift: Shift;
}
