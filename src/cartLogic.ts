import { CartItem, Dessert, DessertId } from "./types";

export const addToCart = (
  cart: CartItem[],
  dessert: Dessert,
  quantity: number
): CartItem[] => {
  const existing = cart.find((item) => item.dessert.id === dessert.id);
  if (existing) {
    return updateQuantity(cart, dessert.id, existing.quantity + quantity);
  }
  return [...cart, { dessert, quantity, addedAt: new Date() }];
};

export const removeFromCart = (
  cart: CartItem[],
  dessertId: DessertId
): CartItem[] => {
  return cart.filter((item) => item.dessert.id !== dessertId);
};

export const updateQuantity = (
  cart: CartItem[],
  dessertId: DessertId,
  newQuantity: number
): CartItem[] => {
  if (newQuantity <= 0) return removeFromCart(cart, dessertId);
  return cart.map((item) =>
    item.dessert.id === dessertId ? { ...item, quantity: newQuantity } : item
  );
};

export const calculateTotal = (cart: CartItem[]) => {
  const subtotal = cart.reduce(
    (acc, item) => acc + item.dessert.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% Tax
  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number((subtotal + tax).toFixed(2)),
  };
};


