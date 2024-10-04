import { OrderRepositoryInterface } from '../../../domain/port/persistance/order/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { SetShippingAddressOrderService } from './set-shipping-address-order.service';
import { Order, OrderStatus } from '../../../domain/entity/order/order.entity';

class OrderRepositoryFake {
  async save(order) {
    return order;
  }

  async findById(id) {
    const order = new Order({
      customerName: 'Maurice',
      items: [
        { productName: 'item 1', price: 10, quantity: 1 },
        { productName: 'item 1', price: 10, quantity: 1 },
        { productName: 'item 1', price: 10, quantity: 1 },
        { productName: 'item 1', price: 10, quantity: 1 },
      ],
      shippingAddress: 'Shipping Address',
      invoiceAddress: '',
    });

    order.id = id;
    order.status = OrderStatus.PENDING;

    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("L'adresse de livraison ne peut être définie si la commande n'a pas été payée", () => {
  it('should return an error', async () => {
    const shippingAddressOrderService = new SetShippingAddressOrderService(
      orderRepositoryFake,
    );

    await expect(
      shippingAddressOrderService.execute('1', 'Martin Ville'),
    ).rejects.toThrow();
  });
});
