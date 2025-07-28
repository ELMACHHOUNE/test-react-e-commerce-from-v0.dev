"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Layout } from "@/components/layout/layout"
import { ProductsGrid } from "@/components/products/products-grid"
import { CustomButton } from "@/components/ui/custom-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import productsData from "@/data/products.json"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState("")

  // Get URL parameters
  useEffect(() => {
    const category = searchParams.get("category") || ""
    const query = searchParams.get("q") || ""

    setSelectedCategory(category)
    setSearchQuery(query)
  }, [searchParams])

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...productsData.products]

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortBy) {
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "rating":
          aValue = a.rating
          bValue = b.rating
          break
        case "category":
          aValue = a.category.toLowerCase()
          bValue = b.category.toLowerCase()
          break
        case "name":
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy, sortOrder])

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(productsData.products.map((product) => product.category)))
  }, [])

  const clearFilters = () => {
    setSelectedCategory("")
    setSearchQuery("")
    window.history.pushState({}, "", "/products")
  }

  const hasActiveFilters = selectedCategory || searchQuery

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedCategory
                ? `${selectedCategory} Products`
                : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2 flex-1">
            {/* Category Filter */}
            <Select
              value={selectedCategory || "all"}
              onValueChange={(value) => setSelectedCategory(value === "all" ? "" : value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2">
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("")} />
                  </Badge>
                )}
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1">
                    "{searchQuery}"
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                  </Badge>
                )}
                <CustomButton variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </CustomButton>
              </div>
            )}
          </div>

          {/* Sorting */}
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">A-Z / Low-High</SelectItem>
                <SelectItem value="desc">Z-A / High-Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <ProductsGrid products={filteredAndSortedProducts} />
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                <X className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? `No products match "${searchQuery}"`
                  : selectedCategory
                    ? `No products found in ${selectedCategory} category`
                    : "No products available"}
              </p>
            </div>
            <CustomButton onClick={clearFilters}>Clear Filters</CustomButton>
          </div>
        )}
      </div>
    </Layout>
  )
}
