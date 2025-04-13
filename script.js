document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Search Functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-button');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
        }
    });
    
    closeSearch.addEventListener('click', function() {
        searchBar.classList.remove('active');
    });
    
    // Actual search functionality
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') return;
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.features.special.toLowerCase().includes(searchTerm)
        );
        
        displayProducts(filteredProducts);
        searchBar.classList.remove('active');
        searchInput.value = '';
    }
    
    // Cart System
    const cartModal = document.querySelector('.cart-modal');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-price');
    const cartCountElement = document.querySelector('.cart-count');
    const cartBtn = document.querySelector('.cart-btn');
    const closeCartBtn = document.querySelector('.close-cart');
    const whatsappCheckoutBtn = document.querySelector('.whatsapp-checkout');
    
    let cart = [];
    let cartCount = 0;
    
    // Initialize cart
    updateCartCount();
    
    // Cart toggle
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cartModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        renderCartItems();
    });
    
    closeCartBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    function updateCartCount() {
        cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = cartCount;
    }
    
    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        updateCartCount();
        renderCartItems();
    }
    
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCartCount();
        renderCartItems();
    }
    
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            cartTotal.textContent = '$0.00';
            whatsappCheckoutBtn.style.display = 'none';
            return;
        }
        
        whatsappCheckoutBtn.style.display = 'flex';
        
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity} = $${itemTotal.toFixed(2)}</div>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
        
        // Update WhatsApp link
        const itemsText = cart.map(item => 
            `- ${item.name} (${item.quantity} × $${item.price.toFixed(2)})`
        ).join('%0A');
        
        whatsappCheckoutBtn.href = `https://wa.me/256788401004?text=I%20want%20to%20purchase%20the%20following%20items:%0A%0A${itemsText}%0A%0ATotal:%20$${total.toFixed(2)}`;
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.cart-item-remove').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Product Data
    const products = [
        {
            id: 1,
            name: "FrostFree Refrigerator",
            category: "refrigerator",
            price: 899.99,
            oldPrice: 999.99,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "350L",
                energyRating: "A++",
                color: "Stainless Steel",
                warranty: "2 years",
                special: "Smart Inverter Technology"
            },
            badge: "Sale"
        },
        {
            id: 2,
            name: "EcoWash Washing Machine",
            category: "washing",
            price: 649.99,
            oldPrice: 749.99,
            rating: 4.2,
            image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "8kg",
                energyRating: "A+",
                color: "White",
                warranty: "3 years",
                special: "EcoBubble Technology"
            },
            badge: "Popular"
        },
        {
            id: 3,
            name: "QuickHeat Microwave",
            category: "microwave",
            price: 149.99,
            oldPrice: 179.99,
            rating: 4.0,
            image: "https://images.unsplash.com/photo-1618517351616-38e6b0b320cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "25L",
                power: "900W",
                color: "Black",
                warranty: "1 year",
                special: "10 Auto Cook Menus"
            }
        },
        {
            id: 4,
            name: "CoolBreeze Air Conditioner",
            category: "ac",
            price: 1199.99,
            oldPrice: 1299.99,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "1.5 Ton",
                energyRating: "A+++",
                type: "Split AC",
                warranty: "5 years",
                special: "Wi-Fi Enabled"
            },
            badge: "Best Seller"
        },
        {
            id: 5,
            name: "Double Door Refrigerator",
            category: "refrigerator",
            price: 1299.99,
            oldPrice: 1399.99,
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1593998053426-8e7a616ad5c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "500L",
                energyRating: "A++",
                color: "Black Stainless",
                warranty: "3 years",
                special: "Dual Cooling System"
            }
        },
        {
            id: 6,
            name: "Front Load Washing Machine",
            category: "washing",
            price: 799.99,
            oldPrice: 899.99,
            rating: 4.4,
            image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "10kg",
                energyRating: "A++",
                color: "Silver",
                warranty: "4 years",
                special: "Direct Drive Motor"
            }
        },
        {
            id: 7,
            name: "Convection Microwave",
            category: "microwave",
            price: 199.99,
            oldPrice: 229.99,
            rating: 4.1,
            image: "https://images.unsplash.com/photo-1618517351578-1148dfe67a6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "32L",
                power: "1000W",
                color: "Stainless Steel",
                warranty: "2 years",
                special: "Grill & Convection"
            },
            badge: "New"
        },
        {
            id: 8,
            name: "Window Air Conditioner",
            category: "ac",
            price: 599.99,
            oldPrice: 699.99,
            rating: 3.9,
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            features: {
                capacity: "1 Ton",
                energyRating: "A+",
                type: "Window AC",
                warranty: "2 years",
                special: "Auto Restart"
            }
        }
    ];
    
    // Display Products
    const productGrid = document.querySelector('.product-grid');
    const categoryFilter = document.getElementById('category-filter');
    const sortBy = document.getElementById('sort-by');
    const compareBar = document.querySelector('.compare-bar');
    const compareProductsCount = compareBar.querySelector('span');
    const compareBtn = document.querySelector('.compare-btn');
    const clearCompareBtn = document.querySelector('.clear-compare-btn');
    const comparisonModal = document.querySelector('.comparison-modal');
    const closeModal = document.querySelector('.close-modal');
    const comparisonTable = document.querySelector('.comparison-table');
    
    let selectedProducts = [];
    
    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = '';
        
        if (productsToDisplay.length === 0) {
            productGrid.innerHTML = '<p class="no-products">No products found matching your criteria.</p>';
            return;
        }
        
        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            
            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<div class="product-badge">${product.badge}</div>`;
            }
            
            const isSelected = selectedProducts.includes(product.id);
            
            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        $${product.price.toFixed(2)}
                        ${product.oldPrice ? `<del>$${product.oldPrice.toFixed(2)}</del>` : ''}
                    </div>
                    <div class="product-rating">
                        ${generateStarRating(product.rating)}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button class="add-to-compare ${isSelected ? 'selected' : ''}" data-id="${product.id}">
                            <i class="fas fa-exchange-alt"></i> Compare
                        </button>
                    </div>
                </div>
            `;
            
            productGrid.appendChild(productCard);
            
            // Add event listeners to the buttons
            productCard.querySelector('.add-to-cart').addEventListener('click', function(e) {
                addToCart(product.id);
                
                // Animation effect
                const button = e.target.closest('button');
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Added';
                button.style.backgroundColor = '#2ecc71';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.backgroundColor = '';
                }, 2000);
            });
            
            productCard.querySelector('.add-to-compare').addEventListener('click', toggleCompare);
        });
    }
    
    function generateStarRating(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }
        
        return stars;
    }
    
    function filterAndSortProducts() {
        const category = categoryFilter.value;
        const sortOption = sortBy.value;
        
        let filteredProducts = [...products];
        
        // Filter by category
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        
        // Sort products
        switch (sortOption) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            default:
                // Featured - keep original order
                break;
        }
        
        displayProducts(filteredProducts);
    }
    
    function toggleCompare(e) {
        const button = e.target.closest('button');
        const productId = parseInt(button.getAttribute('data-id'));
        
        if (selectedProducts.includes(productId)) {
            // Remove from comparison
            selectedProducts = selectedProducts.filter(id => id !== productId);
            button.classList.remove('selected');
        } else {
            // Add to comparison (max 4 products)
            if (selectedProducts.length < 4) {
                selectedProducts.push(productId);
                button.classList.add('selected');
            } else {
                alert('You can compare up to 4 products at a time.');
                return;
            }
        }
        
        // Update compare bar
        if (selectedProducts.length > 0) {
            compareBar.style.display = 'flex';
            compareProductsCount.textContent = selectedProducts.length;
            compareBtn.disabled = false;
        } else {
            compareBar.style.display = 'none';
            compareBtn.disabled = true;
        }
    }
    
    function showComparison() {
        if (selectedProducts.length < 2) {
            alert('Please select at least 2 products to compare.');
            return;
        }
        
        // Get selected products
        const productsToCompare = products.filter(product => selectedProducts.includes(product.id));
        
        // Create comparison table
        let tableHTML = `
            <thead>
                <tr>
                    <th>Feature</th>
                    ${productsToCompare.map(product => `<th>${product.name}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="comparison-feature">Image</td>
                    ${productsToCompare.map(product => `<td><img src="${product.image}" alt="${product.name}" style="width: 100px;"></td>`).join('')}
                </tr>
                <tr>
                    <td class="comparison-feature">Price</td>
                    ${productsToCompare.map(product => `<td>$${product.price.toFixed(2)}</td>`).join('')}
                </tr>
                <tr>
                    <td class="comparison-feature">Rating</td>
                    ${productsToCompare.map(product => `<td>${generateStarRating(product.rating)}</td>`).join('')}
                </tr>
        `;
        
        // Add product-specific features
        const features = Object.keys(productsToCompare[0].features);
        
        features.forEach(feature => {
            tableHTML += `
                <tr>
                    <td class="comparison-feature">${feature.charAt(0).toUpperCase() + feature.slice(1).replace(/([A-Z])/g, ' $1')}</td>
                    ${productsToCompare.map(product => `<td>${product.features[feature]}</td>`).join('')}
                </tr>
            `;
        });
        
        tableHTML += `</tbody>`;
        comparisonTable.innerHTML = tableHTML;
        
        // Show modal
        comparisonModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function clearComparison() {
        selectedProducts = [];
        compareBar.style.display = 'none';
        
        // Reset compare buttons
        document.querySelectorAll('.add-to-compare').forEach(button => {
            button.classList.remove('selected');
        });
        
        // Refresh products to reset the buttons
        filterAndSortProducts();
    }
    
    // Initialize - Display all products by default
    displayProducts(products);
    
    // Event Listeners
    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortBy.addEventListener('change', filterAndSortProducts);
    compareBtn.add
