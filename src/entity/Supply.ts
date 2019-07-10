import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Supply {
  @PrimaryColumn() 
  name: string;

  @Column()
  quantity: number;
}
