export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  featured: boolean
  material?: string
  care?: string
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
  color: string
}
