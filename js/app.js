/**
 * NexMart Homepage Controller
 * Manages category filters, Skeleton loaders simulation, Trending, Today's Deals, and Recently Viewed.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderCategoryPills();
  initDealCountdown();
  loadHomeProducts();
});

// Render Category horizontal pills on homepage
function renderCategoryPills() {
  const container = document.getElementById("homepage-category-scroll");
  if (!container) return;

  const iconsMap = {
    "grid": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
    "headphones": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
    "smartphone": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
    "shopping-bag": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>`,
    "home": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
    "tv": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>`,
    "sparkles": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`,
    "activity": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`,
    "shopping-cart": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
    "book-open": `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`
  };

  container.innerHTML = CATEGORIES.map(cat => `
    <div class="category-card" onclick="location.href='products.html?category=${encodeURIComponent(cat.name)}'">
      <div class="category-icon-box">
        ${iconsMap[cat.icon] || iconsMap["grid"]}
      </div>
      <span class="category-name">${cat.name}</span>
    </div>
  `).join('');
}

// Load Home page product sections with realistic Skeleton loading delay
function loadHomeProducts() {
  const trendingGrid = document.getElementById("trending-products-grid");
  const dealsGrid = document.getElementById("deals-products-grid");
  const recentlyViewedSection = document.getElementById("recently-viewed-section");
  const recentlyViewedGrid = document.getElementById("recently-viewed-grid");

  // Step 1: Render Skeleton Skeletons
  if (trendingGrid) {
    trendingGrid.innerHTML = Array(4).fill(Utils.renderSkeletonCard()).join('');
  }
  if (dealsGrid) {
    dealsGrid.innerHTML = Array(4).fill(Utils.renderSkeletonCard()).join('');
  }

  // Step 2: Realistic simulated network delay (400ms)
  setTimeout(() => {
    // Trending Now
    if (trendingGrid) {
      const trending = PRODUCTS.filter(p => p.rating >= 4.7).slice(0, 4);
      trendingGrid.innerHTML = trending.map(p => Utils.renderProductCard(p)).join('');
    }

    // Today's Deals (Biggest discount)
    if (dealsGrid) {
      const deals = [...PRODUCTS].sort((a, b) => b.discount - a.discount).slice(0, 4);
      dealsGrid.innerHTML = deals.map(p => Utils.renderProductCard(p)).join('');
    }

    // Recently Viewed Products
    if (recentlyViewedGrid && recentlyViewedSection) {
      const recentIds = Store.getRecentlyViewed();
      if (recentIds.length > 0) {
        const recentProds = recentIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean).slice(0, 4);
        if (recentProds.length > 0) {
          recentlyViewedGrid.innerHTML = recentProds.map(p => Utils.renderProductCard(p)).join('');
          recentlyViewedSection.style.display = "block";
        }
      }
    }
  }, 400);
}

// Today's Deals Live Countdown Timer
function initDealCountdown() {
  const timerElement = document.getElementById("deal-timer");
  if (!timerElement) return;

  // Set deal target to end of current day
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  function updateTimer() {
    const now = new Date();
    const diff = endOfDay - now;
    if (diff <= 0) return;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElement.textContent = `${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
