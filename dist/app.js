import { loadProducts } from './data.js';
import { Cart } from './cart.js';
import { OrderManager } from './order.js';
import { Renderer } from './renderer.js';
class App {
    constructor() {
        this.products = [];
        this.cart = new Cart();
        this.orderManager = new OrderManager();
        this.renderer = new Renderer();
    }
    async initialize() {
        this.products = await loadProducts();
        this.render();
        this.attachGlobalEventListeners();
    }
    attachGlobalEventListeners() {
        const newOrderBtn = document.getElementById('new-order-btn');
        newOrderBtn?.addEventListener('click', () => this.handleNewOrder());
    }
    handleAddToCart(dessert) {
        this.cart.addItem(dessert);
        this.render();
    }
    handleIncreaseQuantity(dessertId) {
        this.cart.increaseQuantity(dessertId);
        this.render();
    }
    handleDecreaseQuantity(dessertId) {
        this.cart.decreaseQuantity(dessertId);
        this.render();
    }
    handleRemoveProduct(dessertId) {
        this.cart.removeItem(dessertId);
        this.render();
    }
    handleConfirmOrder() {
        const cartItems = this.cart.getItems();
        const total = this.cart.calculateTotal();
        this.orderManager.showConfirmModal(cartItems, total);
    }
    handleNewOrder() {
        this.cart.clear();
        this.orderManager.hideConfirmModal();
        this.render();
    }
    render() {
        this.renderer.renderProducts(this.products, this.cart.getItems(), (dessert) => this.handleAddToCart(dessert), (dessertId) => this.handleIncreaseQuantity(dessertId), (dessertId) => this.handleDecreaseQuantity(dessertId));
        this.renderer.renderCart(this.cart.getItems(), this.cart.calculateTotal(), (dessertId) => this.handleRemoveProduct(dessertId), () => this.handleConfirmOrder());
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.initialize();
});
