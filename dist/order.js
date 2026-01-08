export class OrderManager {
    constructor() {
        this.confirmModal = null;
        this.confirmModal = document.getElementById('confirm-modal');
    }
    showConfirmModal(cartItems, total) {
        if (!this.confirmModal)
            return;
        this.confirmModal.classList.remove('hidden');
        this.confirmModal.classList.add('flex');
        this.renderConfirmItems(cartItems, total);
    }
    hideConfirmModal() {
        if (!this.confirmModal)
            return;
        this.confirmModal.classList.add('hidden');
        this.confirmModal.classList.remove('flex');
    }
    renderConfirmItems(cartItems, total) {
        const container = document.getElementById('confirm-items');
        const totalElement = document.getElementById('confirm-total');
        if (!container || !totalElement)
            return;
        const itemsHTML = cartItems.map(item => {
            const subTotal = (item.dessert.price * item.quantity).toFixed(2);
            return `
        <div>
          <div class="flex justify-between mb-4 items-center mt-4">
            <img class="size-10 rounded-md" src="${item.dessert.image.thumbnail}" alt="thumbnail">
            <div class="flex flex-col">
              <p class="text-[14px] text-Rose-500 font-medium">${item.dessert.name}</p>
              <div class="flex gap-3 text-[14px]">
                <p class="text-Red font-medium">${item.quantity}x</p>
                <p class="text-Rose-400">@$${item.dessert.price.toFixed(2)}</p>
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
        totalElement.textContent = `$${total}`;
    }
}
