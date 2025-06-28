// Try different paths to find the correct one
function loadProducts() {
  const paths = [
    "../data/product.json",
    "data/product.json",
    "./data/product.json"
  ];
  
  function tryPath(pathIndex) {
    if (pathIndex >= paths.length) {
      console.error("Could not load products data");
      return;
    }
    
    fetch(paths[pathIndex])
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Products loaded successfully:", data.length, "products");
        displayProducts(data);
      })
      .catch(error => {
        console.log(`Failed to load from ${paths[pathIndex]}, trying next path...`);
        tryPath(pathIndex + 1);
      });
  }
  
  tryPath(0);
}

function displayProducts(data) {
  const list = document.getElementById("product-list");
  if (!list) {
    console.error("Product list element not found");
    return;
  }
  
  list.innerHTML = ''; // Clear existing content
  
  data.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "product";
    let badge = '';
    if (i === 0) badge = '<div class="product-badge">Best Seller</div>';
    card.innerHTML = `
      ${badge}
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p><strong>₹${p.price}</strong></p>
      <button class="add-to-cart-btn" onclick="addToCart('${p.id}', this)">Add to Cart</button>
      <a href="product.html?id=${p.id}" class="view-btn">View Details</a>`;
    list.appendChild(card);
  });
}

function addToCart(productId, button) {
  console.log("Adding to cart:", productId);
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Show success message
  const originalText = button.textContent;
  button.textContent = "Added! ✓";
  button.style.background = "#4CAF50";
  
  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = "";
  }, 1500);
}

// Load products when the script runs
loadProducts();
