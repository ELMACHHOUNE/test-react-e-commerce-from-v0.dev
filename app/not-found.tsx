import Link from "next/link"
import { CustomButton } from "@/components/ui/custom-button"
import { Layout } from "@/components/layout/layout"
import { Home, Search, ShoppingBag } from "lucide-react"

export default function NotFound() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>
            <h2 className="text-3xl font-bold font-serif mb-4">Page Not Found</h2>
            <p className="text-muted-foreground text-lg">
              Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
              wrong URL.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/">
              <CustomButton className="w-full sm:w-auto">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </CustomButton>
            </Link>
            <Link href="/products">
              <CustomButton variant="outline" className="w-full sm:w-auto">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Browse Products
              </CustomButton>
            </Link>
            <Link href="/categories">
              <CustomButton variant="outline" className="w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                View Categories
              </CustomButton>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Need help?{" "}
              <Link href="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
