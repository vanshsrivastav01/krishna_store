/**
 * NexMart Utility Functions & Helpers
 * Contains INR currency formatter, Toast notifications system, Star rating generators, and Skeleton Loaders.
 */

const Utils = {
  // Format numbers to Indian Rupee standard format e.g., ₹1,49,990
  formatINR(amount) {
    if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(amount);
  },

  // Read URL query parameters cleanly
  getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  // Toast Notification System
  showToast(message, type = "info") {
    let toastContainer = document.getElementById("nexmart-toast-container");
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "nexmart-toast-container";
      toastContainer.className = "toast-container";
      document.body.appendChild(toastContainer);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;
    
    let iconSvg = "";
    if (type === "success") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === "wishlist") {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="#EF4444" stroke="#EF4444" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <span class="toast-icon">${iconSvg}</span>
      <span class="toast-message">${message}</span>
      <button class="toast-close" onclick="this.parentElement.remove()" aria-label="Close Toast">&times;</button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => {
        if (toast.parentElement) toast.remove();
      }, 300);
    }, 3500);
  },

  // Star Rating HTML Builder
  renderStarRating(rating = 4.5, reviewCount = null) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.4;
    let starsHtml = "";

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        starsHtml += `<svg class="star-icon full" width="14" height="14" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else if (i === fullStars + 1 && hasHalfStar) {
        starsHtml += `<svg class="star-icon half" width="14" height="14" viewBox="0 0 24 24" fill="url(#halfStarGrad)" stroke="#F59E0B"><defs><linearGradient id="halfStarGrad"><stop offset="50%" stop-color="#F59E0B"/><stop offset="50%" stop-color="#E2E8F0"/></linearGradient></defs><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      } else {
        starsHtml += `<svg class="star-icon empty" width="14" height="14" viewBox="0 0 24 24" fill="#CBD5E1" stroke="#CBD5E1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
      }
    }

    const reviewBadge = reviewCount ? `<span class="review-count">(${reviewCount.toLocaleString('en-IN')})</span>` : "";

    return `<div class="rating-box"><span class="rating-badge">${rating.toFixed(1)} ★</span> <div class="stars">${starsHtml}</div> ${reviewBadge}</div>`;
  },

  // Skeleton Card HTML Builder for loading state simulation
  renderSkeletonCard() {
    return `
      <div class="product-card skeleton-card">
        <div class="skeleton-img shimmer"></div>
        <div class="skeleton-content">
          <div class="skeleton-line shimmer short"></div>
          <div class="skeleton-line shimmer medium"></div>
          <div class="skeleton-line shimmer long"></div>
          <div class="skeleton-line shimmer short"></div>
          <div class="skeleton-btn shimmer"></div>
        </div>
      </div>
    `;
  },

  // Reusable Product Card Renderer
  renderProductCard(product) {
    const isWishlisted = Store.isInWishlist(product.id);
    const wishlistClass = isWishlisted ? "active" : "";
    const heartFill = isWishlisted ? "#EF4444" : "none";
    const heartStroke = isWishlisted ? "#EF4444" : "currentColor";

    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="card-image-wrap">
          <a href="product.html?id=${product.id}" class="card-link" aria-label="${product.name}">
            <img src="${product.images[0]}" alt="${product.name}" loading="lazy" class="product-thumb" onerror="this.src='https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80'">
          </a>
          ${product.discount > 0 ? `<span class="discount-badge">${product.discount}% OFF</span>` : ""}
          <button class="btn-wishlist ${wishlistClass}" aria-label="Add to Wishlist" onclick="appToggleWishlist(event, '${product.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${heartFill}" stroke="${heartStroke}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
        </div>

        <div class="card-body">
          <span class="card-brand">${product.brand}</span>
          <h3 class="card-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          
          <div class="card-rating">
            ${this.renderStarRating(product.rating, product.reviewCount)}
          </div>

          <div class="card-pricing">
            <span class="price-current">${this.formatINR(product.price)}</span>
            ${product.originalPrice > product.price ? `<span class="price-original">${this.formatINR(product.originalPrice)}</span>` : ""}
          </div>

          <div class="card-delivery">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            <span>${product.delivery}</span>
          </div>

          <div class="card-actions">
            <button class="btn btn-secondary btn-sm btn-cart" onclick="appAddToCart(event, '${product.id}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              Add to Cart
            </button>
            <button class="btn btn-primary btn-sm btn-buy" onclick="appBuyNow(event, '${product.id}')">
              Buy Now
            </button>
          </div>
        </div>
      </article>
    `;
  }
};

// Global Wishlist & Cart Helpers accessible from inline onclick handlers
function appToggleWishlist(e, productId) {
  e.preventDefault();
  e.stopPropagation();
  const isAdded = Store.toggleWishlist(productId);
  const btn = e.currentTarget;
  const svg = btn.querySelector("svg");

  if (isAdded) {
    btn.classList.add("active");
    svg.setAttribute("fill", "#EF4444");
    svg.setAttribute("stroke", "#EF4444");
    Utils.showToast("Product added to your Wishlist!", "wishlist");
  } else {
    btn.classList.remove("active");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    Utils.showToast("Removed from Wishlist", "info");
  }
}

function appAddToCart(e, productId) {
  e.preventDefault();
  e.stopPropagation();
  Store.addToCart(productId, 1);
  Utils.showToast("Added to Cart!", "success");
  
  // Quick animation on button
  const btn = e.currentTarget;
  const originalText = btn.innerHTML;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg> Added`;
  btn.style.backgroundColor = "var(--color-success-soft)";
  btn.style.color = "var(--color-success)";

  setTimeout(() => {
    btn.innerHTML = originalText;
    btn.style.backgroundColor = "";
    btn.style.color = "";
  }, 1200);
}

function appBuyNow(e, productId) {
  e.preventDefault();
  e.stopPropagation();
  Store.addToCart(productId, 1);
  window.location.href = "checkout.html";
}
