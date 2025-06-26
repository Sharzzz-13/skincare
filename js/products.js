fetch("../data/product.json")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("product-list");
    data.forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p><strong>₹${p.price}</strong></p>
        <a href="product.html?id=${p.id}" class="view-btn">View Details</a>`;
      list.appendChild(card);
    });
  });
