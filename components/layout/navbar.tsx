"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart, User, Heart } from "lucide-react"
import { CustomButton } from "@/components/ui/custom-button"
import { SearchForm } from "@/components/ui/search-form"
import { Badge } from "@/components/ui/badge"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3) // This would come from your cart state

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
    // Implement search functionality
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-accent/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
            <span className="text-xl font-bold text-primary">Minimalist</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-foreground hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <CustomButton variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </CustomButton>
            <CustomButton variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{cartCount}</Badge>
              )}
            </CustomButton>
            <CustomButton variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <CustomButton variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </CustomButton>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-accent/20 py-4">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <SearchForm onSearch={handleSearch} />

              {/* Mobile Navigation Links */}
              <Link
                href="/"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/categories"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-accent/20">
                <CustomButton variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </CustomButton>
                <CustomButton variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 text-xs">{cartCount}</Badge>
                  )}
                </CustomButton>
                <CustomButton variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </CustomButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
