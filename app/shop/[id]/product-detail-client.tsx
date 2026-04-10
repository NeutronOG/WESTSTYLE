"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart, Heart, ArrowLeft, Check, Star, Package, Shield, Truck } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/types/product"

interface ProductDetailClientProps {
  product: Product | undefined
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5ebe0]">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-[#3d2c29]">Producto no encontrado</h1>
          <button
            onClick={() => router.push("/shop")}
            className="mt-4 rounded-full bg-[#d4a5a5] px-6 py-2 text-white"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla")
      return
    }
    if (!selectedColor) {
      toast.error("Por favor selecciona un color")
      return
    }

    addToCart(product, selectedSize, selectedColor, quantity)
    toast.success("Producto añadido al carrito", {
      description: `${product.name} - Talla ${selectedSize}`,
    })
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] pb-32">
      <div className="fixed top-12 right-12 text-5xl text-[#3d2c29] opacity-20 pointer-events-none">✦</div>
      <div className="fixed bottom-24 left-16 text-4xl text-[#3d2c29] opacity-25 pointer-events-none">✦</div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-[#3d2c29] transition-colors hover:text-[#d4a5a5]"
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Volver</span>
        </motion.button>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-8">
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.button
                  className="absolute right-8 top-8 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-colors hover:bg-[#d4a5a5] hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? "fill-current text-[#d4a5a5]" : ""}`} />
                </motion.button>

                {product.featured && (
                  <div className="absolute left-0 top-8 bg-[#d4a5a5] px-6 py-2 font-bold text-white">
                    DESTACADO
                  </div>
                )}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-4 text-center backdrop-blur-sm">
                  <Package className="mx-auto mb-2 h-6 w-6 text-[#d4a5a5]" />
                  <p className="text-xs font-semibold text-[#3d2c29]">Envío Gratis</p>
                </div>
                <div className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-4 text-center backdrop-blur-sm">
                  <Shield className="mx-auto mb-2 h-6 w-6 text-[#d4a5a5]" />
                  <p className="text-xs font-semibold text-[#3d2c29]">Garantía</p>
                </div>
                <div className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-4 text-center backdrop-blur-sm">
                  <Truck className="mx-auto mb-2 h-6 w-6 text-[#d4a5a5]" />
                  <p className="text-xs font-semibold text-[#3d2c29]">3-5 Días</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="mb-2 inline-block rounded-full bg-[#d4a5a5]/20 px-4 py-1 text-sm font-semibold text-[#d4a5a5]">
                {product.category}
              </div>
              <h1 className="font-serif text-4xl font-bold text-[#3d2c29] sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#d4a5a5] text-[#d4a5a5]" />
                  ))}
                </div>
                <span className="text-sm text-[#3d2c29]/60">(128 reseñas)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl font-bold text-[#d4a5a5]">
                ${product.price}
              </span>
              <span className="text-lg text-[#3d2c29]/50">USD</span>
            </div>

            <p className="text-lg leading-relaxed text-[#3d2c29]/80">
              {product.description}
            </p>

            <div className="space-y-4 rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/40 p-6 backdrop-blur-sm">
              <div>
                <label className="mb-3 block font-serif text-lg font-semibold text-[#3d2c29]">
                  Talla
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative h-12 w-12 rounded-full border-2 font-semibold transition-all ${
                        selectedSize === size
                          ? "border-[#d4a5a5] bg-[#d4a5a5] text-white shadow-lg"
                          : "border-[#d4a5a5]/40 bg-white text-[#3d2c29] hover:border-[#d4a5a5]"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                      {selectedSize === size && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3d2c29]"
                        >
                          <Check className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block font-serif text-lg font-semibold text-[#3d2c29]">
                  Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border-2 px-6 py-2 font-medium transition-all ${
                        selectedColor === color
                          ? "border-[#d4a5a5] bg-[#d4a5a5] text-white shadow-lg"
                          : "border-[#d4a5a5]/40 bg-white text-[#3d2c29] hover:border-[#d4a5a5]"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-3 block font-serif text-lg font-semibold text-[#3d2c29]">
                  Cantidad
                </label>
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d4a5a5]/40 bg-white text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -
                  </motion.button>
                  <span className="w-12 text-center font-serif text-2xl font-bold text-[#3d2c29]">
                    {quantity}
                  </span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#d4a5a5]/40 bg-white text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    +
                  </motion.button>
                </div>
              </div>
            </div>

            <motion.button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#d4a5a5] py-4 font-serif text-lg font-bold text-white shadow-xl transition-all hover:bg-[#3d2c29] hover:shadow-2xl"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="h-6 w-6" />
              Añadir al Carrito
            </motion.button>

            <div className="space-y-4 rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/40 p-6 backdrop-blur-sm">
              <h3 className="font-serif text-xl font-bold text-[#3d2c29]">Detalles del Producto</h3>
              <div className="space-y-2 text-[#3d2c29]/80">
                <p><strong>Material:</strong> {product.material}</p>
                <p><strong>Cuidado:</strong> {product.care}</p>
                <p><strong>Disponibilidad:</strong> {product.inStock ? "En stock" : "Agotado"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
