import { NotFoundException } from '@nestjs/common';
import {
  CreateProductCommand,
  Product,
  ModifyProductCommand,
} from 'src/order/domain/entity/product/product.entity';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';

export class ModifyProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  public async execute(
    modifyProductCommand: ModifyProductCommand,
  ): Promise<void> {
    const product = await this.productRepository.findById(
      modifyProductCommand.id,
    );
    if (!product) {
      throw new NotFoundException('Pas de produit');
    }
    product.modify(modifyProductCommand);
    await this.productRepository.save(product);
  }
}
