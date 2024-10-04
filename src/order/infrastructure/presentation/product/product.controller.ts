import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateOrderCommand,
  Order,
} from 'src/order/domain/entity/order/order.entity';
import { CreateOrderService } from 'src/order/application/use-case/order/create-order.service';
import { PayOrderService } from 'src/order/application/use-case/order/pay-order.service';

@Controller('/orders')
export default class ProductController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly payOrderService: PayOrderService,
  ) {}
}
