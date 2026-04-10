"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Filter, SlidersHorizontal, Search, X } from "lucide-react"

const categories = ["Todos", "20X Lana Boliviana", "Texanas Finas", "Tombstone", "Accesorios"]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] pb-32">
      <div className="fixed top-8 left-8 text-4xl text-[#3d2c29] opacity-30 pointer-events-none">✦</div>
      <div className="fixed top-16 right-16 text-3xl text-[#3d2c29] opacity-25 pointer-events-none">✦</div>
      <div className="fixed bottom-24 left-16 text-2xl text-[#3d2c29] opacity-20 pointer-events-none">✦</div>
      <div className="fixed bottom-32 right-24 text-3xl text-[#3d2c29] opacity-35 pointer-events-none">✦</div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <img src="/logo.png" alt="Estilo Vaquero" className="h-24 w-auto" />
          </motion.div>
          <h1 className="font-serif text-5xl font-bold tracking-wider text-[#3d2c29] sm:text-6xl">
            COLECCIÓN
          </h1>
          <p className="mt-4 text-lg text-[#3d2c29]/70">
            Descubre nuestra exclusiva selección de sombreros artesanales
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-8 flex flex-col gap-4"
        >
          {/* Buscador y filtros en una fila responsive */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Buscador con lupa */}
            <div className="relative flex-1 max-w-md">
              <div className={`flex items-center gap-2 rounded-full border-2 border-[#d4a5a5]/40 bg-[#faf3ed]/60 backdrop-blur-sm transition-all ${isSearchOpen ? 'ring-2 ring-[#d4a5a5]/50' : ''}`}>
                <Search className="ml-4 h-5 w-5 text-[#d4a5a5]" />
                <input
                  type="text"
                  placeholder="Buscar sombrero..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={() => setIsSearchOpen(false)}
                  className="w-full bg-transparent px-2 py-3 text-[#3d2c29] placeholder-[#3d2c29]/50 outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="mr-2 rounded-full p-1 hover:bg-[#d4a5a5]/20"
                  >
                    <X className="h-4 w-4 text-[#3d2c29]/60" />
                  </button>
                )}
              </div>
            </div>

            {/* Botón filtros */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-[#d4a5a5]/40 bg-[#faf3ed]/60 px-6 py-3 text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/20 md:w-auto w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filtros</span>
            </motion.button>
          </div>

          {/* Categorías - scroll horizontal en móvil */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-visible">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all md:px-6 md:text-base ${
                  selectedCategory === category
                    ? "bg-[#d4a5a5] text-white shadow-lg"
                    : "border-2 border-[#d4a5a5]/40 bg-[#faf3ed]/60 text-[#3d2c29] hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/20"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 overflow-hidden rounded-2xl border-2 border-[#d4a5a5]/40 bg-[#faf3ed]/80 p-6 backdrop-blur-sm"
            >
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="mb-3 font-serif text-lg font-semibold text-[#3d2c29]">Precio</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[#3d2c29]/70">
                      <input type="checkbox" className="rounded border-[#d4a5a5]" />
                      Menos de $80
                    </label>
                    <label className="flex items-center gap-2 text-[#3d2c29]/70">
                      <input type="checkbox" className="rounded border-[#d4a5a5]" />
                      $80 - $100
                    </label>
                    <label className="flex items-center gap-2 text-[#3d2c29]/70">
                      <input type="checkbox" className="rounded border-[#d4a5a5]" />
                      Más de $100
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-lg font-semibold text-[#3d2c29]">Material</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[#3d2c29]/70">
                      <input type="checkbox" className="rounded border-[#d4a5a5]" />
                      Fieltro de lana
                    </label>
                    <label className="flex items-center gap-2 text-[#3d2c29]/70">
                      <input type="checkbox" className="rounded border-[#d4a5a5]" />
                      Paja
                    </label>
                  </div>
                </div>
                <div>
                  <h3 className="mb-3 font-serif text-lg font-semibold text-[#3d2c29]">Disponibilidad</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-[#3d2c29]/70">
                      <input type="checkbox" className="rounded border-[#d4a5a5]" defaultChecked />
                      En stock
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <Filter className="mx-auto mb-4 h-16 w-16 text-[#d4a5a5]/50" />
            <p className="text-xl text-[#3d2c29]/70">
              {searchQuery 
                ? `No se encontraron resultados para "${searchQuery}"` 
                : "No se encontraron productos en esta categoría"}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 rounded-full bg-[#d4a5a5] px-6 py-2 text-white hover:bg-[#c89b9b]"
              >
                Limpiar búsqueda
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
