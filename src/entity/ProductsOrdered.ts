import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from 'typeorm';
import { Product } from './Product';
import { ProductOrder } from './ProductOrder';

@Entity()
export class ProductsOrdered {
  @PrimaryColumn('string')
  @ManyToOne(type => Product, { eager: true, onDelete: "CASCADE", onUpdate: "CASCADE" })
  @JoinColumn({ name: 'product' })
  product: Product;

  @PrimaryColumn('string')
  @ManyToOne(type => ProductOrder, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productOrder' })
  productOrder: ProductOrder;

  @Column()
  quantity: number;
}