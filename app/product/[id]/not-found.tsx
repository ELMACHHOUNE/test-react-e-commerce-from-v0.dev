"use client"

import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { ShoppingBag, ArrowLeft, Search } from "lucide-react"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-4">
          <div className="mx-auto w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-primary/50" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Product Not Found</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            The product you're looking for doesn't exist or has been removed from our catalog.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <CustomButton asChild>
            <Link href="/products">
              <Search className="h-4 w-4 mr-2" />
              Browse Products
            </Link>
          </CustomButton>
          <CustomButton variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </CustomButton>
        </div>

        <div className="pt-8 border-t border-accent/20">
          <p className="text-sm text-muted-foreground mb-4">Explore our categories:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/products?category=furniture" className="text-sm text-primary hover:underline">
              Furniture
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/products?category=lighting" className="text-sm text-primary hover:underline">
              Lighting
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/products?category=decor" className="text-sm text-primary hover:underline">
              Decor
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/products?category=textiles" className="text-sm text-primary hover:underline">
              Textiles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
