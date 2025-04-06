import { NextResponse } from "next/server"

// Mock database of products
const products = [
  {
    id: 1,
    name: "Premium Refrigerator",
    description: "Energy-efficient refrigerator with smart features",
    price: 899.99,
    image: "/placeholder.svg?height=300&width=300&text=Refrigerator",
    category: "Refrigeration",
    brand: "CoolTech",
    stock: 15,
    featured: true,
    rating: 4.5,
  },
  {
    id: 2,
    name: "Front Load Washing Machine",
    description: "High-efficiency washing machine with multiple wash programs",
    price: 649.99,
    image: "/placeholder.svg?height=300&width=300&text=Washing+Machine",
    category: "Laundry",
    brand: "CleanPro",
    stock: 8,
    featured: true,
    rating: 4.2,
  },
  {
    id: 3,
    name: "Smart Microwave Oven",
    description: "Microwave with smart sensors and multiple cooking modes",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300&text=Microwave",
    category: "Kitchen",
    brand: "SmartCook",
    stock: 20,
    featured: false,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Electric Kettle",
    description: "Fast-boiling electric kettle with auto shut-off",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300&text=Kettle",
    category: "Small Appliances",
    brand: "QuickBoil",
    stock: 30,
    featured: false,
    rating: 4.0,
  },
  {
    id: 5,
    name: "Dishwasher",
    description: "Energy-efficient dishwasher with multiple wash cycles",
    price: 549.99,
    image: "/placeholder.svg?height=300&width=300&text=Dishwasher",
    category: "Kitchen",
    brand: "CleanDish",
    stock: 12,
    featured: false,
    rating: 4.6,
  },
  {
    id: 6,
    name: "Air Conditioner",
    description: "Energy-efficient air conditioner with smart temperature control",
    price: 499.99,
    image: "/placeholder.svg?height=300&width=300&text=AC",
    category: "Climate Control",
    brand: "CoolAir",
    stock: 10,
    featured: false,
    rating: 4.3,
  },
]

// GET all products or filter by query parameters
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let filteredProducts = [...products]

  // Filter by category
  const category = searchParams.get("category")
  if (category) {
    filteredProducts = filteredProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  }

  // Filter by brand
  const brand = searchParams.get("brand")
  if (brand) {
    filteredProducts = filteredProducts.filter((product) => product.brand.toLowerCase() === brand.toLowerCase())
  }

  // Filter by price range
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  if (minPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseFloat(minPrice))
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseFloat(maxPrice))
  }

  // Filter by featured
  const featured = searchParams.get("featured")
  if (featured === "true") {
    filteredProducts = filteredProducts.filter((product) => product.featured)
  }

  // Search by name or description
  const search = searchParams.get("search")
  if (search) {
    const searchLower = search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
    )
  }

  // Get a specific product by ID
  const id = searchParams.get("id")
  if (id) {
    const product = products.find((p) => p.id === Number.parseInt(id))
    if (product) {
      return NextResponse.json(product)
    } else {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
  }

  return NextResponse.json(filteredProducts)
}

// POST to add a new product
export async function POST(request: Request) {
  try {
    const newProduct = await request.json()

    // Validate required fields
    if (!newProduct.name || !newProduct.price) {
      return NextResponse.json({ error: "Name and price are required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = Math.max(...products.map((p) => p.id)) + 1

    // Add the new product
    const productToAdd = {
      id: newId,
      ...newProduct,
      // Set defaults for optional fields
      stock: newProduct.stock || 0,
      featured: newProduct.featured || false,
      rating: newProduct.rating || 0,
    }

    products.push(productToAdd)

    return NextResponse.json(productToAdd, { status: 201 })
  } catch (error) {
    console.error("Failed to add product:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

    
