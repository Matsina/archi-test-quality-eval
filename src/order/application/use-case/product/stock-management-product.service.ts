// import { NotFoundException } from '@nestjs/common';
// import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';
// import { OrderItem } from 'src/order/domain/entity/order/order-item.entity';
// import { CreateOrderCommand } from 'src/order/domain/entity/order/order.entity';

// export class StockManagementProductService {
//   constructor(private readonly productRepository: ProductRepositoryInterface) {}

//   public async execute(createOrderCommand: CreateOrderCommand): Promise<void> {
//     for (const item of createOrderCommand.items) {
//       const product = await this.productRepository.findByProductName(item.productName);

//       if (!product) {
//         throw new NotFoundException(`Product ${item.productName} not found`);
//       }

//       if (product.stock < item.quantity) {
//         throw new Error(`Insufficient stock for product ${item.productName}`);
//       }

//       product.stock -= item.quantity;
//       await this.productRepository.save(product);
//     }
//   }
// }
