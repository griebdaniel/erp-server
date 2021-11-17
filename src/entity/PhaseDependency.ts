import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Phase } from './Phase';

@Entity()
export class PhaseDependency {
  @ManyToOne(type => Phase, {  onDelete: "CASCADE", onUpdate: "CASCADE", primary: true })
  @JoinColumn([{ name: 'phase', referencedColumnName: 'name' }, { name: 'product', referencedColumnName: 'product' }])
  phase: Phase;

  @ManyToOne(type => Phase, { onDelete: "CASCADE", onUpdate: "CASCADE", primary: true })
  @JoinColumn([{ name: 'dependency', referencedColumnName: 'name' }, { name: 'productDependency', referencedColumnName: 'product' }])
  dependency: Phase;
}