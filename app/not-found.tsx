"use client"

import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-3xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

        <div className="pt-8 border-t border-accent/20">
          <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
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
