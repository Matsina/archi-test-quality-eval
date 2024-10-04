import { Product } from '../../../entity/product/product.entity';

export interface ProductRepositoryInterface {
  save(order: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  findAll(): Promise<Product[]>;
  findByProductName(productName: string): Promise<Product[]>;
  deleteProduct(id: string): Promise<void>;
  findAllByStatus(isActive: boolean): Promise<Product[]>;
}
