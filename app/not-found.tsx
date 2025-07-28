"use client"

import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-9xl font-bold text-muted-foreground/20 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="h-16 w-16 text-muted-foreground/40" />
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <CustomButton asChild>
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </CustomButton>
          <CustomButton variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </CustomButton>
        </div>

        {/* Helpful Links */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">You might be looking for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/products" className="text-sm text-primary hover:underline">
              Products
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/categories" className="text-sm text-primary hover:underline">
              Categories
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/about" className="text-sm text-primary hover:underline">
              About
            </Link>
            <span className="text-muted-foreground">•</span>
            <Link href="/contact" className="text-sm text-primary hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
