document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const cartIcon = document.getElementById('cartIcon');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const cartCount = document.querySelector('.cart-count');

    // Sample product data
    const products = [
        {
            id: 1,
            title: "Deep Fryer",
            price: 85000,
            category: "kitchen",
            image: "12Ldeepfryer.jpg",
            description: "12Litres deep fryer."
        },
        {
            id: 2,
            title: "Blender",
            price: 120000,
            category: "kitchen",
            image: "blender.jpg",
            description: "Powerful 600W blender with 4-speed settings."
        },
        {
            id: 3,
            title: "Microwave Oven",
            price: 450000,
            category: "kitchen",
            image: "microwave.jpg",
            description: "20L capacity microwave with 6 power levels."
        },
        {
            id: 4,
            title: "Vacuum Cleaner",
            price: 350000,
            category: "cleaning",
            image: "vacuum.jpg",
            description: "Bagless vacuum cleaner with HEPA filter."
        },
        {
            id: 5,
            title: "Iron",
            price: 75000,
            category: "cleaning",
            image: "iron.jpg",
            description: "Steam iron with adjustable temperature."
        },
        {
            id: 6,
            title: "Stand Fan",
            price: 150000,
            category: "cooling",
            image: "fan.jpg",
            description: "3-speed oscillating stand fan."
        },
        {
            id: 7,
            title: "Air Conditioner",
            price: 2800000,
            category: "cooling",
            image: "ac.jpg",
            description: "1.5HP split air conditioner."
        },
        {
            id: 8,
            title: "Television",
            price: 1200000,
            category: "electronics",
            image: "tv.jpg",
            description: "43-inch Smart LED TV."
        }
    ];

    // Cart state
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Initialize the app
    function init() {
        renderProducts(products);
        updateCartCount();
        setupEventListeners();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Mobile nav toggle
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Cart icon click
        cartIcon.addEventListener('click', () => {
            cartOverlay.style.display = 'flex';
            renderCartItems();
        });

        // Close cart
        closeCart.addEventListener('click', () => {
            cartOverlay.style.display = 'none';
        });

        // Close cart when clicking outside
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                cartOverlay.style.display = 'none';
            }
        });

        // Checkout button
        checkoutBtn.addEventListener('click', proceedToCheckout);

        // Filter products
        categoryFilter.addEventListener('change', filterProducts);
        priceFilter.addEventListener('change', filterProducts);
    }

    // Render products to the page
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        
        if (productsToRender.length === 0) {
            productGrid.innerHTML = '<p class="no-products">No products match your filters.</p>';
            return;
        }

        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <span class="product-category">${formatCategory(product.category)}</span>
                    <p class="product-price">UGX ${product.price.toLocaleString()}</p>
                    <div class="product-actions">
                        <div class="quantity-controls">
                            <button class="quantity-btn minus" data-id="${product.id}">-</button>
                            <input type="number" class="quantity" value="1" min="1" data-id="${product.id}">
                            <button class="quantity-btn plus" data-id="${product.id}">+</button>
                        </div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
        });

        // Add event listeners to the new buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });

        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', adjustQuantity);
        });

        document.querySelectorAll('.quantity').forEach(input => {
            input.addEventListener('change', updateQuantityInput);
        });
    }

    // Format category for display
    function formatCategory(category) {
        return category.charAt(0).toUpperCase() + category.slice(1);
    }

    // Filter products based on selected filters
    function filterProducts() {
        const selectedCategory = categoryFilter.value;
        const selectedPrice = priceFilter.value;
        
        let filteredProducts = products;
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }
        
        // Filter by price
        if (selectedPrice !== 'all') {
            const [min, max] = selectedPrice.split('-').map(part => {
                if (part.endsWith('+')) {
                    return parseInt(part.replace('+', ''));
                }
                return parseInt(part);
            });
            
            filteredProducts = filteredProducts.filter(product => {
                if (selectedPrice.endsWith('+')) {
                    return product.price >= min;
                } else {
                    return product.price >= min && product.price <= max;
                }
            });
        }
        
        renderProducts(filteredProducts);
    }

    // Add to cart function
    function addToCart(e) {
        const productId = parseInt(e.target.dataset.id);
        const quantityInput = document.querySelector(`.quantity[data-id="${productId}"]`);
        const quantity = parseInt(quantityInput.value);
        
        const product = products.find(p => p.id === productId);
        
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }
        
        updateCart();
    }

    // Adjust quantity with plus/minus buttons
    function adjustQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const quantityInput = document.querySelector(`.quantity[data-id="${productId}"]`);
        let quantity = parseInt(quantityInput.value);
        
        if (e.target.classList.contains('plus')) {
            quantity++;
        } else if (e.target.classList.contains('minus')) {
            if (quantity > 1) {
                quantity--;
            }
        }
        
        quantityInput.value = quantity;
    }

    // Update quantity when input changes
    function updateQuantityInput(e) {
        const value = parseInt(e.target.value);
        if (isNaN(value) || value < 1) {
            e.target.value = 1;
        }
    }

    // Update cart state and UI
    function updateCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCartItems();
    }

    // Update cart count in header
    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Render cart items in the overlay
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            cartTotal.textContent = 'UGX 0';
            return;
        }
        
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.title}</h4>
                    <p class="cart-item-price">UGX ${item.price.toLocaleString()}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Add event listeners to cart item buttons
        document.querySelectorAll('.cart-item .quantity-btn').forEach(button => {
            button.addEventListener('click', adjustCartItemQuantity);
        });
        
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
        
        cartTotal.textContent = `UGX ${total.toLocaleString()}`;
    }

    // Adjust quantity of items in cart
    function adjustCartItemQuantity(e) {
        const productId = parseInt(e.target.dataset.id);
        const item = cart.find(item => item.id === productId);
        
        if (e.target.classList.contains('plus')) {
            item.quantity++;
        } else if (e.target.classList.contains('minus')) {
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                // Remove if quantity reaches 0
                cart = cart.filter(item => item.id !== productId);
            }
        }
        
        updateCart();
    }

    // Remove item from cart
    function removeFromCart(e) {
        const productId = parseInt(e.target.dataset.id);
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }

    // Proceed to WhatsApp checkout
    function proceedToCheckout() {
        if (cart.length === 0) return;
        
        const phoneNumber = "+256788401004";
        let message = "Hello Cheapware, I'd like to order the following items:\n\n";
        
        cart.forEach(item => {
            message += `- ${item.title} (${item.quantity} x UGX ${item.price.toLocaleString()})\n`;
        });
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\nTotal: UGX ${total.toLocaleString()}\n\nPlease let me know how to proceed with payment and delivery.`;
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
    }

    // Initialize the app
    init();
});
