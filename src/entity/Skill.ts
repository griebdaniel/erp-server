import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';

@Entity()
export class Skill {
  @PrimaryColumn()
  name: string;
}