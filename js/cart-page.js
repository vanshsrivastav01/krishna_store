/**
 * NexMart Shopping Cart Page Controller
 * Manages live cart quantity updates, item removal, savings calculations, promo coupons, and empty states.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderCartPage();
  window.addEventListener("nexmart:cart-updated", renderCartPage);
});

let appliedPromoDiscount = 0;

function renderCartPage() {
  const container = document.getElementById("cart-page-container");
  if (!container) return;

  const cart = Store.getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h2 class="empty-title">Your cart is waiting for something great</h2>
        <p class="empty-text">Explore our wide selection of quality products and add your favorites to the cart.</p>
        <a href="products.html" class="btn btn-primary btn-lg">Start Shopping</a>
      </div>
    `;
    return;
  }

  const totals = Store.getCartTotal();
  const finalPayable = Math.max(0, totals.finalTotal - appliedPromoDiscount);

  container.innerHTML = `
    <h1 style="font-size: 1.85rem; font-weight: 800; margin-bottom: 2rem;">Shopping Cart (${totals.itemCount} Items)</h1>
    
    <div class="cart-layout" style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
      <!-- CART ITEMS LIST -->
      <div class="cart-items-list" style="display: flex; flex-direction: column; gap: 1.25rem;">
        ${cart.map(item => {
          const product = PRODUCTS.find(p => p.id === item.id);
          if (!product) return "";
          return `
            <div class="cart-item-card" style="background: var(--color-surface); padding: 1.25rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border); display: flex; gap: 1.25rem; align-items: center;">
              <img src="${product.images[0]}" alt="${product.name}" style="width: 100px; height: 100px; object-fit: contain; background: #F8FAFC; border-radius: var(--radius-md); padding: 0.5rem;">
              
              <div style="flex: 1;">
                <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-muted); text-transform: uppercase;">${product.brand}</span>
                <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem;"><a href="product.html?id=${product.id}">${product.name}</a></h3>
                <div style="font-size: 0.8125rem; color: var(--color-success); font-weight: 600; margin-bottom: 0.85rem;">In Stock • ${product.delivery}</div>
                
                <div style="display: flex; align-items: center; gap: 1.5rem;">
                  <div class="quantity-control">
                    <button class="qty-btn" onclick="updateCartItemQty('${product.id}', ${item.quantity - 1})">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateCartItemQty('${product.id}', ${item.quantity + 1})">+</button>
                  </div>
                  
                  <button style="font-size: 0.8125rem; font-weight: 600; color: var(--color-danger);" onclick="removeCartItem('${product.id}')">Remove</button>
                  <button style="font-size: 0.8125rem; font-weight: 600; color: var(--color-primary);" onclick="moveToWishlist('${product.id}')">Move to Wishlist</button>
                </div>
              </div>

              <div style="text-align: right; min-width: 120px;">
                <div style="font-size: 1.25rem; font-weight: 800; color: var(--color-text-main);">${Utils.formatINR(product.price * item.quantity)}</div>
                ${product.originalPrice > product.price ? `<div style="font-size: 0.875rem; color: var(--color-text-light); text-decoration: line-through;">${Utils.formatINR(product.originalPrice * item.quantity)}</div>` : ""}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- PRICE SUMMARY SIDEBAR -->
      <div class="cart-summary-sidebar" style="background: var(--color-surface); padding: 1.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border); height: fit-content;">
        <h3 style="font-size: 1.125rem; font-weight: 800; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--color-border);">Price Details</h3>
        
        <!-- Coupon Widget -->
        <div style="margin-bottom: 1.5rem;">
          <label style="font-size: 0.8125rem; font-weight: 700; display: block; margin-bottom: 0.4rem;">Apply Promo Code</label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="promo-code-input" placeholder="Try NEXMART10" style="padding: 0.5rem 0.75rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 0.8125rem; flex: 1; text-transform: uppercase;">
            <button class="btn btn-outline btn-sm" onclick="applyPromoCode()">Apply</button>
          </div>
          <div id="promo-msg" style="font-size: 0.75rem; margin-top: 0.35rem; font-weight: 600;"></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9375rem; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border);">
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted);">Price (${totals.itemCount} items)</span>
            <span>${Utils.formatINR(totals.mrpTotal)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; color: var(--color-success);">
            <span>Discount Savings</span>
            <span>-${Utils.formatINR(totals.savings)}</span>
          </div>
          ${appliedPromoDiscount > 0 ? `
            <div style="display: flex; justify-content: space-between; color: var(--color-success);">
              <span>Promo Coupon Discount</span>
              <span>-${Utils.formatINR(appliedPromoDiscount)}</span>
            </div>
          ` : ""}
          <div style="display: flex; justify-content: space-between;">
            <span style="color: var(--color-text-muted);">Delivery Charges</span>
            <span style="color: ${totals.deliveryFee === 0 ? "var(--color-success)" : "inherit"}; font-weight: 600;">
              ${totals.deliveryFee === 0 ? "FREE" : Utils.formatINR(totals.deliveryFee)}
            </span>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; margin-bottom: 1.5rem;">
          <span>Total Amount</span>
          <span style="color: var(--color-primary);">${Utils.formatINR(finalPayable)}</span>
        </div>

        <div style="background: var(--color-success-soft); color: var(--color-success); padding: 0.75rem; border-radius: var(--radius-md); font-size: 0.8125rem; font-weight: 700; text-align: center; margin-bottom: 1.5rem;">
          You will save ${Utils.formatINR(totals.savings + appliedPromoDiscount)} on this order!
        </div>

        <a href="checkout.html" class="btn btn-primary btn-lg" style="width: 100%; text-align: center;">Proceed to Checkout</a>
      </div>
    </div>
  `;
}

function updateCartItemQty(productId, newQty) {
  Store.updateQuantity(productId, newQty);
}

function removeCartItem(productId) {
  Store.removeFromCart(productId);
  Utils.showToast("Item removed from cart", "info");
}

function moveToWishlist(productId) {
  Store.toggleWishlist(productId);
  Store.removeFromCart(productId);
  Utils.showToast("Moved to Wishlist!", "wishlist");
}

function applyPromoCode() {
  const input = document.getElementById("promo-code-input");
  const msg = document.getElementById("promo-msg");
  if (!input || !msg) return;

  const code = input.value.trim().toUpperCase();
  if (code === "NEXMART10") {
    const totals = Store.getCartTotal();
    appliedPromoDiscount = Math.round(totals.finalTotal * 0.1);
    msg.style.color = "var(--color-success)";
    msg.textContent = `Coupon applied! You saved an extra ${Utils.formatINR(appliedPromoDiscount)}.`;
    renderCartPage();
  } else {
    msg.style.color = "var(--color-danger)";
    msg.textContent = "Invalid promo code. Try NEXMART10 for 10% off!";
  }
}
