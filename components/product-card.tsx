"use client"

import { motion, AnimatePresence } from "motion/react"
import { ShoppingCart, Eye, Heart } from "lucide-react"
import Link from "next/link"
import type { Product } from "@/types/product"
import { useState } from "react"

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 backdrop-blur-sm transition-all duration-500 hover:border-[#d4a5a5] hover:shadow-2xl">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-[#faf3ed] to-[#e8ddd0]">
          <motion.img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          />
          
          <motion.button
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:bg-[#d4a5a5] hover:text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-[#d4a5a5]" : ""}`} />
          </motion.button>

          {product.featured && (
            <motion.div
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              className="absolute left-0 top-4 bg-[#d4a5a5] px-4 py-1 text-xs font-bold text-white"
            >
              DESTACADO
            </motion.div>
          )}

          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-x-0 bottom-0 flex gap-2 p-4"
              >
                <Link
                  href={`/shop/${product.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-white/95 py-3 font-semibold text-[#3d2c29] backdrop-blur-sm transition-all hover:bg-[#d4a5a5] hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                  Ver
                </Link>
                <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#d4a5a5] py-3 font-semibold text-white transition-all hover:bg-[#3d2c29]">
                  <ShoppingCart className="h-4 w-4" />
                  Añadir
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-[#3d2c29] transition-colors group-hover:text-[#d4a5a5]">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-[#3d2c29]/60">{product.category}</p>
            </div>
          </div>

          <p className="mb-4 line-clamp-2 text-sm text-[#3d2c29]/70">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-serif text-2xl font-bold text-[#d4a5a5]">
                ${product.price}
              </span>
              <span className="ml-1 text-sm text-[#3d2c29]/50">USD</span>
            </div>
            
            <div className="flex gap-1">
              {product.colors.slice(0, 3).map((color, i) => (
                <motion.div
                  key={i}
                  className="h-6 w-6 rounded-full border-2 border-white shadow-sm"
                  style={{
                    backgroundColor: color === "Negro" ? "#000" :
                                   color === "Beige" || color === "Crema" ? "#f5deb3" :
                                   color === "Camel" || color === "Marrón Claro" ? "#c19a6b" :
                                   color === "Natural" ? "#f5f5dc" :
                                   color === "Marrón" || color === "Chocolate" ? "#8b4513" : "#ddd"
                  }}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>

          {product.inStock ? (
            <div className="mt-4 flex items-center gap-2 text-xs text-green-600">
              <div className="h-2 w-2 rounded-full bg-green-600" />
              En stock
            </div>
          ) : (
            <div className="mt-4 flex items-center gap-2 text-xs text-red-600">
              <div className="h-2 w-2 rounded-full bg-red-600" />
              Agotado
            </div>
          )}
        </div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: "radial-gradient(circle at center, rgba(212, 165, 165, 0.1) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  )
}
