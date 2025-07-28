"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { CustomButton } from "@/components/ui/custom-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { MessageCircle, CreditCard, Banknote } from "lucide-react"

interface CheckoutDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutDialog({ isOpen, onClose }: CheckoutDialogProps) {
  const { state, clearCart } = useCart()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("whatsapp")

  const deliveryOptions = {
    standard: { name: "Standard Delivery", price: 5.99, time: "3-5 business days" },
    express: { name: "Express Delivery", price: 12.99, time: "1-2 business days" },
    pickup: { name: "Store Pickup", price: 0, time: "Available today" },
  }

  const deliveryPrice = deliveryOptions[deliveryMethod as keyof typeof deliveryOptions].price
  const totalWithDelivery = state.total + deliveryPrice

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!customerInfo.name || !customerInfo.phone) {
      alert("Please fill in required fields (Name and Phone)")
      return
    }

    if (paymentMethod === "whatsapp") {
      // Generate WhatsApp message
      const orderDetails = state.items
        .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
        .join("\n")

      const message = `🛒 *New Order*

*Customer Information:*
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Email: ${customerInfo.email || "Not provided"}

*Delivery Address:*
${customerInfo.address || "Not provided"}

*Order Details:*
${orderDetails}

*Delivery:* ${deliveryOptions[deliveryMethod as keyof typeof deliveryOptions].name} (+$${deliveryPrice.toFixed(2)})

*Total: $${totalWithDelivery.toFixed(2)}*

*Payment Method:* WhatsApp Payment

${customerInfo.notes ? `*Notes:* ${customerInfo.notes}` : ""}

Please confirm this order and send payment instructions. Thank you!`

      // Open WhatsApp with the message
      const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")

      // Clear cart and close dialog
      clearCart()
      onClose()
    } else {
      // Handle other payment methods
      alert(`Order submitted with ${paymentMethod} payment method!`)
      clearCart()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Complete your order details below</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                  placeholder="Enter your full delivery address"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Delivery Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Delivery Method</h3>
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
              {Object.entries(deliveryOptions).map(([key, option]) => (
                <div key={key} className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value={key} id={key} />
                  <Label htmlFor={key} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-muted-foreground">{option.time}</p>
                      </div>
                      <p className="font-medium">${option.price.toFixed(2)}</p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="whatsapp" id="whatsapp" />
                <Label htmlFor="whatsapp" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">WhatsApp Payment</p>
                      <p className="text-sm text-muted-foreground">Complete payment via WhatsApp</p>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Banknote className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                    </div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Order Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Order Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={customerInfo.notes}
              onChange={(e) => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
              placeholder="Any special instructions for your order..."
            />
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery:</span>
                <span>${deliveryPrice.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totalWithDelivery.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex space-x-2">
            <CustomButton type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </CustomButton>
            <CustomButton type="submit" className="flex-1">
              {paymentMethod === "whatsapp" ? "Continue with WhatsApp" : "Place Order"}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
