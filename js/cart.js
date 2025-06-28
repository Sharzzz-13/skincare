// Global storage
let productData = [];

fetch("../data/product.json")
  .then(res => res.json())
  .then(data => {
    productData = data; // Store data globally
    displayCart();
  });

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartBox = document.getElementById("cart-items");
  let subtotal = 0;
  const counts = {};

  cart.forEach(id => counts[id] = (counts[id] || 0) + 1);

  // Clear cart display
  cartBox.innerHTML = '<h3>Your Cart Items</h3>';

  Object.entries(counts).forEach(([id, qty]) => {
    const item = productData.find(p => p.id === id);
    const itemTotal = item.price * qty;
    subtotal += itemTotal;
    
    cartBox.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <h4>${item.name}</h4>
          <p>₹${item.price} per item</p>
        </div>
        <div class="cart-item-quantity">
          <button class="qty-btn minus" onclick="updateCartQuantity('${id}', -1)">-</button>
          <span class="qty-display" id="cart-qty-${id}">${qty}</span>
          <button class="qty-btn plus" onclick="updateCartQuantity('${id}', 1)">+</button>
        </div>
        <div class="cart-item-total" id="cart-total-${id}">
          ₹${itemTotal}
        </div>
        <button class="remove-btn" onclick="removeFromCart('${id}')">🗑️</button>
      </div>`;
  });

  // Calculate charges
  const packingCharge = 50;
  const deliveryCharge = subtotal > 1000 ? 0 : 100; // Free delivery above ₹1000
  const total = subtotal + packingCharge + deliveryCharge;

  // Display cost breakdown
  cartBox.innerHTML += `
    <div class="cost-breakdown">
      <div class="cost-row">
        <span>Subtotal:</span>
        <span id="subtotal-display">₹${subtotal}</span>
      </div>
      <div class="cost-row">
        <span>Packing Charge:</span>
        <span>₹${packingCharge}</span>
      </div>
      <div class="cost-row">
        <span>Delivery Charge:</span>
        <span id="delivery-display">${deliveryCharge === 0 ? 'FREE' : '₹' + deliveryCharge}</span>
      </div>
      <div class="cost-row total-row">
        <span>Total Amount:</span>
        <span id="total-display">₹${total}</span>
      </div>
    </div>
  `;

  // Update payment button with total
  const paymentBtn = document.querySelector('#checkout-form button[type="submit"]');
  if (paymentBtn) {
    paymentBtn.textContent = `Pay ₹${total}`;
  }
}

function updateCartQuantity(productId, change) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const currentQty = parseInt(document.getElementById(`cart-qty-${productId}`).textContent);
  const newQty = Math.max(1, currentQty + change);
  
  // Update cart in localStorage
  const newCart = [];
  let added = 0;
  
  cart.forEach(id => {
    if (id === productId && added < newQty) {
      newCart.push(id);
      added++;
    } else if (id !== productId) {
      newCart.push(id);
    }
  });
  
  localStorage.setItem("cart", JSON.stringify(newCart));
  
  // Update display
  document.getElementById(`cart-qty-${productId}`).textContent = newQty;
  
  // Recalculate totals
  recalculateCart();
}

function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const newCart = cart.filter(id => id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  
  // Reload cart display
  location.reload();
}

function recalculateCart() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const counts = {};
  let subtotal = 0;

  cart.forEach(id => counts[id] = (counts[id] || 0) + 1);

  Object.entries(counts).forEach(([id, qty]) => {
    const item = productData.find(p => p.id === id);
    const itemTotal = item.price * qty;
    subtotal += itemTotal;
    
    // Update individual item totals
    const totalElement = document.getElementById(`cart-total-${id}`);
    if (totalElement) {
      totalElement.textContent = `₹${itemTotal}`;
    }
  });

  // Calculate charges
  const packingCharge = 50;
  const deliveryCharge = subtotal > 1000 ? 0 : 100;
  const total = subtotal + packingCharge + deliveryCharge;

  // Update cost breakdown
  document.getElementById('subtotal-display').textContent = `₹${subtotal}`;
  document.getElementById('delivery-display').textContent = deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`;
  document.getElementById('total-display').textContent = `₹${total}`;

  // Update payment button
  const paymentBtn = document.querySelector('#checkout-form button[type="submit"]');
  if (paymentBtn) {
    paymentBtn.textContent = `Pay ₹${total}`;
  }
}

document.getElementById("checkout-form").addEventListener("submit", e => {
  e.preventDefault();
  
  // Get selected payment method
  const selectedPayment = document.querySelector('input[name="payment"]:checked');
  if (!selectedPayment) {
    alert("Please select a payment method!");
    return;
  }
  
  alert(`Order placed successfully! Payment method: ${selectedPayment.value}. Thank you for shopping with Skin Genius! ❤️`);
  localStorage.removeItem("cart");
  window.location.reload();
});
