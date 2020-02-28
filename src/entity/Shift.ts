import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Shift {
  @PrimaryColumn() 
  name: string;

  @Column('time')
  start: string;

  @Column('time')
  end: string;

  @Column('time')
  breakStart: string;

  @Column('time')
  breakEnd: string;
}
