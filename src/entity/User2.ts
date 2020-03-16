import { Entity, PrimaryColumn, Column } from 'typeorm';


@Entity()
export class User2 {
  @PrimaryColumn()
  username: string;

  @Column()
  password: string;
}