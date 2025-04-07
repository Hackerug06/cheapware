export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <header className="w-full max-w-6xl mx-auto py-4 px-4 flex justify-between items-center border-b mb-8">
        <h1 className="text-2xl font-bold">Cheapware</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="/" className="font-medium">
            Home
          </a>
          <a href="/products" className="text-gray-600 hover:text-gray-900">
            Products
          </a>
          <a href="/categories" className="text-gray-600 hover:text-gray-900">
            Categories
          </a>
          <a href="/about" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          <a href="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="p-2">🔍</button>
          <button className="p-2">🛒</button>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="relative h-[400px] bg-gray-800 rounded-lg mb-12 flex items-center justify-center">
          <div className="text-center text-white p-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Quality Appliances at Affordable Prices</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover our wide range of home appliances that combine quality, performance, and value.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/products" className="bg-white text-gray-900 px-6 py-3 rounded-md font-medium hover:bg-gray-100">
                Shop Now
              </a>
              <a
                href="/categories"
                className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Smart Refrigerator", price: 1299.99, discount: "15% OFF" },
              { name: "Deluxe Washing Machine", price: 799.99, discount: "10% OFF" },
              { name: "Premium Dishwasher", price: 649.99, discount: "20% OFF" },
            ].map((product, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 relative">
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    {product.discount}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {"★★★★★".split("").map((star, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">(5.0)</span>
                  </div>
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                </div>
                <div className="p-4 pt-0">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 bg-gray-50 rounded-lg mb-12">
          <div className="px-4">
            <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Kitchen", "Laundry", "Refrigeration", "Small Appliances"].map((category) => (
                <a
                  key={category}
                  href={`/categories/${category.toLowerCase()}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
                >
                  <div className="h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">{category}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{category}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { name: "Premium Refrigerator", price: 899.99 },
              { name: "Front Load Washing Machine", price: 649.99 },
              { name: "Smart Microwave Oven", price: 129.99 },
              { name: "Electric Kettle", price: 39.99 },
              { name: "Dishwasher", price: 549.99 },
              { name: "Air Conditioner", price: 499.99 },
              { name: "Coffee Maker", price: 89.99 },
              { name: "Toaster", price: 29.99 },
            ].map((product, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">{product.name}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {"★★★★☆".split("").map((star, i) => (
                        <span key={i} className="text-yellow-400">
                          {star}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-1">(4.0)</span>
                  </div>
                  <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
                </div>
                <div className="p-4 pt-0">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full bg-gray-900 text-gray-300 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Cheapware</h3>
              <p className="mb-4">
                Quality home appliances at affordable prices. We provide the best products for your home.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/products" className="hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="/categories" className="hover:text-white">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="/deals" className="hover:text-white">
                    Special Deals
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">📍 123 Appliance Street, City</li>
                <li className="flex items-center gap-2">📞 +1 234 567 8900</li>
                <li className="flex items-center gap-2">✉️ info@cheapware.com</li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
              <p className="mb-4">Subscribe to our newsletter for the latest products and special offers.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md flex-grow"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Cheapware. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

            
