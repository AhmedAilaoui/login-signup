import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create.order.dto';
import { Product } from '../product/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    // Vérifier le stock pour chaque produit
    for (const item of createOrderDto.items) {
      const product = await this.productsRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${item.productId} not found`,
        );
      }

      if (product.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for product "${product.name}". Available: ${product.stock}, Requested: ${item.quantity}`,
        );
      }
    }

    // Créer la commande
    const order = this.ordersRepository.create({
      userId,
      totalAmount: createOrderDto.totalAmount,
      subtotal: createOrderDto.subtotal,
      shippingCost: createOrderDto.shippingCost,
      shippingAddress: createOrderDto.shippingAddress,
      phone: createOrderDto.phone,
      notes: createOrderDto.notes,
      status: OrderStatus.PENDING,
    });

    const savedOrder = await this.ordersRepository.save(order);

    // Créer les items de la commande et décrémenter le stock
    for (const item of createOrderDto.items) {
      const orderItem = this.orderItemsRepository.create({
        orderId: savedOrder.id,
        productId: item.productId,
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
        productImage: item.productImage,
        sellerName: item.sellerName,
      });

      await this.orderItemsRepository.save(orderItem);

      // Décrémenter le stock
      await this.productsRepository.decrement(
        { id: item.productId },
        'stock',
        item.quantity,
      );
    }

    // Retourner la commande complète avec les items
    const completeOrder = await this.ordersRepository.findOne({
      where: { id: savedOrder.id },
      relations: ['items', 'items.product'],
    });

    if (!completeOrder) {
      throw new NotFoundException(`Order with ID ${savedOrder.id} not found`);
    }

    return completeOrder;
  }

  async findAllByUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { userId },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id, userId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async updateStatus(id: number, status: OrderStatus): Promise<Order> {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = status;
    return this.ordersRepository.save(order);
  }

  async getUserStats(userId: number) {
    const orders = await this.ordersRepository.find({
      where: { userId },
      relations: ['items'],
    });

    const totalOrders = orders.length;
    const totalSpent = orders.reduce(
      (sum, order) => sum + Number(order.totalAmount),
      0,
    );
    const totalItems = orders.reduce(
      (sum, order) =>
        sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0),
      0,
    );

    const statusCounts = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      totalOrders,
      totalSpent: totalSpent.toFixed(2),
      totalItems,
      statusCounts,
    };
  }
}
