import { Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Phase } from './Phase';

@Entity()
export class Product {
  @PrimaryColumn()
  name: string;

  @OneToMany(type => Phase, phase => phase.product, { eager: true })
  phases: Phase[];
}