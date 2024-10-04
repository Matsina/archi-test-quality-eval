import { NotFoundException } from '@nestjs/common';
import {
  CreateProductCommand,
  Product,
} from 'src/order/domain/entity/product/product.entity';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';

export class ModifyProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  public async execute(
    productId: string,
    updateCommand: CreateProductCommand,
    stock?: number,
  ): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Pas de produit');
    }
    product.modify(updateCommand, stock);
    await this.productRepository.save(product);
  }
}
