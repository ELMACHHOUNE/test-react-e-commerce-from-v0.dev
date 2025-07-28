"use client"

import { useState, useEffect, useMemo } from "react"
import { ProductCard } from "@/components/ui/product-card"
import { CustomButton } from "@/components/ui/custom-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Filter } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
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

interface ProductsGridProps {
  searchQuery?: string
  category?: string
  itemsPerPage?: number
}

export function ProductsGrid({ searchQuery = "", category = "", itemsPerPage = 8 }: ProductsGridProps) {
  const [products] = useState<Product[]>(productsData.products)
  const [sortBy, setSortBy] = useState("name")
  const [filterBy, setFilterBy] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const { addToCart } = useCart()

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, category, sortBy, filterBy])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter((product) => product.category === category)
    }

    // Filter by availability
    if (filterBy === "in-stock") {
      filtered = filtered.filter((product) => product.inStock)
    } else if (filterBy === "out-of-stock") {
      filtered = filtered.filter((product) => !product.inStock)
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviews - a.reviews
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    return filtered
  }, [products, searchQuery, category, sortBy, filterBy])

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex)

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const clearFilters = () => {
    setFilterBy("all")
    setSortBy("name")
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Products</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Count and Results Info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedProducts.length)} of{" "}
          {filteredAndSortedProducts.length} products
          {currentPage > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </span>
        {(searchQuery || category || filterBy !== "all" || sortBy !== "name") && (
          <CustomButton variant="ghost" size="sm" onClick={clearFilters}>
            Clear all filters
          </CustomButton>
        )}
      </div>

      {/* Products Grid */}
      {currentProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
          <CustomButton variant="outline" onClick={clearFilters}>
            Clear Filters
          </CustomButton>
        </div>
      )}
    </div>
  )
}
