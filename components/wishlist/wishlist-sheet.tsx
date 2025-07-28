"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { CustomButton } from "@/components/ui/custom-button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function WishlistSheet() {
  const { state, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleAddToCart = (product: any) => {
    addToCart(product)
    removeFromWishlist(product.id)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <CustomButton variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {state.items.length > 0 && (
            <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{state.items.length}</Badge>
          )}
        </CustomButton>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>
            {state.items.length === 0
              ? "Your wishlist is empty"
              : `${state.items.length} item${state.items.length > 1 ? "s" : ""} in your wishlist`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Your wishlist is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-auto py-4">
                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border border-accent/20 rounded-lg">
                      <div className="relative h-16 w-16 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                        <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <CustomButton
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.inStock}
                          className="text-xs"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </CustomButton>

                        <CustomButton
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                          className="text-xs text-destructive hover:text-destructive"
                        >
                          <Heart className="h-3 w-3 mr-1" />
                          Remove
                        </CustomButton>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <CustomButton variant="outline" onClick={clearWishlist} className="w-full">
                  Clear Wishlist
                </CustomButton>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
