/**
 * NexMart Account Dashboard Controller
 * Controls account tabs, profile edit modal, order history visual progress tracker, and address management.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAccountDashboard();
});

function initAccountDashboard() {
  const user = Store.getUser();
  if (!user || !user.isLoggedIn) {
    window.location.href = "login.html";
    return;
  }

  renderUserProfile(user);
  renderUserOrders();
  setupAccountTabSwitching();
}

function renderUserProfile(user) {
  const nameEl = document.getElementById("account-user-name");
  const emailEl = document.getElementById("account-user-email");
  const phoneEl = document.getElementById("account-user-phone");
  const avatarEl = document.getElementById("account-user-avatar");

  if (nameEl) nameEl.textContent = user.name || "Rahul Sharma";
  if (emailEl) emailEl.textContent = user.email || "rahul.sharma@example.com";
  if (phoneEl) phoneEl.textContent = user.phone || "+91 98765 43210";
  if (avatarEl && user.avatar) avatarEl.src = user.avatar;
}

function renderUserOrders() {
  const container = document.getElementById("orders-list-container");
  if (!container) return;

  const orders = Store.getOrders();

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
        </div>
        <h3 class="empty-title">No orders placed yet</h3>
        <p class="empty-text">Your order history will appear here after you place your first order.</p>
        <a href="products.html" class="btn btn-primary">Shop Now</a>
      </div>
    `;
    return;
  }

  const stepsList = [
    { label: "Ordered", stepNum: 1 },
    { label: "Packed", stepNum: 2 },
    { label: "Shipped", stepNum: 3 },
    { label: "Out for Delivery", stepNum: 4 },
    { label: "Delivered", stepNum: 5 }
  ];

  container.innerHTML = orders.map(order => {
    const progressPercent = Math.min(100, Math.max(0, ((order.step - 1) / 4) * 100));

    return `
      <div class="order-card" style="background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem; margin-bottom: 1.25rem;">
          <div>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">Order ID: <strong>${order.id}</strong></span>
            <span style="margin: 0 0.5rem; color: var(--color-border-dark);">•</span>
            <span style="font-size: 0.8125rem; color: var(--color-text-muted);">${new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
          <div style="font-size: 1.125rem; font-weight: 800; color: var(--color-text-main);">${Utils.formatINR(order.total)}</div>
        </div>

        <!-- Order Visual Tracker Progress Bar -->
        <div class="order-tracker">
          <div class="tracker-progress-bar" style="width: ${progressPercent}%;"></div>
          ${stepsList.map(s => `
            <div class="tracker-step ${order.step >= s.stepNum ? "completed" : order.step === s.stepNum ? "active" : ""}">
              <div class="step-node">${order.step >= s.stepNum ? "✓" : s.stepNum}</div>
              <span class="step-label">${s.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Order Items list -->
        <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-top: 1.5rem; background: var(--color-bg); padding: 1rem; border-radius: var(--radius-md);">
          ${order.items.map(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            return `
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 0.85rem;">
                  <img src="${product ? product.images[0] : ''}" alt="${item.name}" style="width: 48px; height: 48px; object-fit: contain; background: #FFF; border-radius: var(--radius-sm);">
                  <div>
                    <div style="font-size: 0.875rem; font-weight: 700; color: var(--color-text-main);">${item.name}</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-muted);">Qty: ${item.quantity} • ${Utils.formatINR(item.price)}</div>
                  </div>
                </div>
                ${product ? `<a href="product.html?id=${product.id}" class="btn btn-outline btn-sm">Buy Again</a>` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function setupAccountTabSwitching() {
  const tabs = document.querySelectorAll(".account-nav-item");
  const tabContents = document.querySelectorAll(".account-tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(c => c.style.display = "none");

      tab.classList.add("active");
      const targetContent = document.getElementById(`tab-${targetId}`);
      if (targetContent) targetContent.style.display = "block";
    });
  });
}

function openEditProfileModal() {
  const user = Store.getUser();
  const modal = document.getElementById("edit-profile-modal");
  if (!modal || !user) return;

  document.getElementById("edit-name-input").value = user.name || "";
  document.getElementById("edit-email-input").value = user.email || "";
  document.getElementById("edit-phone-input").value = user.phone || "";

  modal.style.display = "flex";
}

function saveEditedProfile(e) {
  e.preventDefault();
  const user = Store.getUser();
  if (!user) return;

  user.name = document.getElementById("edit-name-input").value.trim();
  user.email = document.getElementById("edit-email-input").value.trim();
  user.phone = document.getElementById("edit-phone-input").value.trim();

  Store.saveUser(user);
  renderUserProfile(user);
  closeModal('edit-profile-modal');
  Utils.showToast("Profile updated successfully!", "success");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
}

function handleUserLogout() {
  Store.logout();
  Utils.showToast("Logged out successfully", "info");
  setTimeout(() => {
    window.location.href = "login.html";
  }, 500);
}
