import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';
import {
  CreateProductCommand,
  Product,
} from 'src/order/domain/entity/product/product.entity';

export class CreateProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async execute(createOrderCommand: CreateProductCommand): Promise<Product> {
    const product = new Product(createOrderCommand);

    return await this.productRepository.save(product);
  }
}
