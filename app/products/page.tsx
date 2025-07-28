import { Layout } from "@/components/layout/layout"
import { ProductsGrid } from "@/components/products/products-grid"

export default function ProductsPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Our Products</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our carefully curated collection of minimalist products designed to enhance your modern lifestyle
            with beauty and functionality.
          </p>
        </div>
        <ProductsGrid />
      </div>
    </Layout>
  )
}
