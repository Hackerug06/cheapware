// This file contains all API functions for fetching and managing products

// Product type definition
export type Product = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  brand: string
  stock: number
  featured?: boolean
  discount?: string
  originalPrice?: number
  rating?: number
}

// Base URL for API calls - change this to your actual API endpoint when ready
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com"

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`)

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return mock data if API fails
    return getMockProducts()
  }
}

// Get a single product by ID
export async function getProductById(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error)
    // Return mock product if API fails
    return getMockProductById(id)
  }
}

// Get featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products?featured=true`)

    if (!response.ok) {
      throw new Error(`Failed to fetch featured products: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching featured products:", error)
    // Return mock featured products if API fails
    return getMockProducts().filter((p) => p.featured)
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products?category=${encodeURIComponent(category)}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch products by category: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error)
    // Return mock products filtered by category if API fails
    return getMockProducts().filter((p) => p.category.toLowerCase() === category.toLowerCase())
  }
}

// Create a new product (admin only)
export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error(`Failed to create product: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

// Update an existing product (admin only)
export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error(`Failed to update product: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error updating product ${id}:`, error)
    throw error
  }
}

// Delete a product (admin only)
export async function deleteProduct(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Failed to delete product: ${response.status}`)
    }
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error)
    throw error
  }
}

// Mock data for fallback when API is not available
function getMockProducts(): Product[] {
  return [
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
      rating: 4.7,
    },
    {
      id: 4,
      name: "Electric Kettle",
      price: 39.99,
      description: "Fast-boiling electric kettle with auto shut-off",
      image: "/placeholder.svg?height=300&width=300&text=Kettle",
      category: "Small Appliances",
      brand: "QuickBoil",
      stock: 30,
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
      rating: 4.3,
    },
  ]
}

function getMockProductById(id: number): Product | null {
  const products = getMockProducts()
  const product = products.find((p) => p.id === id)

  if (!product) {
    return null
  }

  // For product details, add more information
  if (id === 1) {
    return {
      ...product,
      description:
        "Energy-efficient smart refrigerator with touchscreen and Wi-Fi connectivity. Features include temperature control via smartphone app, internal cameras to view contents remotely, and voice assistant compatibility.",
      originalPrice: 1099.99,
      discount: "18% OFF",
      rating: 4.8,
    }
  }

  return product
}

  
