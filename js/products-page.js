/**
 * NexMart Product Listing & Search Page Controller
 * Manages dynamic client-side filtering, multi-field sorting, search queries, active filter chips, and mobile bottom sheet.
 */

document.addEventListener("DOMContentLoaded", () => {
  initProductsPage();
});

let currentFilteredProducts = [...PRODUCTS];
let activeFilters = {
  category: Utils.getQueryParam("category") || "All",
  search: Utils.getQueryParam("search") || "",
  brands: [],
  maxPrice: 160000,
  minRating: 0,
  sortBy: "popularity"
};

function initProductsPage() {
  setupFilterEventListeners();
  populateBrandCheckboxes();
  applyFiltersAndRender();
}

function populateBrandCheckboxes() {
  const brandContainer = document.getElementById("brand-filter-list");
  if (!brandContainer) return;

  const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();
  brandContainer.innerHTML = brands.map(brand => `
    <label class="filter-checkbox-label">
      <input type="checkbox" value="${brand}" onchange="toggleBrandFilter('${brand}')">
      <span>${brand}</span>
    </label>
  `).join('');
}

function setupFilterEventListeners() {
  // Category radio / links
  const categoryContainer = document.getElementById("category-filter-list");
  if (categoryContainer) {
    categoryContainer.innerHTML = CATEGORIES.map(c => `
      <label class="filter-radio-label">
        <input type="radio" name="category-filter" value="${c.name}" ${activeFilters.category === c.name || (activeFilters.category === "All" && c.name === "All Categories") ? "checked" : ""} onchange="setCategoryFilter('${c.name}')">
        <span>${c.name}</span>
      </label>
    `).join('');
  }

  // Price Slider
  const priceSlider = document.getElementById("price-range-slider");
  const priceDisplay = document.getElementById("price-range-val");
  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener("input", (e) => {
      activeFilters.maxPrice = Number(e.target.value);
      priceDisplay.textContent = Utils.formatINR(activeFilters.maxPrice);
      applyFiltersAndRender();
    });
  }

  // Sort Selector
  const sortSelect = document.getElementById("sort-by-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      activeFilters.sortBy = e.target.value;
      applyFiltersAndRender();
    });
  }
}

function toggleBrandFilter(brand) {
  if (activeFilters.brands.includes(brand)) {
    activeFilters.brands = activeFilters.brands.filter(b => b !== brand);
  } else {
    activeFilters.brands.push(brand);
  }
  applyFiltersAndRender();
}

function setCategoryFilter(catName) {
  activeFilters.category = catName === "All Categories" ? "All" : catName;
  applyFiltersAndRender();
}

function setRatingFilter(minRating) {
  activeFilters.minRating = minRating;
  applyFiltersAndRender();
}

function applyFiltersAndRender() {
  const grid = document.getElementById("products-listing-grid");
  const resultCount = document.getElementById("results-count-text");
  const activeChipsContainer = document.getElementById("active-filter-chips");
  if (!grid) return;

  // Show Skeleton shimmer during filter update
  grid.innerHTML = Array(6).fill(Utils.renderSkeletonCard()).join('');

  setTimeout(() => {
    let result = PRODUCTS.filter(p => {
      // Category Filter
      if (activeFilters.category !== "All" && p.category.toLowerCase() !== activeFilters.category.toLowerCase()) {
        return false;
      }
      // Search Filter
      if (activeFilters.search) {
        const q = activeFilters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesCat) return false;
      }
      // Brand Filter
      if (activeFilters.brands.length > 0 && !activeFilters.brands.includes(p.brand)) {
        return false;
      }
      // Price Filter
      if (p.price > activeFilters.maxPrice) {
        return false;
      }
      // Rating Filter
      if (p.rating < activeFilters.minRating) {
        return false;
      }
      return true;
    });

    // Sorting
    if (activeFilters.sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (activeFilters.sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (activeFilters.sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (activeFilters.sortBy === "discount") {
      result.sort((a, b) => b.discount - a.discount);
    }

    currentFilteredProducts = result;

    // Update Result Counter
    if (resultCount) {
      resultCount.textContent = `Showing ${result.length} products ${activeFilters.search ? `for "${activeFilters.search}"` : ""}`;
    }

    // Render Active Filter Chips
    renderFilterChips(activeChipsContainer);

    // Render Product Cards or Empty State
    if (result.length > 0) {
      grid.innerHTML = result.map(p => Utils.renderProductCard(p)).join('');
    } else {
      grid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <div class="empty-icon">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
          </div>
          <h3 class="empty-title">No products found</h3>
          <p class="empty-text">We couldn't find any products matching your active filters or search term.</p>
          <button class="btn btn-primary" onclick="resetAllFilters()">Reset All Filters</button>
        </div>
      `;
    }
  }, 250);
}

function renderFilterChips(container) {
  if (!container) return;

  const chips = [];

  if (activeFilters.category !== "All") {
    chips.push({ label: `Category: ${activeFilters.category}`, reset: () => activeFilters.category = "All" });
  }
  if (activeFilters.search) {
    chips.push({ label: `Search: ${activeFilters.search}`, reset: () => activeFilters.search = "" });
  }
  activeFilters.brands.forEach(b => {
    chips.push({ label: `Brand: ${b}`, reset: () => toggleBrandFilter(b) });
  });
  if (activeFilters.minRating > 0) {
    chips.push({ label: `Rating: ${activeFilters.minRating}★ & above`, reset: () => activeFilters.minRating = 0 });
  }

  if (chips.length > 0) {
    container.innerHTML = chips.map((c, i) => `
      <span class="filter-chip">
        ${c.label}
        <button onclick="removeChip(${i})">&times;</button>
      </span>
    `).join('') + `
      <button class="btn-clear-all" onclick="resetAllFilters()">Clear All</button>
    `;
    window._activeChipResets = chips;
  } else {
    container.innerHTML = "";
  }
}

function removeChip(index) {
  if (window._activeChipResets && window._activeChipResets[index]) {
    window._activeChipResets[index].reset();
    applyFiltersAndRender();
  }
}

function resetAllFilters() {
  activeFilters = {
    category: "All",
    search: "",
    brands: [],
    maxPrice: 160000,
    minRating: 0,
    sortBy: "popularity"
  };
  const priceSlider = document.getElementById("price-range-slider");
  if (priceSlider) priceSlider.value = 160000;
  applyFiltersAndRender();
}

function toggleMobileFilterDrawer() {
  const sidebar = document.querySelector(".filter-sidebar");
  if (sidebar) {
    sidebar.classList.toggle("active-mobile-drawer");
  }
}
