import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './infrastructure/presentation/order.controller';
import { Order } from './domain/entity/order/order.entity';
import { OrderItem } from './domain/entity/order/order-item.entity';
import { CreateOrderService } from 'src/order/application/use-case/order/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/order/pay-order.service';
import { CancelOrderService } from 'src/order/application/use-case/order/cancel-order.service';
import { SetInvoiceAddressOrderService } from 'src/order/application/use-case/order/set-invoice-address-order.service';
import { SetShippingAddressOrderService } from 'src/order/application/use-case/order/set-shipping-address-order.service';
import OrderRepositoryTypeOrm from 'src/order/infrastructure/persistance/order/order.repository';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order/order.repository.interface';
import { GenerateInvoiceService } from 'src/order/application/use-case/order/generate-invoice.service';
import { PdfGeneratorServiceInterface } from 'src/order/domain/port/pdf/pdf-generator.service.interface';
import { PdfGeneratorService } from 'src/order/infrastructure/pdf/pdf-generator.service';
import { CreateProductService } from './application/use-case/product/create-product.service';
import { ProductRepositoryInterface } from './domain/port/persistance/product/product.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem])],
  controllers: [OrderController],

  providers: [
    OrderRepositoryTypeOrm,
    PdfGeneratorService,

    {
      provide: GenerateInvoiceService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        pdfGeneratorService: PdfGeneratorServiceInterface,
      ) => {
        return new GenerateInvoiceService(orderRepository, pdfGeneratorService);
      },
      inject: [OrderRepositoryTypeOrm, PdfGeneratorService],
    },

    {
      provide: PayOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new PayOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: CancelOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CancelOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetInvoiceAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetInvoiceAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },

    {
      provide: SetShippingAddressOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new SetShippingAddressOrderService(orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: CreateOrderService,
      useFactory: (orderRepository: OrderRepositoryInterface) => {
        return new CreateOrderService(orderRepository);
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
  ],
})
export class OrderModule {}
