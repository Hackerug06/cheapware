import { NextResponse } from "next/server"

// This is a reference to the same products array from the main products route
// In a real app, you would use a database instead
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
  // ... other products
]

// GET a specific product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  const product = products.find((p) => p.id === id)

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  return NextResponse.json(product)
}

// PUT to update a product
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const updates = await request.json()

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Update the product
    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      id, // Ensure ID doesn't change
    }

    return NextResponse.json(products[productIndex])
  } catch (error) {
    console.error(`Failed to update product ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE a product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)

  const productIndex = products.findIndex((p) => p.id === id)

  if (productIndex === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }

  // Remove the product
  products.splice(productIndex, 1)

  return new Response(null, { status: 204 })
}

  
