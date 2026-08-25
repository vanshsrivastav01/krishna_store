/**
 * NexMart Checkout Flow Controller
 * Manages address validation, delivery options, payment gateway tab selectors, and simulated order creation.
 */

document.addEventListener("DOMContentLoaded", () => {
  initCheckoutPage();
});

let selectedPaymentMode = "upi";
let expressDeliveryFee = 0;

function initCheckoutPage() {
  const cart = Store.getCart();
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }

  renderCheckoutSummary();
  setupPaymentModeSelectors();
}

function renderCheckoutSummary() {
  const container = document.getElementById("checkout-summary-container");
  if (!container) return;

  const totals = Store.getCartTotal();
  const finalAmount = totals.finalTotal + expressDeliveryFee;

  container.innerHTML = `
    <h3 style="font-size: 1.125rem; font-weight: 800; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-border);">Order Summary</h3>
    
    <div style="max-height: 240px; overflow-y: auto; margin-bottom: 1.25rem; display: flex; flex-direction: column; gap: 0.75rem;">
      ${Store.getCart().map(item => {
        const p = PRODUCTS.find(prod => prod.id === item.id);
        if (!p) return "";
        return `
          <div style="display: flex; gap: 0.85rem; align-items: center; font-size: 0.875rem;">
            <img src="${p.images[0]}" alt="${p.name}" style="width: 48px; height: 48px; object-fit: contain; background: #F8FAFC; border-radius: var(--radius-sm);">
            <div style="flex: 1;">
              <div style="font-weight: 700; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">${p.name}</div>
              <div style="color: var(--color-text-muted); font-size: 0.75rem;">Qty: ${item.quantity} • ${Utils.formatINR(p.price)}</div>
            </div>
            <div style="font-weight: 700;">${Utils.formatINR(p.price * item.quantity)}</div>
          </div>
        `;
      }).join('')}
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.875rem; padding-top: 1rem; border-top: 1px solid var(--color-border); margin-bottom: 1.25rem;">
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--color-text-muted);">Items Total</span>
        <span>${Utils.formatINR(totals.mrpTotal)}</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: var(--color-success);">
        <span>Discount</span>
        <span>-${Utils.formatINR(totals.savings)}</span>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <span style="color: var(--color-text-muted);">Delivery</span>
        <span>${totals.deliveryFee === 0 && expressDeliveryFee === 0 ? "FREE" : Utils.formatINR(totals.deliveryFee + expressDeliveryFee)}</span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem;">
      <span>Payable Total</span>
      <span style="color: var(--color-primary);">${Utils.formatINR(finalAmount)}</span>
    </div>

    <button class="btn btn-primary btn-lg" style="width: 100%; text-align: center;" onclick="processOrderPlacement()">
      Place Order & Pay
    </button>
  `;
}

function setupPaymentModeSelectors() {
  const modes = document.querySelectorAll(".payment-mode-card");
  modes.forEach(mode => {
    mode.addEventListener("click", () => {
      modes.forEach(m => m.classList.remove("active"));
      mode.classList.add("active");
      selectedPaymentMode = mode.dataset.mode;

      document.querySelectorAll(".payment-subdetails").forEach(d => d.style.display = "none");
      const targetDetail = document.getElementById(`pay-detail-${selectedPaymentMode}`);
      if (targetDetail) targetDetail.style.display = "block";
    });
  });
}

function setDeliveryOption(fee) {
  expressDeliveryFee = fee;
  renderCheckoutSummary();
}

function processOrderPlacement() {
  const fullName = document.getElementById("checkout-fullname").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const street = document.getElementById("checkout-street").value.trim();
  const city = document.getElementById("checkout-city").value.trim();
  const state = document.getElementById("checkout-state").value.trim();
  const pincode = document.getElementById("checkout-pincode").value.trim();
  const errorMsg = document.getElementById("checkout-error-msg");

  if (!fullName || !phone || !street || !city || !state || !pincode) {
    if (errorMsg) {
      errorMsg.textContent = "Please fill in all shipping address fields before placing your order.";
      errorMsg.scrollIntoView({ behavior: "smooth" });
    }
    return;
  }

  const totals = Store.getCartTotal();
  const orderId = "NEX-" + Math.floor(100000 + Math.random() * 900000);

  const newOrder = {
    id: orderId,
    date: new Date().toISOString(),
    total: totals.finalTotal + expressDeliveryFee,
    paymentMethod: selectedPaymentMode.toUpperCase(),
    status: "Ordered",
    step: 1,
    items: Store.getCart().map(i => {
      const p = PRODUCTS.find(prod => prod.id === i.id);
      return { id: i.id, quantity: i.quantity, price: p.price, name: p.name };
    }),
    address: { name: fullName, street, city, state, pincode }
  };

  Store.addOrder(newOrder);
  Utils.showToast("Order placed successfully!", "success");

  setTimeout(() => {
    window.location.href = `success.html?orderId=${orderId}`;
  }, 500);
}
