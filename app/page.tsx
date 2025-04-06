import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"
import dynamic from "next/dynamic"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
// 2. Use dynamic import with no SSR for the ProductGrid to ensure client-side rendering
const ProductGrid = dynamic(() => import("@/components/product-grid"), { ssr: false })
const FeaturedProducts = dynamic(() => import("@/components/featured-products"), { ssr: false })
import SearchSkeleton from "@/components/search-skeleton"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Modern kitchen with appliances"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Quality Appliances at Affordable Prices</h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Discover our wide range of home appliances that combine quality, performance, and value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/20">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="relative max-w-2xl mx-auto">
            <Suspense fallback={<SearchSkeleton />}>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input type="search" placeholder="Search for appliances..." className="pl-10 h-12 w-full" />
              </div>
            </Suspense>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Appliances</h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Kitchen", "Laundry", "Refrigeration", "Small Appliances"].map((category) => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="h-40 relative">
                  <Image
                    src={`/placeholder.svg?height=160&width=300&text=${category}`}
                    alt={category}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
          <ProductGrid />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah J.",
                text: "The refrigerator I purchased works perfectly and was delivered on time. Great service!",
              },
              {
                name: "Michael T.",
                text: "Cheapware offers the best prices in town. I saved a lot on my new washing machine.",
              },
              {
                name: "Rebecca L.",
                text: "The customer service is excellent. They helped me choose the perfect microwave for my kitchen.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <p className="mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Home?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Browse our collection of quality home appliances at affordable prices.
          </p>
          <Button asChild size="lg" className="bg-white text-gray-800 hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

