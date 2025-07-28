"use client"

import { CustomButton } from "@/components/ui/custom-button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Layout } from "@/components/layout/layout"
import Link from "next/link"
import Image from "next/image"
import productsData from "@/data/products.json"

export default function CategoriesPage() {
  const products = (productsData as any).products || []

  // Get unique categories with product counts and sample images
  const categories = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = {
        name: product.category,
        count: 0,
        products: [],
      }
    }
    acc[product.category].count++
    if (acc[product.category].products.length < 3) {
      acc[product.category].products.push(product)
    }
    return acc
  }, {})

  const categoryList = Object.values(categories)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-serif mb-4">Shop by Category</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our carefully curated collection of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryList.map((category: any) => (
            <Card key={category.name} className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif">{category.name}</CardTitle>
                  <Badge variant="secondary">{category.count} products</Badge>
                </div>
                <CardDescription>Explore our {category.name.toLowerCase()} collection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Sample Product Images */}
                <div className="grid grid-cols-3 gap-2">
                  {category.products.map((product: any, index: number) => (
                    <div key={product.id} className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  ))}
                  {/* Fill remaining slots with placeholders if needed */}
                  {Array.from({ length: Math.max(0, 3 - category.products.length) }).map((_, index) => (
                    <div key={`placeholder-${index}`} className="aspect-square bg-gray-100 rounded-md" />
                  ))}
                </div>

                <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                  <CustomButton className="w-full">Browse {category.name}</CustomButton>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}
