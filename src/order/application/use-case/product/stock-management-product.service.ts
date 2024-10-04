import { NotFoundException } from '@nestjs/common';
import { Product } from 'aws-sdk/clients/ssm';
import { MailServiceInterface } from 'src/order/domain/port/mail/MailServiceInterface';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order/order.repository.interface';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';
export class StockManagementProductService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly productRepository: ProductRepositoryInterface,
    private readonly sendMailService: MailServiceInterface,
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderRepository.findById(orderId);

    for (const item of order.orderItems) {
      const product = await this.productRepository.findById(item.product.id);

      if (!product) {
        throw new NotFoundException('Pas de produit');
      }

      if (product.decrementStockProduct(item.quantity) === 0) {
        this.sendMailStockZero(item.productName);
      }

      await this.productRepository.save(product);
    }
  }

  private sendMailStockZero(product: Product) {
    const productName = product;
    this.sendMailService.sendEmail(
      'admin@mail.com',
      'Plus de stock',
      `Le produit ${productName} présente un stock à 0.`,
    );
  }
}
