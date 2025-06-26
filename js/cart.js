fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const cartBox = document.getElementById("cart-items");
    let total = 0;
    const counts = {};

    cart.forEach(id => counts[id] = (counts[id] || 0) + 1);

    Object.entries(counts).forEach(([id, qty]) => {
      const item = data.find(p => p.id === id);
      cartBox.innerHTML += `
        <div>
          <img src="${item.image}" width="50">
          ${item.name} x ${qty} = ₹${item.price * qty}
        </div>`;
      total += item.price * qty;
    });

    cartBox.innerHTML += `<h4>Total: ₹${total}</h4>`;
  });

document.getElementById("checkout-form").addEventListener("submit", e => {
  e.preventDefault();
  alert("Order placed! Thank you for shopping ❤️");
  localStorage.removeItem("cart");
});
