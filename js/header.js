/**
 * NexMart Header & Live Search Controller
 * Controls sticky navigation, live autocomplete search popup, badge counters, and mobile bottom nav.
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderCounters();
  initSearchAutocomplete();
  initStickyHeader();
  highlightActiveMobileNav();

  // Subscribe to state updates
  window.addEventListener("nexmart:cart-updated", updateCartBadges);
  window.addEventListener("nexmart:wishlist-updated", updateWishlistBadges);
});

function initHeaderCounters() {
  updateCartBadges();
  updateWishlistBadges();
}

function updateCartBadges() {
  const count = Store.getCartCount();
  const badges = document.querySelectorAll(".cart-count-badge");
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? "flex" : "none";
  });
}

function updateWishlistBadges() {
  const count = Store.getWishlistCount();
  const badges = document.querySelectorAll(".wishlist-count-badge");
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? "flex" : "none";
  });
}

function initStickyHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function initSearchAutocomplete() {
  const searchInput = document.getElementById("header-search-input");
  const suggestionsPopup = document.getElementById("search-suggestions");
  if (!searchInput || !suggestionsPopup) return;

  let debounceTimer;

  searchInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim().toLowerCase();

    if (query.length < 2) {
      suggestionsPopup.classList.remove("active");
      suggestionsPopup.innerHTML = "";
      return;
    }

    debounceTimer = setTimeout(() => {
      const matches = PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      ).slice(0, 5);

      if (matches.length > 0) {
        suggestionsPopup.innerHTML = matches.map(p => `
          <div class="suggestion-item" onclick="location.href='product.html?id=${p.id}'">
            <img src="${p.images[0]}" alt="${p.name}">
            <div class="suggestion-info">
              <div class="suggestion-title">${p.name}</div>
              <div class="suggestion-meta">${p.brand} • ${Utils.formatINR(p.price)}</div>
            </div>
          </div>
        `).join('') + `
          <div class="suggestion-item" style="justify-content: center; font-weight: 700; color: var(--color-primary);" onclick="location.href='products.html?search=${encodeURIComponent(query)}'">
            See all results for "${query}" →
          </div>
        `;
        suggestionsPopup.classList.add("active");
      } else {
        suggestionsPopup.innerHTML = `
          <div class="suggestion-item" style="color: var(--color-text-muted); justify-content: center;">
            No products found for "${query}"
          </div>
        `;
        suggestionsPopup.classList.add("active");
      }
    }, 200);
  });

  // Handle Search submit via Enter key
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });

  // Hide popup when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".header-search")) {
      suggestionsPopup.classList.remove("active");
    }
  });
}

function highlightActiveMobileNav() {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".mobile-nav-item");

  navItems.forEach(item => {
    const href = item.getAttribute("href");
    if (href === currentPath || (currentPath === "" && href === "index.html")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}
