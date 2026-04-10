"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import { CheckCircle, ShoppingBag, Home } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

export default function SuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8 flex justify-center"
        >
          <div className="rounded-full bg-green-100 p-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img src="/logo.png" alt="Estilo Vaquero" className="mx-auto mb-6 h-20 w-auto" />
          <h1 className="mb-3 font-serif text-4xl font-bold text-[#3d2c29]">
            ¡Pedido Confirmado!
          </h1>
          <p className="mb-2 text-lg text-[#3d2c29]/70">
            Gracias por tu compra en Estilo Vaquero.
          </p>
          <p className="mb-8 text-sm text-[#3d2c29]/50">
            Recibirás un correo de confirmación con los detalles de tu pedido.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a5a5] px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#c89b9b] hover:shadow-xl"
            >
              <ShoppingBag className="h-4 w-4" />
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#d4a5a5]/50 px-6 py-3 font-semibold text-[#3d2c29] transition-all hover:bg-[#d4a5a5]/10"
            >
              <Home className="h-4 w-4" />
              Inicio
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
