// ==================== CART MANAGEMENT ====================

// Initialize
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

// Update cart counter badge
function updateCartCounter() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById('cart-counter');
  if (badge) {
    badge.textContent = cartCount;
    badge.style.display = cartCount > 0 ? 'flex' : 'none';
  }
}

// Add item to cart with quantity
function addToCart(name, price, image, quantity = 1) {
  // Check if item already exists
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const item = {
      id: Date.now(),
      name,
      price,
      image,
      quantity: quantity
    };
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification(`${name} added to cart!`, 'success');
  updateCartCounter();

  if (window.location.pathname.includes('cart.html')) {
    loadCart();
  }
}

// Update item quantity in cart
function updateQuantity(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(itemId);
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
      updateCartCounter();
    }
  }
}

// Remove item from cart
function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showNotification('Item removed from cart', 'info');
  loadCart();
  updateCartCounter();
}

// Clear entire cart
function clearCart() {
  if (cart.length === 0) {
    showNotification('Your cart is already empty!', 'info');
    return;
  }

  if (confirm('Are you sure you want to clear all items from your cart?')) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    showNotification('Cart cleared successfully!', 'success');
    loadCart();
    updateCartCounter();
  }
}

// ==================== FAVORITES/WISHLIST ====================

function toggleFavorite(name, price, image) {
  const existingIndex = favorites.findIndex(fav => fav.name === name);

  if (existingIndex > -1) {
    favorites.splice(existingIndex, 1);
    showNotification(`${name} removed from favorites`, 'info');
  } else {
    favorites.push({ name, price, image });
    showNotification(`${name} added to favorites!`, 'success');
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoriteButtons();
  if (window.location.pathname.includes('favorites.html')) {
    loadFavorites();
  }
}

function isFavorite(name) {
  return favorites.some(fav => fav.name === name);
}

function updateFavoriteButtons() {
  document.querySelectorAll('.favorite-btn').forEach(btn => {
    const itemName = btn.getAttribute('data-item-name');
    if (isFavorite(itemName)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="bx bxs-heart"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="bx bx-heart"></i>';
    }
  });
}

// ==================== CHECKOUT WITH DELIVERY OPTIONS ====================

function proceedToCheckout() {
  if (cart.length === 0) {
    showNotification('Your cart is empty! Add some items first.', 'info');
    return;
  }

  // Show checkout modal
  showCheckoutModal();
}

function showCheckoutModal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const modal = document.createElement('div');
  modal.className = 'checkout-modal';
  modal.innerHTML = `
    <div class="checkout-modal-content">
      <span class="close-modal" onclick="closeCheckoutModal()">&times;</span>
      <h2>Checkout</h2>

      <div class="checkout-summary">
        <p><strong>Total Items:</strong> ${itemCount}</p>
        <p><strong>Total Amount:</strong> GH₵${total.toFixed(2)}</p>
      </div>

      <form id="checkout-form">
        <h3>Delivery Options</h3>

        <div class="form-group">
          <label>
            <input type="radio" name="delivery-option" value="delivery" checked>
            <span>🚚 Delivery</span>
          </label>
          <label>
            <input type="radio" name="delivery-option" value="pickup">
            <span>🏪 Pickup</span>
          </label>
        </div>

        <div id="delivery-address-section">
          <h3>Delivery Address</h3>
          <div class="form-group">
            <input type="text" id="customer-name" placeholder="Full Name" required>
          </div>
          <div class="form-group">
            <input type="tel" id="customer-phone" placeholder="Phone Number" required>
          </div>
          <div class="form-group">
            <input type="text" id="delivery-address" placeholder="Delivery Address" required>
          </div>
          <div class="form-group">
            <input type="text" id="landmark" placeholder="Landmark (Optional)">
          </div>
        </div>

        <div id="pickup-section" style="display: none;">
          <h3>Pickup Information</h3>
          <div class="form-group">
            <input type="text" id="pickup-name" placeholder="Full Name" required>
          </div>
          <div class="form-group">
            <input type="tel" id="pickup-phone" placeholder="Phone Number" required>
          </div>
          <p style="color: var(--text-color); margin-top: 1rem;">
            <strong>Pickup Location:</strong> 123 Main Street, Accra<br>
            <strong>Estimated Time:</strong> 30-45 minutes
          </p>
        </div>

        <div class="form-group">
          <label for="special-instructions">Special Instructions (Optional)</label>
          <textarea id="special-instructions" rows="3" placeholder="Any special requests?"></textarea>
        </div>

        <button type="submit" class="button checkout-submit-btn">
          <i class='bx bx-credit-card'></i> Place Order - GH₵${total.toFixed(2)}
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  // Handle delivery option toggle
  const deliveryRadios = modal.querySelectorAll('input[name="delivery-option"]');
  deliveryRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      const deliverySection = document.getElementById('delivery-address-section');
      const pickupSection = document.getElementById('pickup-section');

      if (e.target.value === 'delivery') {
        deliverySection.style.display = 'block';
        pickupSection.style.display = 'none';
      } else {
        deliverySection.style.display = 'none';
        pickupSection.style.display = 'block';
      }
    });
  });

  // Handle form submission
  document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    completeOrder();
  });
}

function closeCheckoutModal() {
  const modal = document.querySelector('.checkout-modal');
  if (modal) modal.remove();
}

function completeOrder() {
  const deliveryOption = document.querySelector('input[name="delivery-option"]:checked').value;
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const order = {
    id: Date.now(),
    items: [...cart],
    total: total,
    deliveryOption: deliveryOption,
    date: new Date().toISOString(),
    status: 'Pending',
    customerInfo: {}
  };

  if (deliveryOption === 'delivery') {
    order.customerInfo = {
      name: document.getElementById('customer-name').value,
      phone: document.getElementById('customer-phone').value,
      address: document.getElementById('delivery-address').value,
      landmark: document.getElementById('landmark').value
    };
  } else {
    order.customerInfo = {
      name: document.getElementById('pickup-name').value,
      phone: document.getElementById('pickup-phone').value
    };
  }

  order.specialInstructions = document.getElementById('special-instructions').value;

  // Add to order history
  orderHistory.unshift(order);
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  // Clear cart
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));

  closeCheckoutModal();
  showNotification('Order placed successfully! 🎉', 'success');

  setTimeout(() => {
    alert(`Thank you for your order!\n\nOrder ID: #${order.id}\nTotal: GH₵${total.toFixed(2)}\n\nYou can track your order in Order History.`);
    loadCart();
    updateCartCounter();
  }, 500);
}

// ==================== ORDER HISTORY ====================

function loadOrderHistory() {
  const container = document.getElementById('order-history-container');
  if (!container) return;

  if (orderHistory.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-color-light);">
        <i class='bx bx-receipt' style="font-size: 4rem; margin-bottom: 1rem;"></i>
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No orders yet</p>
        <p style="font-size: 0.9rem;">Start ordering some delicious food!</p>
        <a href="cart.html" class="button" style="margin-top: 1rem; display: inline-block;">Browse Menu</a>
      </div>
    `;
    return;
  }

  container.innerHTML = orderHistory.map(order => {
    const orderDate = new Date(order.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
      <div class="order-card">
        <div class="order-header">
          <div>
            <h3>Order #${order.id}</h3>
            <p class="order-date">${orderDate}</p>
          </div>
          <span class="order-status ${order.status.toLowerCase()}">${order.status}</span>
        </div>

        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <img src="${item.image}" alt="${item.name}">
              <div>
                <p><strong>${item.name}</strong></p>
                <p>Qty: ${item.quantity} × GH₵${item.price.toFixed(2)}</p>
              </div>
              <p class="item-total">GH₵${(item.quantity * item.price).toFixed(2)}</p>
            </div>
          `).join('')}
        </div>

        <div class="order-footer">
          <div>
            <p><strong>Delivery:</strong> ${order.deliveryOption === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}</p>
            ${order.deliveryOption === 'delivery' ? `<p><small>${order.customerInfo.address}</small></p>` : ''}
          </div>
          <div class="order-total">
            <strong>Total: GH₵${order.total.toFixed(2)}</strong>
          </div>
        </div>

        <button class="button reorder-btn" onclick="reorder(${order.id})">
          <i class='bx bx-refresh'></i> Reorder
        </button>
      </div>
    `;
  }).join('');
}

function reorder(orderId) {
  const order = orderHistory.find(o => o.id === orderId);
  if (!order) return;

  order.items.forEach(item => {
    addToCart(item.name, item.price, item.image, item.quantity);
  });

  showNotification('Items added to cart!', 'success');
  setTimeout(() => {
    window.location.href = 'cart.html';
  }, 1000);
}

// ==================== LOAD CART ====================

function loadCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) return;

  let total = 0;
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-color-light);">
        <i class='bx bx-cart' style="font-size: 4rem; margin-bottom: 1rem;"></i>
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Your cart is empty</p>
        <p style="font-size: 0.9rem;">Start adding some delicious items!</p>
      </div>
    `;
    cartTotal.textContent = `GH₵0.00`;

    const checkoutBtn = document.querySelector('.checkout-btn');
    const clearBtn = document.querySelector('.clear-cart-btn');
    if (checkoutBtn) checkoutBtn.disabled = true;
    if (clearBtn) clearBtn.disabled = true;

    return;
  }

  const checkoutBtn = document.querySelector('.checkout-btn');
  const clearBtn = document.querySelector('.clear-cart-btn');
  if (checkoutBtn) checkoutBtn.disabled = false;
  if (clearBtn) clearBtn.disabled = false;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.style.opacity = "0";
    itemDiv.style.transform = "translateY(20px)";

    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p class="item-price">GH₵${item.price.toFixed(2)} each</p>
        <p class="item-subtotal">Subtotal: GH₵${itemTotal.toFixed(2)}</p>
      </div>
      <div class="quantity-controls">
        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">
          <i class='bx bx-minus'></i>
        </button>
        <span class="quantity">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">
          <i class='bx bx-plus'></i>
        </button>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
        <i class='bx bx-trash'></i>
      </button>
    `;

    cartItemsContainer.appendChild(itemDiv);

    setTimeout(() => {
      itemDiv.style.transition = "all 0.3s ease";
      itemDiv.style.opacity = "1";
      itemDiv.style.transform = "translateY(0)";
    }, 50);
  });

  cartTotal.textContent = `GH₵${total.toFixed(2)}`;
}

// ==================== LOAD FAVORITES ====================

function loadFavorites() {
  const container = document.getElementById('favorites-container');
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem; color: var(--text-color-light);">
        <i class='bx bx-heart' style="font-size: 4rem; margin-bottom: 1rem;"></i>
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">No favorites yet</p>
        <p style="font-size: 0.9rem;">Start adding your favorite dishes!</p>
        <a href="cart.html" class="button" style="margin-top: 1rem; display: inline-block;">Browse Menu</a>
      </div>
    `;
    return;
  }

  container.innerHTML = favorites.map(item => `
    <div class="menu__content">
      <img src="${item.image}" alt="${item.name}" class="menu__img">
      <h3 class="menu__name">${item.name}</h3>
      <span class="menu__detail">Delicious dish</span>
      <span class="menu__preci">GH₵${item.price.toFixed(2)}</span>
      <div style="display: flex; gap: 0.5rem; width: 100%;">
        <button class="button menu__button" onclick="addToCart('${item.name}', ${item.price}, '${item.image}', 1)" style="flex: 1;">
          <i class='bx bx-cart-alt'></i> Add
        </button>
        <button class="button favorite-btn active" onclick="toggleFavorite('${item.name}', ${item.price}, '${item.image}')" style="background: #dc3545;">
          <i class='bx bxs-heart'></i>
        </button>
      </div>
    </div>
  `).join('');
}

// ==================== NOTIFICATIONS ====================

function showNotification(message, type = 'success') {
  const existing = document.querySelector('.cart-notification');
  if (existing) existing.remove();

  const notification = document.createElement('div');
  notification.className = `cart-notification ${type}`;
  notification.textContent = message;

  const bgColor = type === 'success' ? '#069C54' : type === 'info' ? '#3498db' : '#f39c12';

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
    max-width: 300px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== ADD CSS ANIMATIONS ====================

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(400px); opacity: 0; }
  }

  .checkout-btn:disabled,
  .clear-cart-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
document.head.appendChild(style);

// ==================== INITIALIZE ====================

document.addEventListener("DOMContentLoaded", () => {
  updateCartCounter();
  updateFavoriteButtons();

  if (window.location.pathname.includes('cart.html')) {
    loadCart();
  }

  if (window.location.pathname.includes('order-history.html')) {
    loadOrderHistory();
  }

  if (window.location.pathname.includes('favorites.html')) {
    loadFavorites();
  }
});