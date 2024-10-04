import { Product } from 'src/order/domain/entity/product/product.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order/order.repository.interface';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';

export class ProductToBasketService {
  constructor(
    private readonly productRepository: ProductRepositoryInterface,
    private readonly orderRepository: OrderRepositoryInterface,
  ) {}

  async execute(orderId: string, productId: string, quantity: number) {
    const product = await this.productRepository.findById(productId);
    const order = await this.orderRepository.findById(orderId);
    order.checkIfAddItemsToBasket();

    return await this.productRepository.save(product);
  }
}
