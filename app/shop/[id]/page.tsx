import { products } from "@/data/products"
import ProductDetailClient from "./product-detail-client"

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === Number(params.id))
  
  return <ProductDetailClient product={product} />
}
