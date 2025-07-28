"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Layout } from "@/components/layout/layout"
import { Card, CardContent } from "@/components/ui/card"
import { CustomButton } from "@/components/ui/custom-button"
import { Badge } from "@/components/ui/badge"
import productsData from "@/data/products.json"

export default function CategoriesPage() {
  // Get categories with product counts and sample images
  const categories = useMemo(() => {
    const categoryMap = new Map()

    productsData.products.forEach((product) => {
      if (!categoryMap.has(product.category)) {
        categoryMap.set(product.category, {
          name: product.category,
          count: 0,
          products: [],
        })
      }
      const category = categoryMap.get(product.category)
      category.count++
      if (category.products.length < 3) {
        category.products.push(product)
      }
    })

    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count)
  }, [])

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Shop by Category</h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover our carefully curated collection organized by category. Find exactly what you're looking for.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                {/* Category Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <Badge variant="secondary">{category.count} items</Badge>
                </div>

                {/* Sample Products */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {category.products.map((product, index) => (
                    <div key={product.id} className="aspect-square relative overflow-hidden rounded-md">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                  {/* Fill empty slots if less than 3 products */}
                  {Array.from({ length: 3 - category.products.length }).map((_, index) => (
                    <div
                      key={`empty-${index}`}
                      className="aspect-square bg-muted rounded-md flex items-center justify-center"
                    >
                      <div className="w-8 h-8 bg-muted-foreground/20 rounded"></div>
                    </div>
                  ))}
                </div>

                {/* Browse Button */}
                <CustomButton asChild className="w-full">
                  <Link href={`/products?category=${encodeURIComponent(category.name)}`}>Browse {category.name}</Link>
                </CustomButton>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* All Products Link */}
        <div className="text-center mt-12">
          <CustomButton asChild variant="outline" size="lg">
            <Link href="/products">View All Products</Link>
          </CustomButton>
        </div>
      </div>
    </Layout>
  )
}
