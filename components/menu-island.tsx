"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react"
import { Home, ShoppingBag, ShoppingCart, Info, X, Mail } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHatCowboy } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/cart-context"

const WHATSAPP_NUMBER = "5214778155183"
const WHATSAPP_MESSAGE = "Hola! Me interesa conocer más sobre sus sombreros 🎩"
const EMAIL = "stylewestern0@gmail.com"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const CowboyHatIcon = () => <FontAwesomeIcon icon={faHatCowboy} className="h-5 w-5" />

const menuItems = [
  { icon: Home, label: "Inicio", href: "/", emoji: "🏠" },
  { icon: CowboyHatIcon, label: "Galería", href: "/gallery", emoji: "🎨" },
  { icon: ShoppingBag, label: "Tienda", href: "/shop", emoji: "🛍️" },
  { icon: Info, label: "Acerca", href: "/about", emoji: "✨" },
]

export function MenuIsland() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()
  const { totalItems } = useCart()

  useEffect(() => {
    const isHome = pathname === "/"
    if (!isHome) {
      setIsVisible(true)
      return
    }
    setIsVisible(false)
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      setIsVisible(scrollY > windowHeight * 0.6)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [pathname])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-20, 20], [5, -5]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-20, 20], [-5, 5]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      style={{ perspective: 1000, pointerEvents: isVisible ? "auto" : "none" }}
    >
      <motion.div 
        className="relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="relative flex items-center gap-1 rounded-[2rem] border-2 border-[#d4a5a5]/50 bg-gradient-to-b from-[#faf3ed] to-[#f5ebe0] p-2 shadow-[0_20px_60px_-15px_rgba(212,165,165,0.5)] backdrop-blur-xl"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-[#d4a5a5]/10 to-transparent" />
              
              {menuItems.map((item, index) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ scale: 0, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: index * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link
                      href={item.href}
                      className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-br from-[#d4a5a5] to-[#c89b9b] text-white shadow-lg shadow-[#d4a5a5]/40"
                          : "text-[#3d2c29] hover:bg-[#d4a5a5]/15"
                      }`}
                      onClick={() => setIsExpanded(false)}
                    >
                      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      <motion.div
                        className="absolute -top-12 flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                      >
                        <span className="whitespace-nowrap rounded-xl bg-[#3d2c29] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                          {item.label}
                        </span>
                        <div className="h-2 w-2 -translate-y-1 rotate-45 bg-[#3d2c29]" />
                      </motion.div>
                      {isActive && (
                        <motion.div
                          className="absolute -bottom-1 h-1 w-6 rounded-full bg-white/60"
                          layoutId="activeIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              <div className="mx-1 h-10 w-px bg-gradient-to-b from-transparent via-[#d4a5a5]/40 to-transparent" />

              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: menuItems.length * 0.08, type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  href="/cart"
                  className={`group relative flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${
                    pathname === "/cart"
                      ? "bg-gradient-to-br from-[#d4a5a5] to-[#c89b9b] text-white shadow-lg shadow-[#d4a5a5]/40"
                      : "text-[#3d2c29] hover:bg-[#d4a5a5]/15"
                  }`}
                  onClick={() => setIsExpanded(false)}
                >
                  <ShoppingCart className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#3d2c29] text-[10px] font-bold text-white ring-2 ring-[#faf3ed]"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </Link>
              </motion.div>

              <div className="mx-1 h-10 w-px bg-gradient-to-b from-transparent via-[#d4a5a5]/40 to-transparent" />

              {/* WhatsApp */}
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: (menuItems.length + 1) * 0.08, type: "spring", stiffness: 400, damping: 25 }}
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-14 w-14 items-center justify-center rounded-2xl text-[#3d2c29] transition-all duration-300 hover:bg-[#25D366]/15"
                  onClick={() => setIsExpanded(false)}
                >
                  <WhatsAppIcon className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:text-[#25D366]" />
                  <motion.div
                    className="absolute -top-12 flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <span className="whitespace-nowrap rounded-xl bg-[#3d2c29] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                      WhatsApp
                    </span>
                    <div className="h-2 w-2 -translate-y-1 rotate-45 bg-[#3d2c29]" />
                  </motion.div>
                </a>
              </motion.div>

              {/* Correo */}
              <motion.div
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: (menuItems.length + 2) * 0.08, type: "spring", stiffness: 400, damping: 25 }}
              >
                <a
                  href={`mailto:${EMAIL}`}
                  className="group relative flex h-14 w-14 items-center justify-center rounded-2xl text-[#3d2c29] transition-all duration-300 hover:bg-[#d4a5a5]/15"
                  onClick={() => setIsExpanded(false)}
                >
                  <Mail className="h-5 w-5 transition-transform group-hover:scale-110 group-hover:text-[#d4a5a5]" />
                  <motion.div
                    className="absolute -top-12 flex flex-col items-center"
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                  >
                    <span className="whitespace-nowrap rounded-xl bg-[#3d2c29] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                      Correo
                    </span>
                    <div className="h-2 w-2 -translate-y-1 rotate-45 bg-[#3d2c29]" />
                  </motion.div>
                </a>
              </motion.div>

              <motion.button
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ delay: (menuItems.length + 3) * 0.08, type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setIsExpanded(false)}
                className="flex h-14 w-14 items-center justify-center rounded-2xl text-[#3d2c29] transition-all duration-300 hover:bg-[#d4a5a5]/15"
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              onClick={() => setIsExpanded(true)}
              className="group relative overflow-hidden rounded-[2rem] border-2 border-[#d4a5a5]/50 bg-gradient-to-b from-[#faf3ed] to-[#f5ebe0] shadow-[0_20px_60px_-15px_rgba(212,165,165,0.5)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_25px_70px_-15px_rgba(212,165,165,0.6)]"
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#d4a5a5]/10 to-transparent" />
              
              <div className="relative flex items-center gap-4 px-6 py-4">
                <div className="flex items-center gap-1">
                  <span className="text-lg">✦</span>
                  <span className="text-sm text-[#d4a5a5]">•</span>
                  <span className="text-lg">✦</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <span className="font-serif text-sm font-bold tracking-[0.2em] text-[#3d2c29]">MENÚ</span>
                  <motion.div 
                    className="mt-1 h-0.5 bg-gradient-to-r from-transparent via-[#d4a5a5] to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? 60 : 40 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-lg">✦</span>
                  <span className="text-sm text-[#d4a5a5]">•</span>
                  <span className="text-lg">✦</span>
                </div>
              </div>

              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#d4a5a5] text-xs font-bold text-white shadow-lg ring-2 ring-[#faf3ed]"
                >
                  {totalItems}
                </motion.span>
              )}

              <motion.div
                className="absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(212, 165, 165, 0.15) 0%, transparent 50%)",
                }}
              />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.div
          className="pointer-events-none absolute -inset-4 rounded-[3rem] opacity-50"
          animate={{
            boxShadow: isHovered
              ? "0 0 60px 10px rgba(212, 165, 165, 0.4)"
              : "0 0 30px 5px rgba(212, 165, 165, 0.2)",
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  )
}
