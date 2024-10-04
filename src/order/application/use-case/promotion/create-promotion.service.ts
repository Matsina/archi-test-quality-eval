import { NotFoundException } from '@nestjs/common';
import { Order } from 'src/order/domain/entity/order/order.entity';
import { OrderRepositoryInterface } from 'src/order/domain/port/persistance/order/order.repository.interface';
import { PromotionRepositoryInterface } from 'src/order/domain/port/persistance/promotion/promotion.repository.interface';

export class CreatePromotionOrderService {
  constructor(
    private readonly orderRepository: OrderRepositoryInterface,
    private readonly promotionRepository: PromotionRepositoryInterface,
  ) {}

  public async execute(orderId: string, promotionId: string): Promise<Order> {
    const order = await this.orderRepository.findById(orderId);
    const promotion = await this.promotionRepository.findById(promotionId);
    if (!order) {
      throw new NotFoundException('Commande introuvable');
    }
    if (!promotion) {
      throw new NotFoundException('Code promo introuvable');
    }

    order.addPromotion(promotion);

    return this.orderRepository.save(order);
  }
}
