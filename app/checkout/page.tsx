"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useCart } from "@/contexts/cart-context"
import { CreditCard, Lock, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { createOrder } from "@/lib/orders"

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", country: "México"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setOrderError(null)

    try {
      const shippingCost = formData.country === "México" ? 400 : 2000
      await createOrder({
        customer_name: `${formData.firstName} ${formData.lastName}`,
        customer_email: formData.email,
        customer_phone: formData.phone,
        items: items.map(item => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          color: item.color,
          size: item.size,
        })),
        total: totalPrice + shippingCost,
        shipping_address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        shipping_country: formData.country,
        shipping_cost: shippingCost,
      })

      setIsComplete(true)
      setTimeout(() => {
        clearCart()
        router.push("/shop")
      }, 3000)
    } catch (err) {
      setOrderError("Hubo un error al procesar tu pedido. Intenta de nuevo.")
    } finally {
      setIsProcessing(false)
    }
  }

  if (isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="mx-auto mb-6 h-24 w-24 text-green-500" />
          </motion.div>
          <h1 className="mb-4 font-serif text-4xl font-bold text-[#3d2c29]">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-lg text-[#3d2c29]/70">
            Gracias por tu compra. Recibirás un email de confirmación pronto.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] pb-32">
      <div className="fixed top-12 right-12 text-4xl text-[#3d2c29] opacity-25 pointer-events-none">✦</div>
      <div className="fixed bottom-24 left-16 text-3xl text-[#3d2c29] opacity-20 pointer-events-none">✦</div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-5xl font-bold text-[#3d2c29]">CHECKOUT</h1>
          <p className="mt-4 flex items-center justify-center gap-2 text-[#3d2c29]/70">
            <Lock className="h-4 w-4" />
            Pago seguro y encriptado
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm"
              >
                <h2 className="mb-6 font-serif text-2xl font-bold text-[#3d2c29]">
                  Información de Contacto
                </h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Nombre</label>
                      <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Apellido</label>
                      <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Teléfono</label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                      className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm"
              >
                <h2 className="mb-6 font-serif text-2xl font-bold text-[#3d2c29]">
                  Dirección de Envío
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Dirección</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange}
                      className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Ciudad</label>
                      <input type="text" name="city" required value={formData.city} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">Código Postal</label>
                      <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">País</label>
                    <select name="country" value={formData.country} onChange={handleChange}
                      className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none">
                      <option value="México">México — Envío $400</option>
                      <option value="Estados Unidos">Estados Unidos — Envío $2,000</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm"
              >
                <h2 className="mb-6 flex items-center gap-2 font-serif text-2xl font-bold text-[#3d2c29]">
                  <CreditCard className="h-6 w-6" />
                  Información de Pago
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="1234 5678 9012 3456"
                      className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">
                        Fecha de Expiración
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {orderError && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  {orderError}
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isProcessing}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d4a5a5] py-4 font-serif text-lg font-bold text-white shadow-xl transition-all hover:bg-[#3d2c29] disabled:opacity-50"
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
                    />
                    Procesando...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Confirmar Pedido
                  </>
                )}
              </motion.button>
            </form>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-8 rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm">
              <h2 className="mb-6 font-serif text-2xl font-bold text-[#3d2c29]">
                Resumen del Pedido
              </h2>

              <div className="mb-6 space-y-4">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-[#faf3ed] to-[#e8ddd0]">
                      <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#3d2c29]">{item.product.name}</p>
                      <p className="text-sm text-[#3d2c29]/60">
                        {item.size} • {item.color} • x{item.quantity}
                      </p>
                      <p className="font-bold text-[#d4a5a5]">${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-[#d4a5a5]/30 pt-6">
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
                <div className="flex justify-between border-t border-[#d4a5a5]/30 pt-3">
                  <span className="font-serif text-xl font-bold text-[#3d2c29]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#d4a5a5]">
                    ${(totalPrice * 1.16).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
