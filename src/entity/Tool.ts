import { Entity, PrimaryColumn, Column } from 'typeorm';


@Entity()
export class Tool {
  @PrimaryColumn()
  name: string;

  @Column()
  count: number;
}