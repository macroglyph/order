const products = [
    { id: 1, name: "Coffee", category: "Drinks", price: 2.5 },
    { id: 2, name: "Tea", category: "Drinks", price: 2.0 },
    { id: 3, name: "Sandwich", category: "Food", price: 4.5 },
    { id: 4, name: "Muffin", category: "Food", price: 3.0 },
    { id: 5, name: "Water", category: "Drinks", price: 1.0 },
];

let cart = [];

const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const search = document.getElementById("search");
const categoryFilter = document.getElementById("categoryFilter");

function renderProducts() {
    const searchTerm = search.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    productList.innerHTML = '';
    filtered.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
        <strong>${product.name}</strong><br>
        Category: ${product.category}<br>
        Price: $${product.price.toFixed(2)}<br>
        <button onclick="addToCart(${product.id})">Add to cart</button>
        `;
        productList.appendChild(div);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
        ${item.name} - $${item.price.toFixed(2)}<br>
        <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(div);
    });
    cartSummary.textContent = `Total: $${total.toFixed(2)} (${cart.length} items)`;
}

search.addEventListener('input', renderProducts);
categoryFilter.addEventListener('change', renderProducts);

renderProducts();