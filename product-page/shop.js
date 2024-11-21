// Interactivity for buttons
const buttons = document.querySelectorAll('.category-button');

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        alert(`Produk ${index + 1} berhasil ditambahkan ke keranjang!`);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const filterCategory = document.getElementById('filterCategory');
    const filterButton = document.getElementById('filterButton');
    const products = document.querySelectorAll('.pro');

    // Filter dan pencarian produk
    function filterProducts() {
        const searchQuery = searchBar.value.toLowerCase();
        const selectedCategory = filterCategory.value;

        products.forEach(product => {
            const productName = product.querySelector('h5').innerText.toLowerCase();
            const productCategory = product.querySelector('span').innerText.toLowerCase();

            const matchesSearch = productName.includes(searchQuery);
            const matchesCategory = selectedCategory === 'all' || productCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Event listeners
    searchBar.addEventListener('input', filterProducts);
    filterButton.addEventListener('click', filterProducts);
});
