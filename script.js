fetch('products.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('productContainer');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('categoryFilter');

    // Populate categories
    const categories = [...new Set(data.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    function displayProducts(products) {
        container.innerHTML = '';
        products.forEach(product => {
            container.innerHTML += `
                <div class="product">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>SKU: ${product.sku}</p>
                    <p>Case Pack: ${product.casePack}</p>
                    <a href="${product.spec}" target="_blank">Download Spec Sheet</a>
                </div>
            `;
        });
    }

    searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();

    const filtered = data.filter(product => {
        return Object.values(product).some(field =>
            String(field).toLowerCase().includes(value)
        );
    });

    displayProducts(filtered);
});

    categoryFilter.addEventListener('change', () => {
        const value = categoryFilter.value;
        const filtered = value
            ? data.filter(p => p.category === value)
            : data;
        displayProducts(filtered);
    });
});
