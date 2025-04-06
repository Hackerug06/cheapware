"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useMobile } from "@/hooks/use-mobile"
import { useCart } from "@/components/cart-provider"

// Mock featured products
const featuredProducts = [
  {
    id: 1,
    name: "Smart Refrigerator",
    description: "Energy-efficient smart refrigerator with touchscreen and Wi-Fi connectivity",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300&text=Smart+Refrigerator",
    discount: "15% OFF",
  },
  {
    id: 2,
    name: "Deluxe Washing Machine",
    description: "High-capacity washing machine with multiple wash programs and steam function",
    price: 799.99,
    image: "/placeholder.svg?height=300&width=300&text=Washing+Machine",
    discount: "10% OFF",
  },
  {
    id: 3,
    name: "Premium Dishwasher",
    description: "Ultra-quiet dishwasher with smart sensors and efficient water usage",
    price: 649.99,
    image: "/placeholder.svg?height=300&width=300&text=Dishwasher",
    discount: "20% OFF",
  },
  {
    id: 4,
    name: "Smart Oven",
    description: "Multi-function smart oven with voice control and precision cooking",
    price: 449.99,
    image: "/placeholder.svg?height=300&width=300&text=Smart+Oven",
    discount: "5% OFF",
  },
]

export default function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMobile = useMobile()
  const { addToCart } = useCart()

  const itemsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(featuredProducts.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === totalPages - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalPages - 1 : prevIndex - 1))
  }

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  const visibleProducts = featuredProducts.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage,
  )

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
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
              {product.discount && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                  {product.discount}
                </div>
              )}
            </div>
            <CardContent className="p-4">
              <Link href={`/products/${product.id}`} className="hover:underline">
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              </Link>
              <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500 ml-1">(5.0)</span>
              </div>
              <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
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

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full mx-1 ${currentIndex === index ? "bg-gray-800" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}

