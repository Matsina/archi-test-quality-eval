import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './infrastructure/presentation/order/order.controller';
import { Order } from './domain/entity/order/order.entity';
import { OrderItem } from './domain/entity/order/order-item.entity';
import { CreateOrderService } from 'src/order/application/use-case/order/create-order.service';
import { SetInvoiceAddressOrderService } from 'src/order/application/use-case/order/set-invoice-address-order.service';
import { SetShippingAddressOrderService } from 'src/order/application/use-case/order/set-shipping-address-order.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order/order.repository';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order/order.repository.interface';
import { GenerateInvoiceService } from 'src/order/application/use-case/order/generate-invoice.service';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';
import { PdfGeneratorService } from 'src/order/infrastructure/pdf/pdf-generator.service';
import { CreateProductService } from './application/use-case/product/create-product.service';
import { ProductRepositoryInterface } from './domain/port/persistance/product/product.repository.interface';
import { DeleteProductService } from './application/use-case/product/delete-product.service';
import { ModifyProductService } from './application/use-case/product/modify-product.service';
import { ListProductService } from './application/use-case/product/list-product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    OrderRepositoryTypeOrm,
    {
      provide: DeleteProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new DeleteProductService(productRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: CreateProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new CreateProductService(productRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: ModifyProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ModifyProductService(productRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: ListProductService,
      useFactory: (productRepository: ProductRepositoryInterface) => {
        return new ListProductService(productRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
  ],
})
export class ProductModule {}
