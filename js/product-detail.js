const id = new URLSearchParams(location.search).get("id");

fetch("../data/product.json")
  .then(res => res.json())
  .then(data => {
    const product = data.find(p => p.id === id);
    if (!product) {
      document.getElementById("product-detail").innerHTML = '<p>Product not found.</p>';
      return;
    }
    document.getElementById("product-detail").innerHTML = `
      <img src="${product.image}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: ₹${product.price}</p>`;
    document.getElementById("add-to-cart").onclick = () => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    };
  });
