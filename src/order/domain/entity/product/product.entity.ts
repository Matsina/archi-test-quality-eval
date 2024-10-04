import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { OrderItem } from '../order/order-item.entity';

export interface CreateProductCommand {
  productName: string;
  price: number;
  description: string;
  stock?: number;
  isActive?: boolean;
}
export interface ModifyProductCommand {
  id: string;
  productName: string;
  price: number;
  description: string;
  stock?: number;
  isActive?: boolean;
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
      return;
    }

    if (
      !createProductCommand.productName ||
      !createProductCommand.price ||
      !createProductCommand.description
    ) {
      throw new Error('Name, price and description are required');
    }

    this.productName = createProductCommand.productName;
    this.price = createProductCommand.price;
    this.description = createProductCommand.description;
    this.stock = stock ?? 0;
    if (createProductCommand.isActive !== undefined) {
      this.isActive = createProductCommand.isActive;
    } else {
      this.isActive = true;
    }
  }

  modify(modifyProductCommand: ModifyProductCommand): void {
    if (
      !modifyProductCommand.productName ||
      !modifyProductCommand.price ||
      !modifyProductCommand.description
    ) {
      throw new Error('Name, price and description are required');
    }
    this.productName = modifyProductCommand.productName;
    this.price = modifyProductCommand.price;
    this.description = modifyProductCommand.description;
    if (modifyProductCommand.stock) {
      this.stock = modifyProductCommand.stock;
    }
    if (modifyProductCommand.isActive !== undefined) {
      this.isActive = modifyProductCommand.isActive;
    }
  }

  delete(): void {
    if (this.orderItems.length > 0) {
      throw new Error(
        'Ce produit est lié à une commande, il ne peut être supprimé',
      );
    }
  }

  decrementStockProduct(quantity: number): number {
    this.stock -= quantity;

    if (this.stock <= 0) {
      this.stock = 0;
    }
    return this.stock;
  }
}
