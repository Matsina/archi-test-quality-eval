import { NotFoundException } from '@nestjs/common';
import { Product } from 'src/order/domain/entity/product/product.entity';
import { ProductRepositoryInterface } from 'src/order/domain/port/persistance/product/product.repository.interface';

export class DeleteProductService {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  public async execute(productId: string): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Pas de produit');
    }
    product.delete();
    await this.productRepository.deleteProduct(productId);
  }
}
