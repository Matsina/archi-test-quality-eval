import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from '../order/order-item.entity';

export interface CreateProductCommand {
  productName: string;
  price: number;
  description: string;
}

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column('decimal')
  price: number;

  @Column('int', { default: 0 })
  stock: number;

  @Column('boolean', { default: true })
  isActive: boolean;

  @Column('text')
  description: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  constructor(createProductCommand?: CreateProductCommand, stock?: number) {
    if (!createProductCommand) {
      throw new Error('Name, price and description are required');
    }
    this.productName = createProductCommand.productName;
    this.price = createProductCommand.price;
    this.description = createProductCommand.description;
    this.isActive = true;
    this.stock = stock ?? 0;
  }

  modify(createProductCommand: CreateProductCommand, stock?: number): void {
    if (!createProductCommand) {
      throw new Error('Name, price and description are required');
    }
    this.productName = createProductCommand.productName;
    this.price = createProductCommand.price;
    this.description = createProductCommand.description;
    this.stock = stock ?? 0;
  }

  delete(): void {
    if (this.orderItems.length > 0) {
      throw new Error(
        'Ce produit est lié à une commande, il ne peut être supprimé',
      );
    }
  }
}
