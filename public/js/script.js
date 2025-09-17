// Initialize an empty cart
let cart = [];
let totalPrice = 0;

function addToCart(productName, productPrice) {
    // Add product to cart
    cart.push({ name: productName, price: productPrice });
    totalPrice += productPrice;

    // Update cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    // Update the cart items
    const cartItemsElement = document.getElementById("cartItems");
    cartItemsElement.innerHTML = ''; // Clear the list

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₹${item.price}`;
        cartItemsElement.appendChild(li);
    });

    // Update total price
    document.getElementById("totalPrice").textContent = totalPrice;
}

// Filter products based on search input
function filterProducts() {
    const searchQuery = document.getElementById("searchBox").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
        const productName = product.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchQuery)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}
