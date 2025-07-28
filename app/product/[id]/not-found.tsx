import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { Layout } from "@/components/layout/layout"
import { Home, ShoppingBag, Search } from "lucide-react"

export default function ProductNotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold font-serif mb-4">Product Not Found</h1>
            <p className="text-muted-foreground text-lg">
              We couldn't find the product you're looking for. It might have been removed, sold out, or the link might
              be incorrect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/products">
              <CustomButton className="w-full sm:w-auto">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse All Products
              </CustomButton>
            </Link>
            <Link href="/categories">
              <CustomButton variant="outline" className="w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Shop by Category
              </CustomButton>
            </Link>
            <Link href="/">
              <CustomButton variant="outline" className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </CustomButton>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Looking for something specific?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Let us know
              </Link>{" "}
              and we'll help you find it.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
