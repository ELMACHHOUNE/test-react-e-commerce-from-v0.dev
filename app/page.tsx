"use client"

import { Layout } from "@/components/layout/layout"
import { ProductsGrid } from "@/components/products/products-grid"
import { CustomButton } from "@/components/ui/custom-button"
import { ArrowRight, Truck, Shield, RotateCcw, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Minimalist
                <span className="text-primary block">Design</span>
                for Modern Living
              </h1>
              <p className="text-lg text-muted-foreground max-w-md">
                Discover our curated collection of beautiful, functional products that embody the essence of minimalist
                design.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CustomButton size="lg" asChild>
                  <Link href="/products">
                    Shop Collection
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </CustomButton>
                <CustomButton variant="outline" size="lg" asChild>
                  <Link href="/about">Learn More</Link>
                </CustomButton>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Minimalist living space"
                width={600}
                height={600}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Free Shipping</h3>
              <p className="text-muted-foreground">Free shipping on all orders over $50. Fast and reliable delivery.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Quality Guarantee</h3>
              <p className="text-muted-foreground">2-year warranty on all products. Quality you can trust.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <RotateCcw className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Easy Returns</h3>
              <p className="text-muted-foreground">30-day return policy. Not satisfied? Return it hassle-free.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked items that represent the best of minimalist design and functionality.
            </p>
          </div>
          <ProductsGrid />
          <div className="text-center mt-12">
            <CustomButton size="lg" asChild>
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </CustomButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-accent/20 rounded-lg p-6 space-y-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "The quality is outstanding and the design is exactly what I was looking for. Perfect for my minimalist
                home."
              </p>
              <div className="font-semibold">- Sarah Johnson</div>
            </div>
            <div className="bg-card border border-accent/20 rounded-lg p-6 space-y-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "Fast shipping and excellent customer service. The products exceeded my expectations."
              </p>
              <div className="font-semibold">- Michael Chen</div>
            </div>
            <div className="bg-card border border-accent/20 rounded-lg p-6 space-y-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "Love the minimalist aesthetic. These pieces have transformed my living space."
              </p>
              <div className="font-semibold">- Emma Davis</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
