"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

type Product = Omit<CartItem, "quantity">

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    setAdded(true)

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })

    // Reset the button after 2 seconds
    setTimeout(() => {
      setAdded(false)
    }, 2000)
  }

  return (
    <Button onClick={handleAddToCart} className="w-full sm:w-auto" disabled={added}>
      {added ? (
        <>
          <Check className="h-5 w-5 mr-2" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </>
      )}
    </Button>
  )
}

  
