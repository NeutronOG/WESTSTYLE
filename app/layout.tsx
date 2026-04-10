import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/cart-context"
import { MenuIsland } from "@/components/menu-island"
import { Footer } from "@/components/footer"
import { Toaster } from "sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Estilo Vaquero | Tienda de Sombreros Artesanales",
  description: "Descubre nuestra exclusiva colección de sombreros vaqueros hechos a mano con estética moderna y tonos rosados suaves",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
    shortcut: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans antialiased`}>
        <CartProvider>
          {children}
          <Footer />
          <MenuIsland />
          <Toaster position="top-center" richColors />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  )
}
