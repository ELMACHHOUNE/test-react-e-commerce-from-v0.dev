import { Layout } from "@/components/layout/layout"
import { ProductPage } from "@/components/products/product-page"
import productsData from "@/data/products.json"
import { notFound } from "next/navigation"

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = productsData.products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <Layout>
      <ProductPage product={product} />
    </Layout>
  )
}
