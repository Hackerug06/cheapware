document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    // Search Bar Toggle
    const searchBtn = document.querySelector('.search-btn');
    const searchBar = document.querySelector('.search-bar');
    const closeSearch = document.querySelector('.close-search');
    
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchBar.classList.add('active');
    });
    
    closeSearch.addEventListener('click', function() {
        searchBar.classList.remove('active');
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            navbar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
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
    let cartCount = 0;
    
    function displayProducts(productsToDisplay) {
        productGrid.innerHTML = '';
        
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
        });
        
        // Add event listeners to the new buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
        
        document.querySelectorAll('.add-to-compare').forEach(button => {
            button.addEventListener('click', toggleCompare);
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
    
    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cartCount++;
        document.querySelector('.cart-count').textContent = cartCount;
        
        // Animation effect
        const button = e.target;
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        button.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Cart';
            button.style.backgroundColor = '';
        }, 2000);
    }
    
    function toggleCompare(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const button = e.target;
        
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
    
    // Initialize
    displayProducts(products);
    
    // Event Listeners
    categoryFilter.addEventListener('change', filterAndSortProducts);
    sortBy.addEventListener('change', filterAndSortProducts);
    compareBtn.addEventListener('click', showComparison);
    clearCompareBtn.addEventListener('click', clearComparison);
    closeModal.addEventListener('click', function() {
        comparisonModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === comparisonModal) {
            comparisonModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // WhatsApp Integration
    const whatsappBtn = document.querySelector('.whatsapp-float');
    whatsappBtn.addEventListener('click', function(e) {
        // This will open WhatsApp with your number as specified in the HTML
    });
    
    // Add WhatsApp click handler for "Add to Cart" buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') {
            const productId = e.target.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            
            // In a real implementation, you would add to cart and then
            // the checkout button would link to WhatsApp with order details
        }
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
});
