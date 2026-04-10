"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { ShoppingCart, Heart, ArrowLeft, Check, Star, Package, Shield, Truck, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "sonner"
import type { Product } from "@/types/product"
import Link from "next/link"

interface ProductDetailClientProps {
  product: Product | undefined
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { locale, formatPrice } = useLanguage()
  const t = (es: string, en: string) => locale === "en" ? en : es

  const [selectedSize, setSelectedSize] = useState(() =>
    product?.sizes?.length === 1 ? product.sizes[0] : ""
  )
  const [selectedColor, setSelectedColor] = useState(() =>
    product?.colors?.length === 1 ? product.colors[0] : ""
  )
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5ebe0]">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-[#3d2c29]">{t("Producto no encontrado", "Product not found")}</h1>
          <Link href="/shop" className="mt-6 inline-block rounded-full bg-[#d4a5a5] px-8 py-3 font-bold text-white hover:bg-[#3d2c29] transition-colors">
            {t("Volver a la tienda", "Back to shop")}
          </Link>
        </div>
      </div>
    )
  }

  const images = product.images?.length ? product.images : [product.image]
  const description = locale === "en" && product.descriptionEn ? product.descriptionEn : product.description
  const care = locale === "en" && product.careEn ? product.careEn : product.care

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error(t("Por favor selecciona una talla", "Please select a size"))
      return
    }
    if (!selectedColor) {
      toast.error(t("Por favor selecciona un color", "Please select a color"))
      return
    }
    addToCart(product, selectedSize, selectedColor, quantity)
    toast.success(t("Producto añadido al carrito", "Added to cart"), {
      description: `${product.name} · ${selectedColor}`,
    })
  }

  const prevImg = () => setActiveImg(i => (i - 1 + images.length) % images.length)
  const nextImg = () => setActiveImg(i => (i + 1) % images.length)

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] pb-32">
      <div className="fixed top-12 right-12 text-5xl text-[#3d2c29] opacity-20 pointer-events-none select-none">✦</div>
      <div className="fixed bottom-24 left-16 text-4xl text-[#3d2c29] opacity-25 pointer-events-none select-none">✦</div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-10 flex items-center gap-2 text-[#3d2c29]/70 transition-colors hover:text-[#d4a5a5]"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">{t("Volver", "Back")}</span>
        </motion.button>

        <div className="grid gap-14 lg:grid-cols-2">

          {/* ── LEFT: Image gallery ── */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="sticky top-8 space-y-4">

              {/* Main image */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 backdrop-blur-sm aspect-square flex items-center justify-center p-8">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImg}
                    src={images[activeImg]}
                    alt={product.name}
                    className="h-full w-full object-contain"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Fav button */}
                <motion.button
                  className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition-colors ${isFavorite ? "text-[#d4a5a5]" : "text-[#3d2c29]/40 hover:text-[#d4a5a5]"}`}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
                </motion.button>

                {/* Featured badge */}
                {product.featured && (
                  <div className="absolute left-0 top-6 rounded-r-full bg-[#d4a5a5] px-5 py-1.5 text-sm font-bold text-white shadow">
                    {t("DESTACADO", "FEATURED")}
                  </div>
                )}

                {/* Prev/Next if multiple images */}
                {images.length > 1 && (
                  <>
                    <button onClick={prevImg} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-all">
                      <ChevronLeft className="h-5 w-5 text-[#3d2c29]" />
                    </button>
                    <button onClick={nextImg} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition-all">
                      <ChevronRight className="h-5 w-5 text-[#3d2c29]" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <motion.button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-white/60 transition-all ${activeImg === i ? "border-[#d4a5a5] shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      <img src={img} alt="" className="h-full w-full object-contain p-1" />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Package, label: t("Envío seguro", "Safe shipping") },
                  { icon: Shield, label: t("Garantía", "Warranty") },
                  { icon: Truck, label: t("3–5 días", "3–5 days") },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-4 text-center backdrop-blur-sm">
                    <Icon className="mx-auto mb-1.5 h-5 w-5 text-[#d4a5a5]" />
                    <p className="text-xs font-semibold text-[#3d2c29]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT: Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            {/* Category + Name */}
            <div>
              <span className="inline-block rounded-full bg-[#d4a5a5]/20 px-4 py-1 text-sm font-semibold text-[#d4a5a5] mb-3">
                {product.category}
              </span>
              <h1 className="font-serif text-4xl font-bold text-[#3d2c29] sm:text-5xl leading-tight">
                {product.name}
              </h1>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#d4a5a5] text-[#d4a5a5]" />
                  ))}
                </div>
                <span className="text-sm text-[#3d2c29]/50">128 {t("reseñas", "reviews")}</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-5xl font-bold text-[#d4a5a5]">
                {formatPrice(product.price)}
              </span>
              {!product.inStock && (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                  {t("Agotado", "Out of stock")}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-[#3d2c29]/75">{description}</p>

            {/* Selectors */}
            <div className="space-y-5 rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/40 p-6 backdrop-blur-sm">

              {/* Size */}
              <div>
                <label className="mb-3 block font-serif text-base font-semibold text-[#3d2c29]">
                  {t("Talla", "Size")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`relative min-w-[3rem] rounded-full border-2 px-4 py-2 text-sm font-semibold transition-all ${
                        selectedSize === size
                          ? "border-[#d4a5a5] bg-[#d4a5a5] text-white shadow-md"
                          : "border-[#d4a5a5]/40 bg-white text-[#3d2c29] hover:border-[#d4a5a5]"
                      }`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      {size}
                      {selectedSize === size && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#3d2c29]">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </motion.span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="mb-3 block font-serif text-base font-semibold text-[#3d2c29]">
                  {t("Color", "Color")}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border-2 px-5 py-2 text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-[#d4a5a5] bg-[#d4a5a5] text-white shadow-md"
                          : "border-[#d4a5a5]/40 bg-white text-[#3d2c29] hover:border-[#d4a5a5]"
                      }`}
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="mb-3 block font-serif text-base font-semibold text-[#3d2c29]">
                  {t("Cantidad", "Quantity")}
                </label>
                <div className="flex items-center gap-4">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d4a5a5]/40 bg-white text-xl text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/10"
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  >−</motion.button>
                  <span className="w-10 text-center font-serif text-2xl font-bold text-[#3d2c29]">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#d4a5a5]/40 bg-white text-xl text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/10"
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  >+</motion.button>
                </div>
              </div>
            </div>

            {/* Add to cart */}
            <motion.button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#d4a5a5] py-4 font-serif text-lg font-bold text-white shadow-xl transition-all hover:bg-[#3d2c29] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: product.inStock ? 1.02 : 1 }}
              whileTap={{ scale: product.inStock ? 0.98 : 1 }}
            >
              <ShoppingCart className="h-6 w-6" />
              {product.inStock ? t("Añadir al Carrito", "Add to Cart") : t("Agotado", "Out of Stock")}
            </motion.button>

            {/* Product details */}
            <div className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/40 p-6 backdrop-blur-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-[#3d2c29]">{t("Detalles del Producto", "Product Details")}</h3>
              <div className="space-y-2 text-sm text-[#3d2c29]/75">
                {product.material && (
                  <p><strong>{t("Material", "Material")}:</strong> {product.material}</p>
                )}
                {care && (
                  <p><strong>{t("Cuidado", "Care")}:</strong> {care}</p>
                )}
                <p>
                  <strong>{t("Disponibilidad", "Availability")}:</strong>{" "}
                  <span className={product.inStock ? "text-green-600" : "text-red-500"}>
                    {product.inStock ? t("En stock", "In stock") : t("Agotado", "Out of stock")}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
