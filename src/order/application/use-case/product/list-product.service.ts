import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/order/domain/entity/product/product.entity';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';

export class ListProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  public async execute(isActive: boolean): Promise<Product[]> {
    return await this.productRepository.findAllByStatus(isActive);
  }
}
