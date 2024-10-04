import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from '../product/product.entity';

export interface ItemDetailCommand {
  productName: string;
  price: number;
  quantity: number;
}

@Entity('order-item')
export class OrderItem {
  static MAX_QUANTITY = 5;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productName: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'int',
  })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    nullable: false,
  })
  product: Product;

  constructor(itemCommand: ItemDetailCommand, product: Product) {
    if (!itemCommand) {
      return;
    }
    if (itemCommand.quantity > OrderItem.MAX_QUANTITY) {
      throw new Error(
        'Quantity of items cannot exceed ' + OrderItem.MAX_QUANTITY,
      );
    }

    this.productName = itemCommand.productName;
    this.quantity = itemCommand.quantity;
    this.price = itemCommand.price;
    this.product = product;
  }
}
