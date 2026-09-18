// ==========================================================================
// ARJUN DAIRY FARM - JAVASCRIPT APPLICATION LOGIC
// High-Converting, Product-Centric, Animated & Interactive
// Engineered by Savvadi Studios (savvadi.studios@gmail.com)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- State ---
  let currentCategory = "all";
  let searchQuery = "";
  let cart = JSON.parse(localStorage.getItem("arjun_dairy_cart")) || [];

  // Selected variant per product ID
  const selectedVariants = {};
  if (typeof PRODUCTS !== "undefined") {
    PRODUCTS.forEach(p => {
      selectedVariants[p.id] = 0; // index of default variant
    });
  }

  // Active modal product state
  let modalProduct = null;
  let modalVariantIndex = 0;

  // --- DOM Elements ---
  const productsGrid = document.getElementById("productsGrid");
  const productSearchInput = document.getElementById("productSearchInput");
  const filterPills = document.querySelectorAll(".filter-pill");
  
  // Cart Elements
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const openCartBtns = document.querySelectorAll(".open-cart-btn");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartEmptyState = document.getElementById("cartEmptyState");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartCountBadges = document.querySelectorAll(".cart-count");
  const checkoutWhatsAppBtn = document.getElementById("checkoutWhatsAppBtn");

  // Quick View Modal Elements
  const quickViewModal = document.getElementById("quickViewModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const modalImg = document.getElementById("modalImg");
  const modalCategory = document.getElementById("modalCategory");
  const modalTitle = document.getElementById("modalTitle");
  const modalTelugu = document.getElementById("modalTelugu");
  const modalDesc = document.getElementById("modalDesc");
  const modalNutrition = document.getElementById("modalNutrition");
  const modalIngredients = document.getElementById("modalIngredients");
  const modalShelfLife = document.getElementById("modalShelfLife");
  const modalVariants = document.getElementById("modalVariants");
  const modalPrice = document.getElementById("modalPrice");
  const modalAddToCartBtn = document.getElementById("modalAddToCartBtn");

  // Mobile Menu Elements
  const menuToggleBtn = document.getElementById("menuToggleBtn");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const closeMobileMenuBtn = document.getElementById("closeMobileMenuBtn");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  // Store Hours Status Elements
  const liveStatusPill = document.getElementById("liveStatusPill");
  const liveStatusText = document.getElementById("liveStatusText");

  // Toast Element
  const toastMsg = document.getElementById("toastMsg");

  // --- Functions ---

  // 1. Evaluate Store Operating Hours (IST: 6:00-8:30 AM & 6:00-8:30 PM)
  function checkStoreStatus() {
    if (!liveStatusPill || !liveStatusText) return;

    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    const totalMinutes = istTime.getHours() * 60 + istTime.getMinutes();

    const morningStart = 6 * 60; // 06:00
    const morningEnd = 8 * 60 + 30; // 08:30
    const eveningStart = 18 * 60; // 18:00
    const eveningEnd = 20 * 60 + 30; // 20:30

    const isMorningOpen = totalMinutes >= morningStart && totalMinutes <= morningEnd;
    const isEveningOpen = totalMinutes >= eveningStart && totalMinutes <= eveningEnd;

    if (isMorningOpen || isEveningOpen) {
      liveStatusPill.className = "live-badge open";
      liveStatusText.textContent = "🟢 Store Open Now in Mancherial (Fresh Batch Ready)";
    } else {
      liveStatusPill.className = "live-badge closed";
      let nextTime = totalMinutes < morningStart 
        ? "6:00 AM (Morning Milking Batch)" 
        : (totalMinutes < eveningStart ? "6:00 PM (Evening Milking Batch)" : "6:00 AM Tomorrow");
      liveStatusText.textContent = `🟡 Store opens at ${nextTime} (WhatsApp orders 24/7)`;
    }
  }

  // 2. Render Product Cards
  function renderProducts() {
    if (!productsGrid || typeof PRODUCTS === "undefined") return;

    // Filter by category & search query
    let list = PRODUCTS;

    if (currentCategory !== "all") {
      list = list.filter(p => p.category === currentCategory);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.teluguName.includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    if (list.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #666;">
          <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
          <h3 style="color: #0f2c20;">No products found matching "${searchQuery}"</h3>
          <p style="font-size: 0.9rem; margin-top: 6px;">Try searching for "Milk", "Ghee", "Paneer", or clear your filter.</p>
          <button type="button" class="btn btn-outline" id="resetSearchBtn" style="margin-top: 16px;">
            Reset Search
          </button>
        </div>
      `;
      const resetBtn = document.getElementById("resetSearchBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (productSearchInput) productSearchInput.value = "";
          searchQuery = "";
          currentCategory = "all";
          filterPills.forEach(p => p.classList.remove("active"));
          document.querySelector('.filter-pill[data-category="all"]')?.classList.add("active");
          renderProducts();
        });
      }
      return;
    }

    productsGrid.innerHTML = list.map(product => {
      const activeVariantIdx = selectedVariants[product.id] || 0;
      const activeVariant = product.variants[activeVariantIdx] || product.variants[0];

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-media">
            <img src="${product.image}" alt="${product.name}" loading="lazy" />
            <span class="product-badge-tag">${product.tag}</span>
            ${product.isBestseller ? '<span class="bestseller-shimmer">★ Bestseller</span>' : ''}
            <button type="button" class="btn-quick-view" data-quick-view="${product.id}">
              👁️ Quick View & Facts
            </button>
          </div>
          <div class="product-body">
            <span class="product-category-label">${product.categoryLabel}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-telugu-name">${product.teluguName}</div>
            <p class="product-desc">${product.description}</p>
            
            <div class="variant-selector-wrap">
              <span class="variant-label">Choose Size:</span>
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
              <div class="price-box">
                <span class="price-unit">Price</span>
                <span class="price-val">₹${activeVariant.price}</span>
              </div>
              <div class="card-cta-group">
                <button class="btn btn-add-item" data-id="${product.id}" title="Add to Cart">
                  🛒 Add
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
    document.querySelectorAll(".product-card .variant-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const idx = parseInt(e.target.dataset.index, 10);
        selectedVariants[id] = idx;
        renderProducts();
      });
    });

    // Add to Cart
    document.querySelectorAll(".btn-add-item").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.id;
        addToCart(id);
      });
    });

    // Single item direct WhatsApp order
    document.querySelectorAll("[data-quick-wa]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.quickWa;
        quickOrderWhatsApp(id);
      });
    });

    // Quick View Modal
    document.querySelectorAll("[data-quick-view]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.quickView;
        openQuickViewModal(id);
      });
    });
  }

  // 4. Quick View Modal Logic
  function openQuickViewModal(productId) {
    modalProduct = PRODUCTS.find(p => p.id === productId);
    if (!modalProduct || !quickViewModal) return;

    modalVariantIndex = selectedVariants[productId] || 0;

    modalImg.src = modalProduct.image;
    modalImg.alt = modalProduct.name;
    modalCategory.textContent = modalProduct.categoryLabel;
    modalTitle.textContent = modalProduct.name;
    modalTelugu.textContent = modalProduct.teluguName;
    modalDesc.textContent = modalProduct.description;

    // Nutrition facts
    const nut = modalProduct.nutrition || {};
    modalNutrition.innerHTML = Object.entries(nut).map(([k, v]) => `
      <div style="display: flex; justify-content: space-between; padding: 2px 0;">
        <span style="text-transform: capitalize;">${k}:</span>
        <strong>${v}</strong>
      </div>
    `).join("");

    modalIngredients.textContent = modalProduct.ingredients || "100% Pure Farm Ingredients";
    modalShelfLife.textContent = modalProduct.shelfLife || "Fresh Daily";

    renderModalVariants();
    updateModalPrice();

    quickViewModal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function renderModalVariants() {
    if (!modalProduct || !modalVariants) return;
    modalVariants.innerHTML = modalProduct.variants.map((v, idx) => `
      <button type="button" 
        class="variant-pill ${idx === modalVariantIndex ? 'active' : ''}" 
        data-modal-index="${idx}">
        ${v.size}
      </button>
    `).join("");

    modalVariants.querySelectorAll(".variant-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        modalVariantIndex = parseInt(e.currentTarget.dataset.modalIndex, 10);
        selectedVariants[modalProduct.id] = modalVariantIndex;
        renderModalVariants();
        updateModalPrice();
        renderProducts(); // sync grid
      });
    });
  }

  function updateModalPrice() {
    if (!modalProduct || !modalPrice) return;
    const v = modalProduct.variants[modalVariantIndex] || modalProduct.variants[0];
    modalPrice.textContent = `₹${v.price}`;
  }

  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener("click", () => {
      if (!modalProduct) return;
      addToCart(modalProduct.id, modalVariantIndex);
      closeQuickViewModal();
    });
  }

  function closeQuickViewModal() {
    if (quickViewModal) {
      quickViewModal.classList.remove("open");
      document.body.style.overflow = "";
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeQuickViewModal);
  if (quickViewModal) {
    quickViewModal.addEventListener("click", (e) => {
      if (e.target === quickViewModal) closeQuickViewModal();
    });
  }

  // 5. Add to Cart Logic
  function addToCart(productId, explicitVariantIdx = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const variantIdx = explicitVariantIdx !== null ? explicitVariantIdx : (selectedVariants[productId] || 0);
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

    // Bump cart counter animation
    cartCountBadges.forEach(badge => {
      badge.classList.remove("bump");
      void badge.offsetWidth; // trigger reflow
      badge.classList.add("bump");
    });
  }

  // 6. Save & Update Cart UI
  function saveCart() {
    localStorage.setItem("arjun_dairy_cart", JSON.stringify(cart));
  }

  function updateCartUI() {
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(b => b.textContent = totalQty);

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `₹${subtotal}`;
    }

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

  // 7. WhatsApp Order Dispatcher
  function quickOrderWhatsApp(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const variantIdx = selectedVariants[productId] || 0;
    const variant = product.variants[variantIdx];

    const message = `Namaskaram Arjun Dairy Farm! 🙏
I would like to order:
🥛 *${product.name}* (${product.teluguName})
📦 Size/Weight: *${variant.size}*
💰 Price: *₹${variant.price}*

Please confirm availability and delivery slot. Thank you!`;

    window.open(`https://wa.me/916281641447?text=${encodeURIComponent(message)}`, "_blank");
  }

  function checkoutViaWhatsApp() {
    if (cart.length === 0) {
      showToast("Your cart is empty! Please add products first.");
      return;
    }

    const customerName = document.getElementById("custName")?.value.trim() || "Customer";
    const customerPhone = document.getElementById("custPhone")?.value.trim() || "Not specified";
    const customerAddress = document.getElementById("custAddress")?.value.trim() || "Store Pickup / Direct Delivery";
    const deliverySlot = document.getElementById("deliverySlot")?.value || "Morning Batch (6:00 - 8:30 AM)";

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    let itemsList = cart.map((item, i) => 
      `${i + 1}. *${item.name}* (${item.size}) × ${item.qty} = ₹${item.price * item.qty}`
    ).join("\n");

    const message = `Namaskaram Arjun Dairy Farm! 🙏
I would like to place an order:

📋 *ORDER ITEMS:*
${itemsList}

💵 *Estimated Subtotal:* ₹${subtotal}
🚚 *Delivery Preference:* ${deliverySlot}

👤 *Customer Details:*
• Name: ${customerName}
• Phone: ${customerPhone}
• Delivery Area / Address: ${customerAddress}

Please confirm my order and share payment details (UPI/Cash). Thank you!`;

    window.open(`https://wa.me/916281641447?text=${encodeURIComponent(message)}`, "_blank");
  }

  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.addEventListener("click", checkoutViaWhatsApp);
  }

  // 8. Toast
  function showToast(text) {
    if (!toastMsg) return;
    toastMsg.textContent = text;
    toastMsg.classList.add("show");
    setTimeout(() => {
      toastMsg.classList.remove("show");
    }, 2800);
  }

  // 9. Drawer Controls
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

  // Escape key closes modals/drawers
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      closeMobileMenu();
      closeQuickViewModal();
    }
  });

  // 10. Filter Pills & Live Search
  filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
      filterPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      currentCategory = pill.dataset.category;
      renderProducts();
    });
  });

  if (productSearchInput) {
    productSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }

  // 11. Contact Form Submit
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("msgName")?.value || "";
      const phone = document.getElementById("msgPhone")?.value || "";
      const query = document.getElementById("msgBody")?.value || "";
      const msg = `Namaskaram Arjun Dairy Farm! My name is ${name} (${phone}).\nQuery: ${query}`;
      window.open(`https://wa.me/916281641447?text=${encodeURIComponent(msg)}`, "_blank");
      showToast("Opening WhatsApp to send your inquiry...");
    });
  }

  // --- Initial Invocations ---
  renderProducts();
  updateCartUI();
  checkStoreStatus();
  setInterval(checkStoreStatus, 60000);
});
