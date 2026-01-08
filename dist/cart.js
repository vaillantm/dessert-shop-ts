export class Cart {
    constructor() {
        this.items = [];
    }
    getItems() {
        return this.items;
    }
    isEmpty() {
        return this.items.length === 0;
    }
    getItemCount() {
        return this.items.length;
    }
    findItem(dessertId) {
        return this.items.find(item => item.dessert.id === dessertId);
    }
    addItem(dessert) {
        const existingItem = this.findItem(dessert.id);
        if (existingItem) {
            // If item exists, increase quantity
            this.increaseQuantity(dessert.id);
        }
        else {
            // Add new item
            const newItem = {
                dessert,
                quantity: 1,
                addedAt: new Date()
            };
            this.items.push(newItem);
        }
    }
    increaseQuantity(dessertId) {
        this.items = this.items.map(item => {
            if (dessertId === item.dessert.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                };
            }
            return item;
        });
    }
    decreaseQuantity(dessertId) {
        this.items = this.items.map(item => {
            if (dessertId === item.dessert.id) {
                return {
                    ...item,
                    quantity: item.quantity - 1
                };
            }
            return item;
        }).filter(item => item.quantity > 0);
    }
    removeItem(dessertId) {
        this.items = this.items.filter(item => item.dessert.id !== dessertId);
    }
    calculateTotal() {
        return this.items.reduce((total, item) => total + (item.quantity * item.dessert.price), 0).toFixed(2);
    }
    clear() {
        this.items = [];
    }
}
