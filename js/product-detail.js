const id = new URLSearchParams(location.search).get("id");

fetch("../data/product.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.id === id);
    if (!product) return;
    document.getElementById("product-detail").innerHTML = `
      <div class="product-detail-card">
        <img src="${product.image}" alt="${product.name}" class="product-detail-img" />
        <h2>${product.name}</h2>
        <div class="product-detail-price-rating">
          <span class="product-detail-price">₹${product.price}</span>
          <span class="product-detail-rating">★ 4.5 (120 reviews)</span>
        </div>
        <p class="product-detail-desc">${product.description}</p>
        <button id="add-to-cart" class="add-to-cart-btn">Add to Cart</button>
        <div class="product-detail-reviews">
          <h3>Reviews</h3>
          <div class="review">
            <strong>Priya</strong> <span>★★★★★</span>
            <p>Loved this product! My skin feels so hydrated.</p>
          </div>
          <div class="review">
            <strong>Rahul</strong> <span>★★★★☆</span>
            <p>Good value for money. Would recommend.</p>
          </div>
          <div class="review">
            <strong>Sneha</strong> <span>★★★★★</span>
            <p>Noticeable glow after a week of use!</p>
          </div>
        </div>
      </div>
    `;
    document.getElementById("add-to-cart").onclick = () => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    };
  });
