import { Entity, PrimaryColumn, OneToMany, Column } from 'typeorm';
import { SuppliesOrdered } from './SuppliesOrdered';
import { ProductsOrdered } from './ProductsOrdered';

@Entity()
export class ProductOrder {
  @PrimaryColumn()
  name: string;

  @Column()
  deadLine: Date;

  @Column({ nullable: true })
  delivered: boolean;

  @OneToMany(type => ProductsOrdered, productOrderd => productOrderd.productOrder, { eager: true })
  products: ProductsOrdered[];
}