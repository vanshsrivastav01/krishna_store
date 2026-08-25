/**
 * NexMart Wishlist Page Controller
 * Manages rendering wishlisted items, moving items to cart, and removal.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderWishlistPage();
  window.addEventListener("nexmart:wishlist-updated", renderWishlistPage);
});

function renderWishlistPage() {
  const container = document.getElementById("wishlist-page-container");
  if (!container) return;

  const wishlistIds = Store.getWishlist();
  const wishlistedProducts = wishlistIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);

  if (wishlistedProducts.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </div>
        <h2 class="empty-title">Your wishlist is currently empty</h2>
        <p class="empty-text">Save items you love by tapping the heart icon on any product card.</p>
        <a href="products.html" class="btn btn-primary btn-lg">Explore Products</a>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
      <h1 style="font-size: 1.85rem; font-weight: 800;">My Wishlist (${wishlistedProducts.length} Items)</h1>
      <button class="btn btn-outline btn-sm" onclick="clearWholeWishlist()">Clear Wishlist</button>
    </div>

    <div class="products-grid">
      ${wishlistedProducts.map(p => `
        <div class="product-card">
          <div class="card-image-wrap">
            <a href="product.html?id=${p.id}">
              <img src="${p.images[0]}" alt="${p.name}" class="product-thumb">
            </a>
            <button class="btn-wishlist active" onclick="removeFromWishlistPage('${p.id}')">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            </button>
          </div>
          <div class="card-body">
            <span class="card-brand">${p.brand}</span>
            <h3 class="card-title"><a href="product.html?id=${p.id}">${p.name}</a></h3>
            <div class="card-pricing">
              <span class="price-current">${Utils.formatINR(p.price)}</span>
              ${p.originalPrice > p.price ? `<span class="price-original">${Utils.formatINR(p.originalPrice)}</span>` : ""}
            </div>
            <div class="card-actions" style="grid-template-columns: 1fr; margin-top: 1rem;">
              <button class="btn btn-primary btn-sm" onclick="moveWishlistItemToCart('${p.id}')">
                Move to Cart
              </button>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function removeFromWishlistPage(productId) {
  Store.toggleWishlist(productId);
  Utils.showToast("Removed from wishlist", "info");
}

function moveWishlistItemToCart(productId) {
  Store.addToCart(productId, 1);
  Store.toggleWishlist(productId);
  Utils.showToast("Moved to Cart!", "success");
}

function clearWholeWishlist() {
  Store.saveWishlist([]);
  Utils.showToast("Wishlist cleared", "info");
}
