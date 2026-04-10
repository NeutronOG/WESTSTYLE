"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { Mail, Clock } from "lucide-react"
import { usePathname } from "next/navigation"

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const WHATSAPP_NUMBER = "5214778155183"
const WHATSAPP_MESSAGE = "Hola! Me interesa conocer más sobre sus sombreros 🎩"
const EMAIL = "stylewestern0@gmail.com"

export function Footer() {
  const pathname = usePathname()
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  if (pathname === "/gallery") return null

  return (
    <footer className="relative w-full border-t-2 border-[#d4a5a5]/20 bg-gradient-to-br from-[#3d2c29] via-[#4a3530] to-[#3d2c29] pb-32 pt-16 text-white">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden">
        <div className="absolute -top-10 left-10 text-9xl">✦</div>
        <div className="absolute bottom-10 right-10 text-7xl">✦</div>
        <div className="absolute top-1/2 left-1/2 text-8xl -translate-x-1/2 -translate-y-1/2">✦</div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-3">

          {/* Marca */}
          <div className="flex flex-col items-start gap-4">
            <img src="/logo.png" alt="Estilo Vaquero" className="h-20 w-auto brightness-0 invert" />
            <p className="text-sm leading-relaxed text-white/60">
              Sombreros artesanales hechos a mano con tradición vaquera y elegancia moderna. Piezas únicas para personas únicas.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Clock className="h-3 w-3" />
              <span>Lun – Sáb &nbsp;9:00 – 18:00</span>
            </div>
          </div>

          {/* Navegación */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg font-bold tracking-widest text-[#d4a5a5]">NAVEGACIÓN</h4>
            <ul className="space-y-2">
              {[
                { label: "Inicio", href: "/" },
                { label: "Galería", href: "/gallery" },
                { label: "Tienda", href: "/shop" },
                { label: "Acerca de", href: "/about" },
                { label: "Carrito", href: "/cart" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-[#d4a5a5]"
                  >
                    <span className="h-px w-4 bg-[#d4a5a5]/0 transition-all group-hover:w-6 group-hover:bg-[#d4a5a5]" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif text-lg font-bold tracking-widest text-[#d4a5a5]">CONTACTO</h4>
            <p className="text-sm text-white/60">
              ¿Tienes dudas o quieres hacer un pedido especial? Escríbenos, con gusto te atendemos.
            </p>

            {/* WhatsApp */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 px-4 py-3 transition-colors hover:bg-[#25D366]/25"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg">
                <WhatsAppIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#25D366]">WhatsApp</span>
                <span className="text-sm text-white/80">+52 1 477 815 5183</span>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-2xl bg-[#d4a5a5]/10 border border-[#d4a5a5]/20 px-4 py-3 transition-colors hover:bg-[#d4a5a5]/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4a5a5] text-white shadow-lg">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#d4a5a5]">Correo</span>
                <span className="text-sm text-white/80">{EMAIL}</span>
              </div>
            </motion.a>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Estilo Vaquero. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
