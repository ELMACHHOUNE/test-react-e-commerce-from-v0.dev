"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { CustomButton } from "@/components/ui/custom-button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { CheckoutDialog } from "./checkout-dialog"

export function CartSheet() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const handleCheckout = () => {
    setIsOpen(false)
    setShowCheckout(true)
  }

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <CustomButton variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {state.itemCount > 0 && (
              <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{state.itemCount}</Badge>
            )}
          </CustomButton>
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              {state.itemCount === 0
                ? "Your cart is empty"
                : `${state.itemCount} item${state.itemCount > 1 ? "s" : ""} in your cart`}
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col h-full">
            {state.items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty</p>
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

                          <div className="flex items-center space-x-2 mt-2">
                            <CustomButton
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </CustomButton>

                            <span className="w-8 text-center text-sm">{item.quantity}</span>

                            <CustomButton
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </CustomButton>

                            <CustomButton
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </CustomButton>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold">${state.total.toFixed(2)}</span>
                  </div>

                  <div className="space-y-2">
                    <CustomButton className="w-full" size="lg" onClick={handleCheckout}>
                      Checkout
                    </CustomButton>

                    <CustomButton variant="outline" className="w-full" onClick={clearCart}>
                      Clear Cart
                    </CustomButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <CheckoutDialog isOpen={showCheckout} onClose={() => setShowCheckout(false)} />
    </>
  )
}
