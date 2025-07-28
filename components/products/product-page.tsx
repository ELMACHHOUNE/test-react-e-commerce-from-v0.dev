"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Minus, Plus } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
  rating: number
  reviews: number
}

interface ProductPageProps {
  product: Product
}

export function ProductPage({ product }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold font-serif">{product.name}</h1>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="text-3xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Separator />

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Badge variant={product.inStock ? "secondary" : "destructive"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <CustomButton variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                  <Minus className="h-4 w-4" />
                </CustomButton>
                <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                <CustomButton variant="ghost" size="icon" onClick={incrementQuantity}>
                  <Plus className="h-4 w-4" />
                </CustomButton>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <CustomButton onClick={handleAddToCart} disabled={!product.inStock} className="flex-1" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </CustomButton>

              <CustomButton
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
                className={inWishlist ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </CustomButton>
            </div>
          </div>

          <Separator />

          {/* Product Features */}
          <div className="space-y-2">
            <h3 className="font-semibold">Product Features:</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• High-quality materials</li>
              <li>• Fast shipping available</li>
              <li>• 30-day return policy</li>
              <li>• Customer support included</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
