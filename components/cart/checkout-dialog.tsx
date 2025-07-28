"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { CustomButton } from "@/components/ui/custom-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { MessageCircle, CreditCard, Truck } from "lucide-react"

interface CheckoutDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutDialog({ isOpen, onClose }: CheckoutDialogProps) {
  const { state, clearCart } = useCart()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  })

  const [deliveryMethod, setDeliveryMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("whatsapp")

  const deliveryOptions = [
    { id: "standard", label: "Standard Delivery", price: 5.99, time: "3-5 business days" },
    { id: "express", label: "Express Delivery", price: 12.99, time: "1-2 business days" },
    { id: "pickup", label: "Store Pickup", price: 0, time: "Available today" },
  ]

  const paymentOptions = [
    { id: "whatsapp", label: "WhatsApp Order", icon: MessageCircle, description: "Complete order via WhatsApp" },
    { id: "cod", label: "Cash on Delivery", icon: Truck, description: "Pay when you receive your order" },
    { id: "card", label: "Credit/Debit Card", icon: CreditCard, description: "Pay securely online" },
  ]

  const selectedDelivery = deliveryOptions.find((option) => option.id === deliveryMethod)
  const deliveryPrice = selectedDelivery?.price || 0
  const totalPrice = state.total + deliveryPrice

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ["name", "email", "phone", "address", "city"]
    return required.every((field) => customerInfo[field as keyof typeof customerInfo].trim() !== "")
  }

  const generateWhatsAppMessage = () => {
    const orderDetails = state.items
      .map((item) => `• ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    return `🛒 *New Order*

*Customer Information:*
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}

*Delivery Address:*
${customerInfo.address}
${customerInfo.city}, ${customerInfo.postalCode}

*Order Details:*
${orderDetails}

*Delivery:* ${selectedDelivery?.label} (+$${deliveryPrice.toFixed(2)})
*Total:* $${totalPrice.toFixed(2)}

*Payment Method:* ${paymentOptions.find((p) => p.id === paymentMethod)?.label}

Please confirm this order. Thank you!`
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (paymentMethod === "whatsapp") {
        const message = encodeURIComponent(generateWhatsAppMessage())
        const whatsappUrl = `https://wa.me/1234567890?text=${message}`
        window.open(whatsappUrl, "_blank")

        toast({
          title: "Order Sent!",
          description: "Your order has been sent via WhatsApp. We'll contact you soon!",
        })
      } else if (paymentMethod === "cod") {
        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        toast({
          title: "Order Placed!",
          description: "Your order has been placed. You'll pay on delivery.",
        })
      } else {
        // Simulate card payment processing
        await new Promise((resolve) => setTimeout(resolve, 3000))

        toast({
          title: "Payment Successful!",
          description: "Your order has been placed and payment processed.",
        })
      }

      clearCart()
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription>Complete your order details below</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={customerInfo.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Enter your city"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={customerInfo.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Enter your full address"
                rows={3}
              />
            </div>
            <div className="md:w-1/2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                value={customerInfo.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="Enter postal code"
              />
            </div>
          </div>

          <Separator />

          {/* Delivery Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Delivery Method</h3>
            <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
              {deliveryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 p-3 border border-accent/20 rounded-lg">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <div className="flex-1">
                    <Label htmlFor={option.id} className="font-medium">
                      {option.label}
                    </Label>
                    <p className="text-sm text-muted-foreground">{option.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">{option.price === 0 ? "Free" : `$${option.price.toFixed(2)}`}</span>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              {paymentOptions.map((option) => {
                const Icon = option.icon
                return (
                  <div key={option.id} className="flex items-center space-x-2 p-3 border border-accent/20 rounded-lg">
                    <RadioGroupItem value={option.id} id={option.id} />
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <Label htmlFor={option.id} className="font-medium">
                        {option.label}
                      </Label>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                )
              })}
            </RadioGroup>
          </div>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal ({state.itemCount} items)</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{deliveryPrice === 0 ? "Free" : `$${deliveryPrice.toFixed(2)}`}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <CustomButton className="w-full" size="lg" onClick={handleSubmit} disabled={isLoading}>
            {isLoading
              ? "Processing..."
              : paymentMethod === "whatsapp"
                ? "Send Order via WhatsApp"
                : paymentMethod === "cod"
                  ? "Place Order (COD)"
                  : "Pay Now"}
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}
