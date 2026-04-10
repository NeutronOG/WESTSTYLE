import { products } from "@/data/products"
import ProductDetailClient from "./product-detail-client"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find(p => p.id === Number(id))
  return <ProductDetailClient product={product} />
}
