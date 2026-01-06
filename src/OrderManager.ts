import { CartItem, OrderStatus } from "./types";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
}

export class OrderManager {
  private orders: Order[] = [];

  createOrder(cartItems: CartItem[], total: number): Order {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      items: [...cartItems],
      total,
      status: "pending",
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  confirmOrder(orderId: string): void {
    const order = this.orders.find((o) => o.id === orderId);
    if (order) order.status = "confirmed";
  }
}


