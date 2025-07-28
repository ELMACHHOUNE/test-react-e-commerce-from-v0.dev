"use client"
import Link from "next/link"
import Image from "next/image"
import { Layout } from "@/components/layout/layout"
import { CustomButton } from "@/components/ui/custom-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import productsData from "@/data/products.json"

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  inStock: boolean
  rating: number
  reviews: number
}

export default function CategoriesPage() {
  const products = productsData as Product[]

  // Get unique categories with product counts and sample images
  const categories = products.reduce(
    (acc, product) => {
      const category = product.category
      if (!acc[category]) {
        acc[category] = {
          name: category,
          count: 0,
          products: [],
        }
      }
      acc[category].count++
      if (acc[category].products.length < 3) {
        acc[category].products.push(product)
      }
      return acc
    },
    {} as Record<string, { name: string; count: number; products: Product[] }>,
  )

  const categoryList = Object.values(categories)

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Shop by Category</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated collection of minimalist products, organized by category to help you find
            exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryList.map((category) => (
            <Card key={category.name} className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold capitalize">{category.name}</h3>
                    <Badge variant="secondary">{category.count} items</Badge>
                  </div>

                  {/* Sample Product Images */}
                  <div className="grid grid-cols-3 gap-2 h-24">
                    {category.products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="relative overflow-hidden rounded-md bg-accent/10">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Sample Product Names */}
                  <div className="space-y-1">
                    {category.products.slice(0, 2).map((product) => (
                      <p key={product.id} className="text-sm text-muted-foreground truncate">
                        {product.name}
                      </p>
                    ))}
                    {category.count > 2 && (
                      <p className="text-sm text-muted-foreground">+{category.count - 2} more items</p>
                    )}
                  </div>

                  {/* Browse Button */}
                  <CustomButton asChild className="w-full">
                    <Link href={`/products?category=${encodeURIComponent(category.name)}`}>Browse {category.name}</Link>
                  </CustomButton>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Categories Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">Popular Categories</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categoryList.slice(0, 4).map((category) => (
              <CustomButton key={category.name} variant="outline" asChild>
                <Link href={`/products?category=${encodeURIComponent(category.name)}`}>
                  {category.name} ({category.count})
                </Link>
              </CustomButton>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
