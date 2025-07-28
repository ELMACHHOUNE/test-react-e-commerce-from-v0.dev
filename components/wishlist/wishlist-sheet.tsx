"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Trash2, ShoppingCart } from "lucide-react"
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
  }

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <CustomButton variant="ghost" size="icon" className="relative">
          <Heart className="h-5 w-5" />
          {state.itemCount > 0 && (
            <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{state.itemCount}</Badge>
          )}
        </CustomButton>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>
            {state.itemCount === 0
              ? "Your wishlist is empty"
              : `${state.itemCount} item${state.itemCount > 1 ? "s" : ""} in your wishlist`}
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
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        <Badge variant={item.inStock ? "secondary" : "destructive"} className="text-xs mt-1">
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>

                        <div className="flex items-center space-x-2 mt-2">
                          <CustomButton
                            variant="outline"
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                            disabled={!item.inStock}
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </CustomButton>

                          <CustomButton
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </CustomButton>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <CustomButton variant="outline" className="w-full" onClick={clearWishlist}>
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
