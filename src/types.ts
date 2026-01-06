export enum DessertCategory {
  Waffle = "Waffle",
  CremeBrulee = "Crème Brûlée",
  Macaron = "Macaron",
  Tiramisu = "Tiramisu",
  Baklava = "Baklava",
  Pie = "Pie",
  Cake = "Cake",
  Brownie = "Brownie",
  PannaCotta = "Panna Cotta"
}

export type OrderStatus = "pending" | "confirmed" | "delivered";
export type Currency = "USD" | "EUR" | "GBP";
export type DessertId = string;

export interface DessertImage {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Dessert {
  id: DessertId;
  name: string;
  category: DessertCategory;
  price: number;
  image: DessertImage;
  description?: string;
  inStock?: boolean;
}

export interface CartItem {
  dessert: Dessert;
  quantity: number;
  addedAt: Date;
}

// Phase 3.2: Discriminated Union for Events
export type CartEvent =
  | { type: "ITEM_ADDED"; payload: CartItem }
  | { type: "ITEM_REMOVED"; payload: DessertId }
  | { type: "QUANTITY_UPDATED"; payload: { id: DessertId; qty: number } }
  | { type: "CART_CLEARED" };


