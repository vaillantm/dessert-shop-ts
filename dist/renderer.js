export class Renderer {
    renderProducts(desserts, cartItems, onAdd, onIncrease, onDecrease) {
        const container = document.getElementById('products-container');
        if (!container)
            return;
        container.innerHTML = '';
        desserts.forEach(dessert => {
            const cartItem = cartItems.find(item => item.dessert.id === dessert.id);
            const productDiv = document.createElement('div');
            productDiv.className = 'mb-4';
            productDiv.innerHTML = `
        <div class="relative z-0 mb-6">
          <picture>
            <source srcset="${dessert.image.tablet}" media="(min-width: 768px)">
            <img class="rounded-lg" src="${dessert.image.mobile}" alt="${dessert.name}">
          </picture>
          ${!cartItem ? this.renderAddButton() : this.renderQuantityButton(cartItem)}
        </div>
        <div>
          <p class="text-Rose-500 text-[14px]">${dessert.category}</p>
          <h2 class="text-[16px] font-medium text-Rose-900">${dessert.name}</h2>
          <p class="text-Red font-medium">$${dessert.price.toFixed(2)}</p>
        </div>
      `;
            container.appendChild(productDiv);
            if (!cartItem) {
                const addButton = productDiv.querySelector('[data-action="add"]');
                addButton?.addEventListener('click', () => onAdd(dessert));
            }
            else {
                const increaseButton = productDiv.querySelector('[data-action="increase"]');
                const decreaseButton = productDiv.querySelector('[data-action="decrease"]');
                increaseButton?.addEventListener('click', () => onIncrease(cartItem.dessert.id));
                decreaseButton?.addEventListener('click', () => onDecrease(cartItem.dessert.id));
            }
        });
    }
    renderAddButton() {
        return `
      <div class="absolute z-10 bottom-[-20px] left-20 md:left-15">
        <div class="bg-white w-[150px] p-2 rounded-full border border-Rose-500 flex gap-2 text-[14px] justify-center cursor-pointer hover:border-Red" data-action="add">
          <img src="images/icon-add-to-cart.svg" alt="Add to cart">
          <button class="font-medium text-Rose-900 cursor-pointer">Add to Cart</button>
        </div>
      </div>
    `;
    }
    renderQuantityButton(cartItem) {
        return `
      <div class="absolute z-10 bottom-[-20px] left-20 md:left-15">
        <div class="bg-Red w-[150px] p-2 rounded-full border border-Rose-500 flex gap-2 text-[14px] justify-around items-center">
          <img class="cursor-pointer" src="images/icon-decrement-quantity.svg" alt="Decrease" data-action="decrease">
          <span class="font-medium text-Rose-50">${cartItem.quantity}</span>
          <img class="cursor-pointer" src="images/icon-increment-quantity.svg" alt="Increase" data-action="increase">
        </div>
      </div>
    `;
    }
    renderCart(cartItems, total, onRemove, onConfirm) {
        const container = document.getElementById('cart-container');
        if (!container)
            return;
        const isEmpty = cartItems.length === 0;
        if (isEmpty) {
            container.innerHTML = `
        <div class="bg-white p-4 rounded-lg md:ml-10 md:w-[500px] md:h-[280px]">
          <h2 class="text-2xl text-Red font-bold mb-4">Your Cart(0)</h2>
          <div class="flex flex-col items-center gap-4 mb-4">
            <img src="images/illustration-empty-cart.svg" alt="Empty cart">
            <p class="text-[14px] text-Rose-500 font-medium">Your added items will appear here</p>
          </div>
        </div>
      `;
        }
        else {
            const cartItemsHTML = cartItems.map(item => this.renderCartItem(item)).join('');
            container.innerHTML = `
        <div class="bg-white p-4 rounded-lg md:ml-10 md:w-[500px] md:max-h-[500px] md:overflow-auto">
          <h2 class="text-2xl text-Red font-bold mb-4">Your Cart(${cartItems.length})</h2>
          ${cartItemsHTML}
          <div class="flex justify-between mt-6 items-center">
            <h3 class="text-Rose-500 font-medium text-[16px]">Order Total</h3>
            <p class="text-2xl font-bold text-Rose-900">$${total}</p>
          </div>
          <div class="bg-Rose-50 mt-4 p-2 flex gap-2 text-[14px] justify-center text-Rose-500 rounded-lg">
            <img src="images/icon-carbon-neutral.svg" alt="Carbon neutral">
            <p>This is a <span class="text-Rose-900 font-medium">carbon-neutral</span> delivery</p>
          </div>
          <button id="confirm-order-btn" class="text-Rose-50 bg-Red w-full h-10 rounded-full mt-6 cursor-pointer text-[14px] font-medium hover:bg-opacity-90">
            Confirm Order
          </button>
        </div>
      `;
            cartItems.forEach(item => {
                const removeButton = container.querySelector(`[data-remove="${item.dessert.id}"]`);
                removeButton?.addEventListener('click', () => onRemove(item.dessert.id));
            });
            const confirmBtn = document.getElementById('confirm-order-btn');
            confirmBtn?.addEventListener('click', onConfirm);
        }
    }
    renderCartItem(item) {
        const subTotal = (item.dessert.price * item.quantity).toFixed(2);
        return `
      <div>
        <div class="flex justify-between mb-4 items-center mt-4">
          <div class="flex flex-col">
            <p class="text-[14px] text-Rose-500 font-medium">${item.dessert.name}</p>
            <div class="flex gap-3 text-[14px]">
              <p class="text-Red font-medium">${item.quantity}x</p>
              <p class="text-Rose-400">@$${item.dessert.price.toFixed(2)}</p>
              <p class="text-Rose-500 font-medium">$${subTotal}</p>
            </div>
          </div>
          <div class="border rounded-full border-Rose-400 items-center flex p-1.5 cursor-pointer hover:border-Rose-900" data-remove="${item.dessert.id}">
            <img src="images/icon-remove-item.svg" alt="Remove item">
          </div>
        </div>
        <hr class="text-Rose-300">
      </div>
    `;
    }
}
