fetch('products.json')
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById('productContainer');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');

    // Populate category dropdown
    const categories = [...new Set(data.map(p => p.category))].filter(Boolean);

    categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    function displayProducts(products) {

      container.innerHTML = '';

      if (products.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
      }

      products.forEach(product => {

        const card = document.createElement('div');
        card.className = "product";

        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}">

          <h3>${product.name}</h3>

          <p><strong>Item #:</strong> ${product["item number"] || ""}</p>
          <p><strong>Brand:</strong> ${product.brand || ""}</p>
          <p><strong>Category:</strong> ${product.category || ""}</p>
          <p><strong>Unit Weight:</strong> ${product["unit weight"] || ""}</p>
          <p><strong>Case Qty:</strong> ${product["case qty"] || ""}</p>
          <p><strong>Shelf Life:</strong> ${product["shelf life"] || ""}</p>

          <a href="${product.spec}" target="_blank">Download Spec Sheet</a>
        `;

        container.appendChild(card);

      });

    }

    function filterProducts() {

      const searchValue = searchInput.value.toLowerCase();
      const selectedCategory = categoryFilter.value;

      const filtered = data.filter(product => {

        const matchesSearch = Object.values(product).some(value =>
          String(value).toLowerCase().includes(searchValue)
        );

        const matchesCategory =
          selectedCategory === "" || product.category === selectedCategory;

        return matchesSearch && matchesCategory;

      });

      displayProducts(filtered);

    }

    // Event listeners
    searchInput.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

    // Initial load
    displayProducts(data);

  });
