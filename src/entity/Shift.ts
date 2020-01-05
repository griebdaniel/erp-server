import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Shift {
  @PrimaryColumn() 
  name: string;

  @Column('time')
  start: Date;

  @Column('time')
  end: Date;

  @Column('time')
  breakStart: string;

  @Column('time')
  breakEnd: string;
}
