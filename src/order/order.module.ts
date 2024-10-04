import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import OrderController from './infrastructure/presentation/order/order.controller';
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
import { Product } from './domain/entity/product/product.entity';
import { Promotion } from './domain/entity/promotion/promotion.entity';
import { DeleteProductService } from './application/use-case/product/delete-product.service';
import { ModifyProductService } from './application/use-case/product/modify-product.service';
import { ListProductService } from './application/use-case/product/list-product.service';
import { ProductToBasketService } from './application/use-case/product/product-to-basket.service';
import { StockManagementProductService } from './application/use-case/product/stock-management-product.service';
import { MailServiceInterface } from './domain/port/mail/MailServiceInterface';
import { CreatePromotionOrderService } from './application/use-case/promotion/create-promotion.service';
import { PromotionRepositoryInterface } from './domain/port/persistance/promotion/promotion.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product, Promotion])],
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
    {
      provide: ProductToBasketService,
      useFactory: (
        productRepository: ProductRepositoryInterface,
        orderRepository: OrderRepositoryInterface,
      ) => {
        return new ProductToBasketService(productRepository, orderRepository);
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: StockManagementProductService,
      useFactory: (
        productRepository: ProductRepositoryInterface,
        orderRepository: OrderRepositoryInterface,
        sendMailService: MailServiceInterface,
      ) => {
        return new StockManagementProductService(
          orderRepository,
          productRepository,
          sendMailService,
        );
      },
      inject: [OrderRepositoryTypeOrm],
    },
    {
      provide: CreatePromotionOrderService,
      useFactory: (
        orderRepository: OrderRepositoryInterface,
        promotionRepository: PromotionRepositoryInterface,
      ) => {
        return new CreatePromotionOrderService(
          orderRepository,
          promotionRepository,
        );
      },
      inject: [OrderRepositoryTypeOrm],
    },
  ],
})
export class OrderModule {}
