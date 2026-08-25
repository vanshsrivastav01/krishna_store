/**
 * NexMart Product Detail Page Controller
 * Controls gallery switching, image zoom, pincode checker, quantity selector, specs & user reviews.
 */

document.addEventListener("DOMContentLoaded", () => {
  initProductDetailPage();
});

let currentProduct = null;
let selectedQuantity = 1;

function initProductDetailPage() {
  const productId = Utils.getQueryParam("id") || "prod-1";
  currentProduct = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

  // Save to Recently Viewed
  Store.addRecentlyViewed(currentProduct.id);

  renderProductDetails();
  renderRelatedProducts();
}

function renderProductDetails() {
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  const isWishlisted = Store.isInWishlist(currentProduct.id);
  const wishlistHeartFill = isWishlisted ? "#EF4444" : "none";
  const wishlistHeartStroke = isWishlisted ? "#EF4444" : "currentColor";

  container.innerHTML = `
    <div class="product-detail-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 4rem;">
      <!-- LEFT: IMAGE GALLERY -->
      <div class="product-gallery">
        <div class="main-image-frame" id="main-image-frame">
          <img id="main-product-img" src="${currentProduct.images[0]}" alt="${currentProduct.name}">
          ${currentProduct.discount > 0 ? `<span class="discount-badge" style="font-size: 0.85rem; padding: 0.35rem 0.75rem;">${currentProduct.discount}% OFF</span>` : ""}
        </div>
        <div class="thumbnail-row" style="display: flex; gap: 1rem; margin-top: 1rem;">
          ${currentProduct.images.map((img, idx) => `
            <div class="thumb-box ${idx === 0 ? "active" : ""}" onclick="switchGalleryImage(this, '${img}')" style="width: 76px; height: 76px; border: 2px solid ${idx === 0 ? "var(--color-primary)" : "var(--color-border)"}; border-radius: var(--radius-md); overflow: hidden; cursor: pointer;">
              <img src="${img}" alt="${currentProduct.name}" style="width: 100%; height: 100%; object-fit: contain; background: #F8FAFC;">
            </div>
          `).join('')}
        </div>
      </div>

      <!-- RIGHT: DETAILS & ACTIONS -->
      <div class="product-info-panel">
        <div style="font-size: 0.875rem; font-weight: 700; color: var(--color-primary); text-transform: uppercase; margin-bottom: 0.4rem;">${currentProduct.brand}</div>
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--color-text-main); line-height: 1.25; margin-bottom: 0.85rem;">${currentProduct.name}</h1>
        
        <div style="margin-bottom: 1.25rem;">
          ${Utils.renderStarRating(currentProduct.rating, currentProduct.reviewCount)}
        </div>

        <div class="price-box" style="display: flex; align-items: baseline; gap: 1rem; padding: 1rem 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border); margin-bottom: 1.5rem;">
          <span style="font-size: 2.25rem; font-weight: 800; color: var(--color-text-main);">${Utils.formatINR(currentProduct.price)}</span>
          ${currentProduct.originalPrice > currentProduct.price ? `<span style="font-size: 1.125rem; color: var(--color-text-light); text-decoration: line-through;">${Utils.formatINR(currentProduct.originalPrice)}</span>` : ""}
          <span style="font-size: 0.875rem; font-weight: 700; color: var(--color-success); background: var(--color-success-soft); padding: 0.2rem 0.6rem; border-radius: var(--radius-sm);">Inclusive of all taxes</span>
        </div>

        <!-- Offers Block -->
        <div class="offers-widget" style="background: var(--color-bg); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <h4 style="font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            Available Offers
          </h4>
          <ul style="font-size: 0.8125rem; color: var(--color-text-muted); display: flex; flex-direction: column; gap: 0.4rem;">
            <li><strong>Bank Offer:</strong> 10% Instant Discount on HDFC & ICICI Credit Cards</li>
            <li><strong>No Cost EMI:</strong> Avail EMI starting from ₹1,240/month</li>
            <li><strong>Special Price:</strong> Get extra 5% off using coupon code <code>NEXMART10</code></li>
          </ul>
        </div>

        <!-- Delivery Pincode Checker -->
        <div class="pincode-checker" style="margin-bottom: 1.75rem;">
          <label style="font-size: 0.875rem; font-weight: 700; display: block; margin-bottom: 0.5rem;">Check Delivery & Services</label>
          <div style="display: flex; gap: 0.5rem; max-width: 380px;">
            <input type="text" id="pincode-input" placeholder="Enter 6-digit Pincode" maxlength="6" style="padding: 0.6rem 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: 0.875rem; flex: 1;">
            <button class="btn btn-outline btn-sm" onclick="checkDeliveryPincode()">Check</button>
          </div>
          <div id="pincode-result-msg" style="font-size: 0.8125rem; margin-top: 0.4rem; font-weight: 600;"></div>
        </div>

        <!-- Quantity & Purchase CTAs -->
        <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem;">
          <div class="quantity-control">
            <button class="qty-btn" onclick="updateDetailQty(-1)">-</button>
            <span class="qty-val" id="detail-qty-val">1</span>
            <button class="qty-btn" onclick="updateDetailQty(1)">+</button>
          </div>
          <span style="font-size: 0.8125rem; color: var(--color-success); font-weight: 700;">✔ ${currentProduct.availability}</span>
        </div>

        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-secondary btn-lg" style="flex: 1;" onclick="addCurrentToCart()">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            Add to Cart
          </button>
          <button class="btn btn-primary btn-lg" style="flex: 1;" onclick="buyCurrentNow()">
            Buy Now
          </button>
          <button class="btn btn-outline" style="padding: 0 1rem;" onclick="appToggleWishlist(event, '${currentProduct.id}')" aria-label="Wishlist">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="${wishlistHeartFill}" stroke="${wishlistHeartStroke}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>
      </div>
    </div>

    <!-- PRODUCT HIGHLIGHTS & SPECS TAB -->
    <div style="background: var(--color-surface); padding: 2.5rem; border-radius: var(--radius-lg); border: 1px solid var(--color-border); margin-bottom: 4rem;">
      <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem;">Product Highlights</h3>
      <ul style="margin-bottom: 2.5rem; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem; color: var(--color-text-muted);">
        ${currentProduct.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>

      <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 1rem;">Specifications</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 0.875rem;">
        <tbody>
          ${Object.entries(currentProduct.specifications).map(([key, val]) => `
            <tr style="border-bottom: 1px solid var(--color-border);">
              <td style="padding: 0.75rem 1rem 0.75rem 0; font-weight: 700; color: var(--color-text-muted); width: 220px;">${key}</td>
              <td style="padding: 0.75rem 0; color: var(--color-text-main);">${val}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;

  setupImageZoom();
}

function switchGalleryImage(thumbEl, newSrc) {
  const mainImg = document.getElementById("main-product-img");
  if (mainImg) mainImg.src = newSrc;
  document.querySelectorAll(".thumb-box").forEach(el => {
    el.style.borderColor = "var(--color-border)";
  });
  thumbEl.style.borderColor = "var(--color-primary)";
}

function setupImageZoom() {
  const frame = document.getElementById("main-image-frame");
  const img = document.getElementById("main-product-img");
  if (!frame || !img) return;

  frame.addEventListener("mousemove", (e) => {
    const rect = frame.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.7)";
  });

  frame.addEventListener("mouseleave", () => {
    img.style.transformOrigin = "center center";
    img.style.transform = "scale(1)";
  });
}

function updateDetailQty(delta) {
  selectedQuantity = Math.max(1, selectedQuantity + delta);
  const qtyEl = document.getElementById("detail-qty-val");
  if (qtyEl) qtyEl.textContent = selectedQuantity;
}

function addCurrentToCart() {
  if (currentProduct) {
    Store.addToCart(currentProduct.id, selectedQuantity);
    Utils.showToast(`Added ${selectedQuantity} item(s) to Cart!`, "success");
  }
}

function buyCurrentNow() {
  if (currentProduct) {
    Store.addToCart(currentProduct.id, selectedQuantity);
    window.location.href = "checkout.html";
  }
}

function checkDeliveryPincode() {
  const input = document.getElementById("pincode-input");
  const msg = document.getElementById("pincode-result-msg");
  if (!input || !msg) return;

  const code = input.value.trim();
  if (/^\d{6}$/.test(code)) {
    msg.style.color = "var(--color-success)";
    msg.innerHTML = `✔ Express Delivery available to Pincode <strong>${code}</strong> by Tomorrow. Cash on Delivery Available.`;
  } else {
    msg.style.color = "var(--color-danger)";
    msg.textContent = "Please enter a valid 6-digit Indian pincode.";
  }
}

function renderRelatedProducts() {
  const grid = document.getElementById("related-products-grid");
  if (!grid || !currentProduct) return;

  const related = PRODUCTS.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 4);
  grid.innerHTML = related.map(p => Utils.renderProductCard(p)).join('');
}
