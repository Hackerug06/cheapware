"use client"

import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// 1. Import the cart context
import { useCart } from "@/components/cart-provider"

// Mock related products data
const getRelatedProducts = (category: string, currentProductId: number) => {
  const allProducts = [
    {
      id: 1,
      name: "Premium Smart Refrigerator",
      price: 1299.99,
      rating: 4.8,
      image: "/placeholder.svg?height=300&width=300&text=Smart+Refrigerator",
      category: "Refrigeration",
    },
    {
      id: 2,
      name: "Compact Refrigerator",
      price: 499.99,
      rating: 4.3,
      image: "/placeholder.svg?height=300&width=300&text=Compact+Refrigerator",
      category: "Refrigeration",
    },
    {
      id: 3,
      name: "Side-by-Side Refrigerator",
      price: 1099.99,
      rating: 4.6,
      image: "/placeholder.svg?height=300&width=300&text=Side+by+Side",
      category: "Refrigeration",
    },
    {
      id: 4,
      name: "French Door Refrigerator",
      price: 1499.99,
      rating: 4.9,
      image: "/placeholder.svg?height=300&width=300&text=French+Door",
      category: "Refrigeration",
    },
    {
      id: 5,
      name: "Wine Cooler",
      price: 399.99,
      rating: 4.2,
      image: "/placeholder.svg?height=300&width=300&text=Wine+Cooler",
      category: "Refrigeration",
    },
  ]

  return allProducts.filter((product) => product.category === category && product.id !== currentProductId).slice(0, 4)
}

export default function RelatedProducts({
  category,
  currentProductId,
}: { category: string; currentProductId: number }) {
  const relatedProducts = getRelatedProducts(category, currentProductId)

  // 2. In the RelatedProducts component, add the cart context:
  const { addToCart } = useCart()

  // Render star ratings
  const renderRating = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    return stars
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {relatedProducts.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <div className="relative h-48 w-full">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <div className="flex items-center mb-2">
              {renderRating(product.rating)}
              <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
            </div>
            <Link href={`/products/${product.id}`} className="hover:underline">
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
            </Link>
            <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            {/* 3. Replace the Button in the CardFooter with this working version: */}
            <Button
              className="w-full"
              onClick={() =>
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                })
              }
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

  
