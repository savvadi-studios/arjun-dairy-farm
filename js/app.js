// ==========================================================================
// ARJUN DAIRY FARM - JAVASCRIPT APPLICATION LOGIC
// Sandya Mana Telugu Ammayi (@SandyaLingam)
// Crafted by Savvadi Studios (savvadi.studios@gmail.com)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- State ---
  let currentCategory = "all";
  let cart = JSON.parse(localStorage.getItem("arjun_dairy_cart")) || [];

  // Selected variant per product ID (default to first variant)
  const selectedVariants = {};
  if (typeof PRODUCTS !== "undefined") {
    PRODUCTS.forEach(p => {
      selectedVariants[p.id] = 0; // index of default variant
    });
  }

  // --- Elements ---
  const productsGrid = document.getElementById("productsGrid");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const openCartBtns = document.querySelectorAll(".open-cart-btn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartEmptyState = document.getElementById("cartEmptyState");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartCountBadges = document.querySelectorAll(".cart-count");
  const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");
  
  // Mobile Menu Elements
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Store Hours Pill
  const liveStatusPill = document.getElementById("liveStatusPill");
  const liveStatusText = document.getElementById("liveStatusText");

  // Toast
  const toastMsg = document.getElementById("toastMsg");

  // --- Functions ---

  // 1. Check Store Operating Hours (IST: 6:00-8:30 AM & 6:00-8:30 PM)
  function checkStoreStatus() {
    if (!liveStatusPill || !liveStatusText) return;

    // Get current Indian Standard Time (UTC+5:30)
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    const hours = istTime.getHours();
    const minutes = istTime.getMinutes();
    const totalMinutes = hours * 60 + minutes;

    // Slots: 06:00 (360) to 08:30 (510) and 18:00 (1080) to 20:30 (1230)
    const morningStart = 6 * 60; // 360
    const morningEnd = 8 * 60 + 30; // 510
    const eveningStart = 18 * 60; // 1080
    const eveningEnd = 20 * 60 + 30; // 1230

    const isMorningOpen = totalMinutes >= morningStart && totalMinutes <= morningEnd;
    const isEveningOpen = totalMinutes >= eveningStart && totalMinutes <= eveningEnd;

    if (isMorningOpen || isEveningOpen) {
      liveStatusPill.className = "live-status-pill open";
      liveStatusText.textContent = "🟢 Store Open Now in Mancherial (Fresh Batch Ready)";
    } else {
      liveStatusPill.className = "live-status-pill closed";
      let nextTime = totalMinutes < morningStart ? "6:00 AM (Morning Batch)" : (totalMinutes < eveningStart ? "6:00 PM (Evening Batch)" : "6:00 AM Tomorrow");
      liveStatusText.textContent = `🟡 Store opens at ${nextTime} (WhatsApp orders 24/7)`;
    }
  }

  // 2. Render Products
  function renderProducts() {
    if (!productsGrid || typeof PRODUCTS === "undefined") return;

    const filtered = currentCategory === "all" 
      ? PRODUCTS 
      : PRODUCTS.filter(p => p.category === currentCategory);

    productsGrid.innerHTML = filtered.map(product => {
      const activeVariantIdx = selectedVariants[product.id] || 0;
      const activeVariant = product.variants[activeVariantIdx] || product.variants[0];

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <span class="product-tag">${product.tag}</span>
            ${product.isBestseller ? '<span class="bestseller-badge">★ Bestseller</span>' : ''}
          </div>
          <div class="product-body">
            <div class="product-telugu">${product.teluguName}</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.description}</p>
            
            <div class="variant-selector-wrap">
              <span class="variant-label">Choose Pack Size:</span>
              <div class="variant-pills">
                ${product.variants.map((v, idx) => `
                  <button type="button" 
                    class="variant-pill ${idx === activeVariantIdx ? 'active' : ''}" 
                    data-id="${product.id}" 
                    data-index="${idx}">
                    ${v.size}
                  </button>
                `).join('')}
              </div>
            </div>

            <div class="product-footer">
              <div class="product-price-box">
                <span class="price-currency">Price</span>
                <span class="price-amount">₹${activeVariant.price}</span>
              </div>
              <div class="product-card-actions">
                <button class="btn btn-primary btn-add-cart" data-id="${product.id}" title="Add to Cart">
                  🛒 Add to Cart
                </button>
                <button class="btn btn-whatsapp" data-quick-wa="${product.id}" style="padding: 8px 12px; font-size: 0.82rem;" title="Order via WhatsApp">
                  💬 Order
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");

    attachProductCardEvents();
  }

  // 3. Attach Events to Product Cards
  function attachProductCardEvents() {
    // Variant Pills
    document.querySelectorAll(".variant-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const idx = parseInt(e.target.dataset.index, 10);
        selectedVariants[id] = idx;
        renderProducts();
      });
    });

    // Add to Cart
    document.querySelectorAll(".btn-add-cart").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
      });
    });

    // Quick WhatsApp Single Item
    document.querySelectorAll("[data-quick-wa]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.quickWa;
        quickOrderWhatsApp(id);
      });
    });
  }

  // 4. Add to Cart Logic
  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const variantIdx = selectedVariants[productId] || 0;
    const variant = product.variants[variantIdx];
    const cartItemId = `${productId}-${variant.size}`;

    const existingIndex = cart.findIndex(item => item.cartItemId === cartItemId);
    if (existingIndex > -1) {
      cart[existingIndex].qty += 1;
    } else {
      cart.push({
        cartItemId,
        id: product.id,
        name: product.name,
        teluguName: product.teluguName,
        size: variant.size,
        price: variant.price,
        image: product.image,
        qty: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${product.name} (${variant.size}) to cart!`);
  }

  // 5. Save & Update Cart UI
  function saveCart() {
    localStorage.setItem("arjun_dairy_cart", JSON.stringify(cart));
  }

  function updateCartUI() {
    // Total items count
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(b => b.textContent = totalQty);

    // Subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `₹${subtotal}`;
    }

    // Render items
    if (!cartItemsContainer || !cartEmptyState) return;

    if (cart.length === 0) {
      cartEmptyState.style.display = "block";
      cartItemsContainer.innerHTML = "";
    } else {
      cartEmptyState.style.display = "none";
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-cart-id="${item.cartItemId}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-variant">${item.size} • ₹${item.price} each</div>
            <div class="cart-item-ctrls">
              <div class="qty-pill">
                <button type="button" class="qty-btn btn-minus" data-cart-id="${item.cartItemId}">−</button>
                <span class="qty-val">${item.qty}</span>
                <button type="button" class="qty-btn btn-plus" data-cart-id="${item.cartItemId}">+</button>
              </div>
              <span class="cart-item-price">₹${item.price * item.qty}</span>
              <button type="button" class="btn-remove-item" data-cart-id="${item.cartItemId}" title="Remove Item">✕</button>
            </div>
          </div>
        </div>
      `).join("");

      attachCartItemEvents();
    }
  }

  function attachCartItemEvents() {
    document.querySelectorAll(".btn-minus").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.cartId;
        const item = cart.find(i => i.cartItemId === id);
        if (item) {
          if (item.qty > 1) {
            item.qty -= 1;
          } else {
            cart = cart.filter(i => i.cartItemId !== id);
          }
          saveCart();
          updateCartUI();
        }
      });
    });

    document.querySelectorAll(".btn-plus").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.cartId;
        const item = cart.find(i => i.cartItemId === id);
        if (item) {
          item.qty += 1;
          saveCart();
          updateCartUI();
        }
      });
    });

    document.querySelectorAll(".btn-remove-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.cartId;
        cart = cart.filter(i => i.cartItemId !== id);
        saveCart();
        updateCartUI();
      });
    });
  }

  // 6. WhatsApp Dispatcher
  function quickOrderWhatsApp(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const variantIdx = selectedVariants[productId] || 0;
    const variant = product.variants[variantIdx];

    const message = `Namaskaram Sandya garu / Arjun Dairy Farm! 🙏
I would like to order:
🥛 *${product.name}* (${product.teluguName})
📦 Size/Weight: *${variant.size}*
💰 Price: *₹${variant.price}*

Please let me know the availability and payment details. Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/916281641447?text=${encoded}`, "_blank");
  }

  function checkoutViaWhatsApp() {
    if (cart.length === 0) {
      showToast("Your cart is empty! Please add products first.");
      return;
    }

    const customerName = document.getElementById("custName")?.value.trim() || "Customer";
    const customerPhone = document.getElementById("custPhone")?.value.trim() || "Not specified";
    const customerAddress = document.getElementById("custAddress")?.value.trim() || "Store Pickup / Direct Message";
    const deliverySlot = document.getElementById("deliverySlot")?.value || "Morning Batch (6:00 - 8:30 AM)";

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    let itemsList = cart.map((item, i) => 
      `${i + 1}. *${item.name}* (${item.size}) × ${item.qty} = ₹${item.price * item.qty}`
    ).join("\n");

    const message = `Namaskaram Sandya garu / Arjun Dairy Farm! 🙏
I would like to place an order from your website:

📋 *ORDER ITEMS:*
${itemsList}

💵 *Estimated Total:* ₹${subtotal}
🚚 *Delivery Preference:* ${deliverySlot}

👤 *Customer Details:*
• Name: ${customerName}
• Phone: ${customerPhone}
• Delivery Address / Area: ${customerAddress}

Please confirm my order and share payment details (UPI/Cash). Thank you!`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/916281641447?text=${encoded}`, "_blank");
  }

  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.addEventListener("click", checkoutViaWhatsApp);
  }

  // 7. Toast Notification
  function showToast(text) {
    if (!toastMsg) return;
    toastMsg.textContent = text;
    toastMsg.classList.add("show");
    setTimeout(() => {
      toastMsg.classList.remove("show");
    }, 2800);
  }

  // 8. Drawers & Navigation Controls
  function openCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add("open");
      cartOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove("open");
      cartOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  openCartBtns.forEach(btn => btn.addEventListener("click", openCart));
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCart);

  // Mobile Menu
  function openMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.add("open");
      mobileOverlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer && mobileOverlay) {
      mobileDrawer.classList.remove("open");
      mobileOverlay.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (menuToggleBtn) menuToggleBtn.addEventListener("click", openMobileMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener("click", closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeMobileMenu);
  mobileNavLinks.forEach(link => link.addEventListener("click", closeMobileMenu));

  // 9. Tab Category Filters
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Contact Form quick alert
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("msgName")?.value || "";
      const query = document.getElementById("msgBody")?.value || "";
      const msg = `Namaskaram Sandya garu, my name is ${name}. ${query}`;
      window.open(`https://wa.me/916281641447?text=${encodeURIComponent(msg)}`, "_blank");
      showToast("Redirecting to WhatsApp to send message...");
    });
  }

  // --- Initial Invocations ---
  renderProducts();
  updateCartUI();
  checkStoreStatus();
  setInterval(checkStoreStatus, 60000); // refresh status every minute
});
