let products = [];
let cart = [];

async function loadProducts() {
  try {
    const response = await fetch('data.json');
    products = await response.json();
    render();
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

function addToCart(product) {
  const newItem = { ...product, quantity: 1 };
  cart.push(newItem);
  render();
}

function increaseQuantity(name) {
  const updatedCart = cart.map(item => {
    if (name === item.name) {
      return {
        ...item,
        quantity: item.quantity + 1
      };
    }
    return item;
  });
  cart = updatedCart;
  render();
}

function decreaseQuantity(name) {
  const updatedCart = cart.map(item => {
    if (name === item.name) {
      return {
        ...item,
        quantity: item.quantity - 1
      };
    }
    return item;
  });
  cart = updatedCart.filter(item => item.quantity > 0);
  render();
}

function removeProduct(name) {
  cart = cart.filter(product => product.name !== name);
  render();
}

function showConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  renderConfirmItems();
}

function hideConfirmModal() {
  const modal = document.getElementById('confirm-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function newOrder() {
  cart = [];
  hideConfirmModal();
  render();
}

function calculateCartTotal() {
  return cart.reduce((total, item) => total + (item.quantity * item.price), 0).toFixed(2);
}

function renderProducts() {
  const container = document.getElementById('products-container');
  container.innerHTML = '';

  products.forEach(product => {
    const cartProduct = cart.find(item => item.name === product.name);

    const productDiv = document.createElement('div');
    productDiv.className = 'mb-4';

    productDiv.innerHTML = `
      <div class="relative z-0 mb-6">
        <picture>
          <source srcset="${product.image.tablet}" media="(min-width: 768px)">
          <img class="rounded-lg" src="${product.image.mobile}" alt="${product.name}">
        </picture>
        ${!cartProduct ? renderAddButton(product) : renderQuantityButton(cartProduct)}
      </div>
      <div>
        <p class="text-Rose-500 text-[14px]">${product.category}</p>
        <h2 class="text-[16px] font-medium text-Rose-900">${product.name}</h2>
        <p class="text-Red font-medium">$${product.price.toFixed(2)}</p>
      </div>
    `;

    container.appendChild(productDiv);
  });

  attachProductEventListeners();
}

function renderAddButton(product) {
  return `
    <div class="absolute z-10 bottom-[-20px] left-20 md:left-15">
      <div class="bg-white w-[150px] p-2 rounded-full border border-Rose-500 flex gap-2 text-[14px] justify-center cursor-pointer hover:border-Red" data-action="add" data-product='${JSON.stringify(product)}'>
        <img src="images/icon-add-to-cart.svg" alt="Add to cart">
        <button class="font-medium text-Rose-900 cursor-pointer">Add to Cart</button>
      </div>
    </div>
  `;
}

function renderQuantityButton(cartProduct) {
  return `
    <div class="absolute z-10 bottom-[-20px] left-20 md:left-15">
      <div class="bg-Red w-[150px] p-2 rounded-full border border-Rose-500 flex gap-2 text-[14px] justify-around items-center">
        <img class="cursor-pointer" src="images/icon-decrement-quantity.svg" alt="Decrease" data-action="decrease" data-name="${cartProduct.name}">
        <span class="font-medium text-Rose-50">${cartProduct.quantity}</span>
        <img class="cursor-pointer" src="images/icon-increment-quantity.svg" alt="Increase" data-action="increase" data-name="${cartProduct.name}">
      </div>
    </div>
  `;
}

function attachProductEventListeners() {
  document.querySelectorAll('[data-action="add"]').forEach(button => {
    button.addEventListener('click', (e) => {
      const productData = e.currentTarget.getAttribute('data-product');
      const product = JSON.parse(productData);
      addToCart(product);
    });
  });

  document.querySelectorAll('[data-action="increase"]').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.currentTarget.getAttribute('data-name');
      increaseQuantity(name);
    });
  });

  document.querySelectorAll('[data-action="decrease"]').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.currentTarget.getAttribute('data-name');
      decreaseQuantity(name);
    });
  });
}

function renderCart() {
  const container = document.getElementById('cart-container');
  const isEmpty = cart.length === 0;

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
  } else {
    const cartTotal = calculateCartTotal();
    const cartItemsHTML = cart.map(item => renderCartItem(item)).join('');

    container.innerHTML = `
      <div class="bg-white p-4 rounded-lg md:ml-10 md:w-[500px] md:max-h-[500px] md:overflow-auto">
        <h2 class="text-2xl text-Red font-bold mb-4">Your Cart(${cart.length})</h2>
        ${cartItemsHTML}
        <div class="flex justify-between mt-6 items-center">
          <h3 class="text-Rose-500 font-medium text-[16px]">Order Total</h3>
          <p class="text-2xl font-bold text-Rose-900">$${cartTotal}</p>
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

    attachCartEventListeners();
  }
}

function renderCartItem(item) {
  const subTotal = (item.price * item.quantity).toFixed(2);
  return `
    <div>
      <div class="flex justify-between mb-4 items-center mt-4">
        <div class="flex flex-col">
          <p class="text-[14px] text-Rose-500 font-medium">${item.name}</p>
          <div class="flex gap-3 text-[14px]">
            <p class="text-Red font-medium">${item.quantity}x</p>
            <p class="text-Rose-400">@$${item.price.toFixed(2)}</p>
            <p class="text-Rose-500 font-medium">$${subTotal}</p>
          </div>
        </div>
        <div class="border rounded-full border-Rose-400 items-center flex p-1.5 cursor-pointer hover:border-Rose-900" data-action="remove" data-name="${item.name}">
          <img src="images/icon-remove-item.svg" alt="Remove item">
        </div>
      </div>
      <hr class="text-Rose-300">
    </div>
  `;
}

function attachCartEventListeners() {
  document.querySelectorAll('[data-action="remove"]').forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.currentTarget.getAttribute('data-name');
      removeProduct(name);
    });
  });

  const confirmBtn = document.getElementById('confirm-order-btn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', showConfirmModal);
  }
}

function renderConfirmItems() {
  const container = document.getElementById('confirm-items');
  const cartTotal = calculateCartTotal();

  const itemsHTML = cart.map(item => {
    const subTotal = (item.price * item.quantity).toFixed(2);
    return `
      <div>
        <div class="flex justify-between mb-4 items-center mt-4">
          <img class="size-10 rounded-md" src="${item.image.thumbnail}" alt="thumbnail">
          <div class="flex flex-col">
            <p class="text-[14px] text-Rose-500 font-medium">${item.name}</p>
            <div class="flex gap-3 text-[14px]">
              <p class="text-Red font-medium">${item.quantity}x</p>
              <p class="text-Rose-400">@$${item.price.toFixed(2)}</p>
            </div>
          </div>
          <div>
            <p class="text-Rose-900 font-medium">$${subTotal}</p>
          </div>
        </div>
        <hr class="text-Rose-300">
      </div>
    `;
  }).join('');

  container.innerHTML = itemsHTML;

  const totalElement = document.getElementById('confirm-total');
  totalElement.textContent = `$${cartTotal}`;
}

function render() {
  renderProducts();
  renderCart();
}

document.addEventListener('DOMContentLoaded', () => {
  loadProducts();

  const newOrderBtn = document.getElementById('new-order-btn');
  newOrderBtn.addEventListener('click', newOrder);
});
