// Rhode-inspired, robust cart logic (minimal cart drawer)

let productData = [
  { id: "1", name: "Radiance Serum", price: 1299, image: "../images/1.jpg" },
  { id: "2", name: "Hydra Cream", price: 1499, image: "../images/2.jpg" },
  { id: "3", name: "Purity Cleanser", price: 1199, image: "../images/3.jpg" },
  { id: "4", name: "Vitamin C Elixir", price: 1799, image: "../images/4.jpg" },
  { id: "5", name: "Renewal Mask", price: 1599, image: "../images/5.jpg" },
  { id: "6", name: "Soothe Balm", price: 999, image: "../images/6.jpg" },
  { id: "7", name: "Clarity Toner", price: 1099, image: "../images/7.jpg" },
  { id: "8", name: "Dew Drops", price: 1399, image: "../images/8.jpg" },
  { id: "9", name: "Barrier Cream", price: 1299, image: "../images/9.jpg" },
  { id: "10", name: "Night Repair", price: 1899, image: "../images/10.jpg" }
];

function addToCart(productId) {
  if (!productData.find(p => p.id === productId)) {
    alert("Invalid product!");
    return;
  }
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCountBadge();
  renderCartDrawer();
  showAddedToBag();
}
window.addToCart = addToCart;

function renderCartDrawer() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const cartDrawer = document.querySelector(".cart-drawer-content");
  if (!cartDrawer) return;
  if (cart.length === 0) {
    cartDrawer.innerHTML = '<p class="cart-empty">your bag is empty.</p>';
    updateCartCountBadge();
    return;
  }
  const counts = {};
  cart.forEach(id => counts[id] = (counts[id] || 0) + 1);
  let html = "";
  let subtotal = 0;
  Object.entries(counts).forEach(([id, qty]) => {
    const item = productData.find(p => p.id === id);
    if (!item) return;
    const itemTotal = item.price * qty;
    subtotal += itemTotal;
    html += `
      <div class="cart-item" style="display:flex;align-items:center;justify-content:space-between;padding:0.7em 0;border-bottom:1px solid #eee;">
        <div style="flex:1;">
          <div style="font-weight:500;">${item.name}</div>
          <div style="font-size:0.95em;color:#b7a99a;">₹${item.price} each</div>
        </div>
        <div style="display:flex;align-items:center;gap:0.5em;">
          <button onclick="updateCartQuantity('${id}', -1)" style="background:none;border:none;font-size:1.1em;">-</button>
          <span>${qty}</span>
          <button onclick="updateCartQuantity('${id}', 1)" style="background:none;border:none;font-size:1.1em;">+</button>
        </div>
        <div style="width:70px;text-align:right;">₹${itemTotal}</div>
        <button onclick="removeFromCart('${id}')" aria-label="Remove" style="background:none;border:none;font-size:1.2em;color:#7a5a3a;padding:0 0.3em;line-height:1;">&times;</button>
      </div>
    `;
  });
  cartDrawer.innerHTML = html;
  updateCartCountBadge();
}
window.renderCartDrawer = renderCartDrawer;

function updateCartQuantity(productId, change) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const counts = {};
  cart.forEach(id => counts[id] = (counts[id] || 0) + 1);
  const currentQty = counts[productId] || 0;
  const newQty = currentQty + change;
  let newCart = [];
  if (newQty < 1) {
    // Remove the product entirely
    newCart = cart.filter(id => id !== productId);
  } else {
    Object.entries(counts).forEach(([id, qty]) => {
      let q = id === productId ? newQty : qty;
      for (let i = 0; i < q; i++) newCart.push(id);
    });
  }
  localStorage.setItem("cart", JSON.stringify(newCart));
  renderCartDrawer();
}
window.updateCartQuantity = updateCartQuantity;

function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const newCart = cart.filter(id => id !== productId);
  localStorage.setItem("cart", JSON.stringify(newCart));
  renderCartDrawer();
}
window.removeFromCart = removeFromCart;

function updateCartCountBadge() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const badge = document.getElementById("cart-count-badge");
  if (!badge) return;
  const count = cart.length;
  badge.textContent = count > 0 ? count : "";
  badge.style.display = count > 0 ? "inline-block" : "none";
}
window.updateCartCountBadge = updateCartCountBadge;

// Minimal, high-end 'added to bag' notification
function showAddedToBag(msg = 'added to bag') {
  let n = document.getElementById('added-to-bag-msg');
  if (!n) {
    n = document.createElement('div');
    n.id = 'added-to-bag-msg';
    n.style.position = 'fixed';
    n.style.top = '70px';
    n.style.right = '32px';
    n.style.background = '#f7f3ef';
    n.style.color = '#7a5a3a';
    n.style.fontFamily = 'Inter, sans-serif';
    n.style.fontSize = '1.05em';
    n.style.padding = '0.7em 1.3em';
    n.style.borderRadius = '6px';
    n.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
    n.style.zIndex = '9999';
    n.style.opacity = '0';
    n.style.transition = 'opacity 0.2s';
    document.body.appendChild(n);
  }
  n.textContent = msg;
  n.style.opacity = '1';
  n.style.display = 'block';
  setTimeout(() => { n.style.opacity = '0'; }, 1300);
  setTimeout(() => { n.style.display = 'none'; }, 1500);
}

function getCartQuantity(productId) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.filter(id => id === productId).length;
}
window.getCartQuantity = getCartQuantity;
