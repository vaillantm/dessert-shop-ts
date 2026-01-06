import { CartItem, CartEvent, Dessert, DessertId } from "./types";

export class ShoppingCart {
  private items: Map<DessertId, CartItem> = new Map();
  private listeners: ((event: CartEvent) => void)[] = [];

  addItem(dessert: Dessert, quantity: number): void {
    const existing = this.items.get(dessert.id);
    const newQty = existing ? existing.quantity + quantity : quantity;
    const item: CartItem = { dessert, quantity: newQty, addedAt: new Date() };

    this.items.set(dessert.id, item);
    this.notify({ type: "ITEM_ADDED", payload: item });
  }

  removeItem(id: DessertId): void {
    if (this.items.delete(id)) {
      this.notify({ type: "ITEM_REMOVED", payload: id });
    }
  }

  updateQuantity(id: DessertId, qty: number): void {
    const item = this.items.get(id);
    if (!item) return;
    if (qty <= 0) {
      this.removeItem(id);
      return;
    }

    const updated: CartItem = { ...item, quantity: qty };
    this.items.set(id, updated);
    this.notify({ type: "QUANTITY_UPDATED", payload: { id, qty } });
  }

  clear(): void {
    this.items.clear();
    this.notify({ type: "CART_CLEARED" });
  }

  getItems(): CartItem[] {
    return Array.from(this.items.values());
  }

  get total(): number {
    return Number(
      this.getItems()
        .reduce((sum, i) => sum + i.dessert.price * i.quantity, 0)
        .toFixed(2)
    );
  }

  // Phase 3.2: Subscription System
  subscribe(callback: (event: CartEvent) => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify(event: CartEvent) {
    this.listeners.forEach((callback) => callback(event));
  }
}


