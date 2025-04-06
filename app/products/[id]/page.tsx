import Image from "next/image"
import Link from "next/link"
import { Star, Truck, Shield, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductReviews from "@/components/product-reviews"
import dynamic from "next/dynamic"
const AddToCartButton = dynamic(() => import("@/components/add-to-cart-button"), { ssr: false })
import RelatedProducts from "@/components/related-products"

// Mock product data - in a real app, this would come from an API
const getProductById = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Premium Smart Refrigerator",
    description:
      "Energy-efficient smart refrigerator with touchscreen and Wi-Fi connectivity. Features include temperature control via smartphone app, internal cameras to view contents remotely, and voice assistant compatibility.",
    price: 1299.99,
    rating: 4.8,
    reviewCount: 124,
    images: [
      "/placeholder.svg?height=600&width=600&text=Refrigerator+Front",
      "/placeholder.svg?height=600&width=600&text=Refrigerator+Side",
      "/placeholder.svg?height=600&width=600&text=Refrigerator+Inside",
      "/placeholder.svg?height=600&width=600&text=Refrigerator+Features",
    ],
    brand: "CoolTech",
    category: "Refrigeration",
    features: [
      "Smart temperature control via app",
      "Internal cameras for remote viewing",
      "Voice assistant compatible",
      "Energy Star certified",
      "Fingerprint-resistant stainless steel",
      "Dual ice maker",
      "Adjustable shelving",
    ],
    specifications: {
      Dimensions: '36" W x 70" H x 31" D',
      Capacity: "26.8 cubic feet",
      Color: "Stainless Steel",
      "Energy Rating": "Energy Star Certified",
      Warranty: "2 Years Parts & Labor",
      Weight: "320 lbs",
      Connectivity: "Wi-Fi, Bluetooth",
    },
    stock: 15,
    discount: "15% OFF",
    originalPrice: 1529.99,
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/products" className="flex items-center text-gray-500 hover:text-gray-700 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] w-full border rounded-lg overflow-hidden">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
            {product.discount && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {product.discount}
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="relative h-24 border rounded-md overflow-hidden cursor-pointer hover:border-primary"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-6">
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="mb-6">
            <div className="flex items-center text-green-600 mb-2">
              <Truck className="h-5 w-5 mr-2" />
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-blue-600">
              <Shield className="h-5 w-5 mr-2" />
              <span>2-year warranty included</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Availability:</h3>
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <AddToCartButton product={product} />
            <Button variant="outline">Add to Wishlist</Button>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Brand: {product.brand}</span>
              <span>Category: {product.category}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-medium mb-4">Product Features</h3>
          <ul className="list-disc pl-5 space-y-2">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="specifications" className="p-4 border rounded-md mt-2">
          <h3 className="text-xl font-medium mb-4">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <span className="font-medium">{key}:</span> {value}
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="p-4 border rounded-md mt-2">
          <ProductReviews productId={product.id} />
        </TabsContent>
      </Tabs>

      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <RelatedProducts category={product.category} currentProductId={product.id} />
      </div>
    </div>
  )
}

  
