"use client"

import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { Layout } from "@/components/layout/layout"
import { Package, ArrowLeft, Search } from "lucide-react"

export default function ProductNotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 max-w-md mx-auto">
          {/* Product Not Found Illustration */}
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-destructive rounded-full flex items-center justify-center">
              <span className="text-destructive-foreground text-sm font-bold">!</span>
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Product Not Found</h1>
            <p className="text-muted-foreground">
              The product you're looking for doesn't exist or may have been removed from our catalog.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
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

          {/* Helpful Links */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Explore our categories:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/products?category=Electronics" className="text-sm text-primary hover:underline">
                Electronics
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/products?category=Clothing" className="text-sm text-primary hover:underline">
                Clothing
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/products?category=Home" className="text-sm text-primary hover:underline">
                Home
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/categories" className="text-sm text-primary hover:underline">
                All Categories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
