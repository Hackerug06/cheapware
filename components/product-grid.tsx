"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, StarHalf, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// 1. Update the addToCart function to properly use the cart context
import { useCart } from "@/components/cart-provider"

// Mock product data
const products = [
  {
    id: 1,
    name: "Premium Refrigerator",
    price: 899.99,
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300&text=Refrigerator",
    category: "Refrigeration",
    brand: "CoolTech",
  },
  {
    id: 2,
    name: "Front Load Washing Machine",
    price: 649.99,
    rating: 4.2,
    image: "/placeholder.svg?height=300&width=300&text=Washing+Machine",
    category: "Laundry",
    brand: "CleanPro",
  },
  {
    id: 3,
    name: "Smart Microwave Oven",
    price: 129.99,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300&text=Microwave",
    category: "Kitchen",
    brand: "SmartCook",
  },
  {
    id: 4,
    name: "Electric Kettle",
    price: 39.99,
    rating: 4.0,
    image: "/placeholder.svg?height=300&width=300&text=Kettle",
    category: "Small Appliances",
    brand: "QuickBoil",
  },
  {
    id: 5,
    name: "Dishwasher",
    price: 549.99,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=300&text=Dishwasher",
    category: "Kitchen",
    brand: "CleanDish",
  },
  {
    id: 6,
    name: "Air Conditioner",
    price: 499.99,
    rating: 4.3,
    image: "/placeholder.svg?height=300&width=300&text=AC",
    category: "Climate Control",
    brand: "CoolAir",
  },
]

export default function ProductGrid() {
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [filteredProducts, setFilteredProducts] = useState(products)

  // 2. In the ProductGrid component, add the cart context:
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
      stars.push(<StarHalf key="half-star" className="h-4 w-4 fill-yellow-400 text-yellow-400" />)
    }

    return stars
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <p className="text-gray-500">{filteredProducts.length} products</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 sm:w-auto w-full">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter Products</SheetTitle>
                <SheetDescription>Narrow down products based on your preferences</SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <Slider
                    defaultValue={[0, 1000]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    {["Kitchen", "Laundry", "Refrigeration", "Small Appliances", "Climate Control"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category}`} />
                        <Label htmlFor={`category-${category}`}>{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-4">Brands</h3>
                  <div className="space-y-2">
                    {["CoolTech", "CleanPro", "SmartCook", "QuickBoil", "CleanDish", "CoolAir"].map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox id={`brand-${brand}`} />
                        <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
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
              <p className="text-gray-500 text-sm mb-2">{product.brand}</p>
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
    </div>
  )
}

        
