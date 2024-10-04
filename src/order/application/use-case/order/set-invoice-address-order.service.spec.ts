import { OrderRepositoryInterface } from '../../../domain/port/persistance/order/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { SetInvoiceAddressOrderService } from './set-invoice-address-order.service';
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
      shippingAddress: '',
      invoiceAddress: 'Invoice Address',
    });

    order.id = id;
    order.status = OrderStatus.SHIPPING_ADDRESS_SET;

    return order;
  }
}

const orderRepositoryFake =
  new OrderRepositoryFake() as OrderRepositoryInterface;

describe("L'adresse de facturation ne peut être définie si celle de livraison ne l'est pas", () => {
  it('should return an error', async () => {
    const invoiceAddressOrderService = new SetInvoiceAddressOrderService(
      orderRepositoryFake,
    );

    await expect(
      invoiceAddressOrderService.execute('1', 'Martin Ville'),
    ).rejects.toThrow();
  });
});
