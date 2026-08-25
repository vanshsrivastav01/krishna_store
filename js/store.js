/**
 * NexMart State Store
 * Manages Cart, Wishlist, User Auth Session, Orders, and Recently Viewed using localStorage.
 */

const STORAGE_KEYS = {
  CART: "nexmart_cart_v1",
  WISHLIST: "nexmart_wishlist_v1",
  USER: "nexmart_user_v1",
  ORDERS: "nexmart_orders_v1",
  RECENTLY_VIEWED: "nexmart_recently_viewed_v1"
};

const Store = {
  // --- CART MANAGEMENT ---
  getCart() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.CART)) || [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent("nexmart:cart-updated", { detail: cart }));
  },

  addToCart(productId, quantity = 1) {
    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({ id: productId, quantity: Math.max(1, quantity), addedAt: new Date().toISOString() });
    }
    this.saveCart(cart);
    return true;
  },

  removeFromCart(productId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
  },

  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotal() {
    const cart = this.getCart();
    let mrpTotal = 0;
    let finalTotal = 0;
    let totalDiscount = 0;

    cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (product) {
        mrpTotal += product.originalPrice * item.quantity;
        finalTotal += product.price * item.quantity;
      }
    });

    totalDiscount = mrpTotal - finalTotal;
    const deliveryFee = finalTotal > 999 || cart.length === 0 ? 0 : 99;

    return {
      mrpTotal,
      finalTotal: finalTotal + deliveryFee,
      savings: totalDiscount,
      deliveryFee,
      itemCount: this.getCartCount()
    };
  },

  // --- WISHLIST MANAGEMENT ---
  getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST)) || [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(wishlist) {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent("nexmart:wishlist-updated", { detail: wishlist }));
  },

  isInWishlist(productId) {
    const wishlist = this.getWishlist();
    return wishlist.includes(productId);
  },

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    let isAdded = false;
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(id => id !== productId);
      isAdded = false;
    } else {
      wishlist.push(productId);
      isAdded = true;
    }
    this.saveWishlist(wishlist);
    return isAdded;
  },

  getWishlistCount() {
    return this.getWishlist().length;
  },

  // --- RECENTLY VIEWED ---
  getRecentlyViewed() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.RECENTLY_VIEWED)) || [];
    } catch (e) {
      return [];
    }
  },

  addRecentlyViewed(productId) {
    let list = this.getRecentlyViewed();
    list = list.filter(id => id !== productId);
    list.unshift(productId);
    if (list.length > 10) list = list.slice(0, 10);
    localStorage.setItem(STORAGE_KEYS.RECENTLY_VIEWED, JSON.stringify(list));
  },

  // --- USER AUTH & SESSION ---
  getUser() {
    try {
      const defaultUser = {
        isLoggedIn: true,
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        phone: "+91 98765 43210",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        pincode: "110001",
        addresses: [
          {
            id: "addr-1",
            name: "Rahul Sharma",
            phone: "+91 98765 43210",
            street: "Flat 402, Royal Palms Apartments, Outer Ring Road",
            city: "Bengaluru",
            state: "Karnataka",
            pincode: "560103",
            type: "Home",
            isDefault: true
          }
        ]
      };
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(defaultUser));
        return defaultUser;
      }
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  },

  saveUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent("nexmart:user-updated", { detail: user }));
  },

  logout() {
    const user = this.getUser();
    if (user) {
      user.isLoggedIn = false;
      this.saveUser(user);
    }
  },

  login(email, name = "Valued Customer") {
    const user = this.getUser() || {};
    user.isLoggedIn = true;
    user.email = email;
    if (name) user.name = name;
    this.saveUser(user);
  },

  // --- ORDERS MANAGEMENT ---
  getOrders() {
    try {
      const defaultOrders = [
        {
          id: "NEX-984210",
          date: "2026-08-20T14:30:00Z",
          total: 32489,
          paymentMethod: "UPI (Google Pay)",
          status: "Delivered",
          step: 5, // 1: Ordered, 2: Packed, 3: Shipped, 4: Out for Delivery, 5: Delivered
          items: [
            { id: "prod-1", quantity: 1, price: 29990, name: "Sony WH-1000XM5 Wireless Headphones" },
            { id: "prod-8", quantity: 1, price: 2499, name: "Levi's Men's 511 Slim Fit Stretch Denim Jeans" }
          ],
          address: {
            name: "Rahul Sharma",
            street: "Flat 402, Royal Palms Apartments, Outer Ring Road",
            city: "Bengaluru",
            pincode: "560103"
          }
        },
        {
          id: "NEX-985341",
          date: "2026-08-25T09:15:00Z",
          total: 7999,
          paymentMethod: "Credit Card (HDFC Bank)",
          status: "Out for Delivery",
          step: 4,
          items: [
            { id: "prod-13", quantity: 1, price: 7999, name: "Philips Digital Air Fryer HD9252/90 4.1L 1400W" }
          ],
          address: {
            name: "Rahul Sharma",
            street: "Flat 402, Royal Palms Apartments, Outer Ring Road",
            city: "Bengaluru",
            pincode: "560103"
          }
        }
      ];
      const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(defaultOrders));
        return defaultOrders;
      }
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  },

  addOrder(orderData) {
    const orders = this.getOrders();
    orders.unshift(orderData);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.clearCart();
    return orderData;
  }
};
