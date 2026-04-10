"use client"

import { useState, useEffect } from "react"
import { motion } from "motion/react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useLanguage } from "@/contexts/language-context"
import { CreditCard, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { createOrder } from "@/lib/orders"

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const { user, loading: authLoading } = useAuth()
  const { locale, formatPrice } = useLanguage()
  const router = useRouter()
  const t = (es: string, en: string) => locale === "en" ? en : es

  const [isProcessing, setIsProcessing] = useState(false)
  const [orderError, setOrderError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postalCode: "", country: "México"
  })

  // Redirigir si no autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirect=/checkout")
    }
  }, [user, authLoading, router])

  // Pre-llenar email del usuario loggeado
  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email! }))
    }
  }, [user])

  // Redirigir al shop si el carrito está vacío
  useEffect(() => {
    if (!authLoading && items.length === 0) {
      router.push("/shop")
    }
  }, [items, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setOrderError(null)

    try {
      const shippingCost = formData.country === "México" ? 400 : 2000

      // Guardar orden en Supabase (no bloqueante si falla)
      createOrder({
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
      }).catch(() => {})  // No bloquear si Supabase falla

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(item => ({
            product_name: item.product.name,
            quantity: item.quantity,
            price: item.product.price,
            color: item.color,
            size: item.size,
            image: item.product.image,
            stripe_price_id: item.product.stripePriceId,
          })),
          customerEmail: formData.email,
          shippingCountry: formData.country,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al crear sesión de pago")

      window.location.href = data.url
    } catch (err) {
      setOrderError(err instanceof Error ? err.message : "Hubo un error al procesar tu pedido. Intenta de nuevo.")
      setIsProcessing(false)
    }
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0]">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 rounded-full border-4 border-[#d4a5a5] border-t-transparent" />
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
          <h1 className="font-serif text-5xl font-bold text-[#3d2c29]">{t("CHECKOUT", "CHECKOUT")}</h1>
          <p className="mt-4 flex items-center justify-center gap-2 text-[#3d2c29]/70">
            <Lock className="h-4 w-4" />
            {t("Pago seguro y encriptado", "Secure encrypted payment")}
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
                  {t("Información de Contacto", "Contact Information")}
                </h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("Nombre", "First name")}</label>
                      <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("Apellido", "Last name")}</label>
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
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("Teléfono", "Phone")}</label>
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
                  {t("Dirección de Envío", "Shipping Address")}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("Dirección", "Address")}</label>
                    <input type="text" name="address" required value={formData.address} onChange={handleChange}
                      className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("Ciudad", "City")}</label>
                      <input type="text" name="city" required value={formData.city} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("Código Postal", "Zip Code")}</label>
                      <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange}
                        className="w-full rounded-xl border-2 border-[#d4a5a5]/30 bg-white px-4 py-3 text-[#3d2c29] transition-all focus:border-[#d4a5a5] focus:outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[#3d2c29]">{t("País", "Country")}</label>
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
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#d4a5a5]" />
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#3d2c29]">Pago Seguro con Stripe</h2>
                    <p className="text-sm text-[#3d2c29]/60">Serás redirigido a la pasarela de pago segura de Stripe para completar tu compra.</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  {["visa", "mastercard", "amex"].map(card => (
                    <span key={card} className="rounded-lg border border-[#d4a5a5]/30 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3d2c29]/60">{card}</span>
                  ))}
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
                    {t("Procesando...", "Processing...")}
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    {t("Pagar con Stripe", "Pay with Stripe")}
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
                {t("Resumen del Pedido", "Order Summary")}
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
                      <p className="font-bold text-[#d4a5a5]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-[#d4a5a5]/30 pt-6">
                <div className="flex justify-between text-[#3d2c29]/70">
                  <span>{t("Subtotal", "Subtotal")}</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[#3d2c29]/70">
                  <span>{t("Envío", "Shipping")}</span>
                  <span>{formData.country === "México" ? formatPrice(400) : formatPrice(2000)}</span>
                </div>
                <div className="flex justify-between border-t border-[#d4a5a5]/30 pt-3">
                  <span className="font-serif text-xl font-bold text-[#3d2c29]">Total</span>
                  <span className="font-serif text-2xl font-bold text-[#d4a5a5]">
                    {formatPrice(totalPrice + (formData.country === "México" ? 400 : 2000))}
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
