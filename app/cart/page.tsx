"use client"

import { motion, AnimatePresence } from "motion/react"
import { useCart } from "@/contexts/cart-context"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ShoppingBag className="mx-auto mb-6 h-24 w-24 text-[#d4a5a5]/50" />
          </motion.div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-[#3d2c29]">
            Tu carrito está vacío
          </h1>
          <p className="mb-8 text-lg text-[#3d2c29]/70">
            Descubre nuestra colección de sombreros artesanales
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4a5a5] px-8 py-4 font-semibold text-white transition-all hover:bg-[#3d2c29]"
          >
            Ir a la tienda
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] pb-32">
      <div className="fixed top-12 left-12 text-4xl text-[#3d2c29] opacity-25 pointer-events-none">✦</div>
      <div className="fixed top-20 right-20 text-3xl text-[#3d2c29] opacity-20 pointer-events-none">✦</div>
      <div className="fixed bottom-24 left-24 text-3xl text-[#3d2c29] opacity-30 pointer-events-none">✦</div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-5xl font-bold text-[#3d2c29]">
            TU CARRITO
          </h1>
          <p className="mt-4 text-lg text-[#3d2c29]/70">
            {totalItems} {totalItems === 1 ? "artículo" : "artículos"} en tu carrito
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="mb-4 overflow-hidden rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 backdrop-blur-sm"
                >
                  <div className="flex gap-6 p-6">
                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#faf3ed] to-[#e8ddd0]">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-serif text-xl font-bold text-[#3d2c29]">
                              {item.product.name}
                            </h3>
                            <p className="mt-1 text-sm text-[#3d2c29]/60">
                              {item.product.category}
                            </p>
                          </div>
                          <motion.button
                            onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                            className="text-[#3d2c29]/50 transition-colors hover:text-red-500"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="h-5 w-5" />
                          </motion.button>
                        </div>

                        <div className="mt-3 flex gap-4 text-sm text-[#3d2c29]/70">
                          <span>Talla: <strong>{item.size}</strong></span>
                          <span>Color: <strong>{item.color}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#d4a5a5]/40 bg-white text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Minus className="h-4 w-4" />
                          </motion.button>
                          <span className="w-8 text-center font-semibold text-[#3d2c29]">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#d4a5a5]/40 bg-white text-[#3d2c29] transition-all hover:border-[#d4a5a5] hover:bg-[#d4a5a5]/20"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Plus className="h-4 w-4" />
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="font-serif text-2xl font-bold text-[#d4a5a5]">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#3d2c29]">
                Resumen
              </h2>

              <div className="space-y-4 border-b border-[#d4a5a5]/30 pb-6">
                <div className="flex justify-between text-[#3d2c29]/70">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#3d2c29]/70">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-[#3d2c29]/70">
                  <span>Impuestos</span>
                  <span>${(totalPrice * 0.16).toFixed(2)}</span>
                </div>
              </div>

              <div className="my-6 flex justify-between">
                <span className="font-serif text-xl font-bold text-[#3d2c29]">Total</span>
                <span className="font-serif text-3xl font-bold text-[#d4a5a5]">
                  ${(totalPrice * 1.16).toFixed(2)}
                </span>
              </div>

              <motion.button
                onClick={() => router.push("/checkout")}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#d4a5a5] py-4 font-serif text-lg font-bold text-white shadow-xl transition-all hover:bg-[#3d2c29]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceder al pago
                <ArrowRight className="h-5 w-5" />
              </motion.button>

              <Link
                href="/shop"
                className="block text-center text-sm text-[#3d2c29]/70 transition-colors hover:text-[#d4a5a5]"
              >
                Continuar comprando
              </Link>

              <div className="mt-8 space-y-3 rounded-xl bg-[#d4a5a5]/10 p-4">
                <p className="text-xs font-semibold text-[#3d2c29]">✓ Envío gratis en todos los pedidos</p>
                <p className="text-xs font-semibold text-[#3d2c29]">✓ Garantía de satisfacción</p>
                <p className="text-xs font-semibold text-[#3d2c29]">✓ Devoluciones en 30 días</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
