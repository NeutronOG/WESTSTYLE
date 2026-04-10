"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type Locale = "es" | "en"

interface LanguageContextType {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string) => string
  formatPrice: (mxn: number) => string
  currency: "MXN" | "USD"
}

const USD_RATE = 0.05 // 1 MXN = 0.05 USD (aprox $20 MXN = $1 USD)

const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.gallery": "Galería",
    "nav.shop": "Tienda",
    "nav.about": "Nosotros",
    "nav.cart": "Carrito",
    // Home
    "home.catalog": "Ver Catálogo",
    "home.bestsellers": "Los Más Vendidos",
    "home.bestsellers.sub": "Descubre por qué estos diseños conquistan corazones",
    "home.view": "Ver producto",
    "home.tagline": "Artesanía Vaquera de Alta Calidad",
    "home.description": "Sombreros artesanales hechos con los mejores materiales. Cada pieza es única, elaborada con tradición y pasión por el estilo vaquero mexicano.",
    "home.explore": "Explorar Colección",
    "home.contact": "Contactar",
    "home.sold": "vendidos",
    // Shop
    "shop.title": "Our Collection",
    "shop.all": "All",
    "shop.search": "Search hats...",
    "shop.filters": "Filters",
    "shop.noResults": "No products found",
    "shop.noResults.sub": "Try another category or search term",
    "shop.addCart": "Add to Cart",
    "shop.inStock": "In Stock",
    "shop.outStock": "Out of Stock",
    "shop.featured": "Featured",
    // Product
    "product.material": "Material",
    "product.care": "Care",
    "product.color": "Color",
    "product.size": "Size",
    "product.addCart": "Add to Cart",
    "product.buyNow": "Buy Now",
    "product.share": "Share",
    "product.back": "Back to shop",
    "product.colors": "Available Colors",
    "product.sizes": "Available Sizes",
    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty.sub": "Add some hats to get started",
    "cart.explore": "Explore Collection",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.remove": "Remove",
    "cart.shipping.mx": "Mexico",
    "cart.shipping.us": "United States",
    "cart.shipping.free": "Calculated at checkout",
    "cart.items": "items",
    // Checkout
    "checkout.title": "Checkout",
    "checkout.contact": "Contact Information",
    "checkout.shipping": "Shipping Address",
    "checkout.payment": "Secure Payment with Stripe",
    "checkout.payment.sub": "You will be redirected to Stripe's secure payment gateway.",
    "checkout.firstName": "First Name",
    "checkout.lastName": "Last Name",
    "checkout.email": "Email",
    "checkout.phone": "Phone",
    "checkout.address": "Address",
    "checkout.city": "City",
    "checkout.postal": "Postal Code",
    "checkout.country": "Country",
    "checkout.mexico": "Mexico — Shipping $400",
    "checkout.usa": "United States — Shipping $2,000",
    "checkout.pay": "Pay with Stripe",
    "checkout.processing": "Processing...",
    "checkout.summary": "Order Summary",
    "checkout.subtotal": "Subtotal",
    "checkout.shippingCost": "Shipping",
    "checkout.total": "Total",
    "checkout.secure": "100% Secure Transaction",
    "checkout.visa": "We accept all major credit cards",
    // About
    "about.title": "Our Story",
    "about.subtitle": "Passion, tradition and authentic style",
    "about.p1": "We are a Mexican brand dedicated to the creation of premium cowboy hats. Every hat is handcrafted with the finest materials and carries our tradition.",
    "about.p2": "From the Bolivian wool texanas to the exclusive artist collaborations, each piece represents the best of Mexican cowboy craftsmanship.",
    "about.mission": "Our Mission",
    "about.mission.text": "To bring the authentic spirit of the Mexican cowboy to the world, through handcrafted hats that tell a story.",
    // Footer
    "footer.rights": "All rights reserved",
    "footer.contact": "Contact",
    "footer.shop": "Shop",
    "footer.about": "About",
    // Success / Cancel
    "success.title": "Order Confirmed!",
    "success.sub": "Thank you for your purchase at Estilo Vaquero.",
    "success.email": "You will receive a confirmation email with your order details.",
    "success.continue": "Continue Shopping",
    "success.home": "Home",
    "cancel.title": "Payment Cancelled",
    "cancel.sub": "Your order was not processed. Your cart is still intact.",
    "cancel.cart": "Back to Cart",
    "cancel.shop": "Continue Shopping",
  },
  en: {
    "nav.home": "Home",
    "nav.gallery": "Gallery",
    "nav.shop": "Shop",
    "nav.about": "About",
    "nav.cart": "Cart",
    "home.catalog": "Shop Now",
    "home.bestsellers": "Best Sellers",
    "home.bestsellers.sub": "Discover why these designs conquer hearts",
    "home.view": "View product",
    "home.tagline": "Premium Handcrafted Cowboy Hats",
    "home.description": "Handcrafted hats made with the finest materials. Each piece is unique, crafted with tradition and passion for the Mexican cowboy style.",
    "home.explore": "Explore Collection",
    "home.contact": "Contact Us",
    "home.sold": "sold",
    "shop.title": "Our Collection",
    "shop.all": "All",
    "shop.search": "Search hats...",
    "shop.filters": "Filters",
    "shop.noResults": "No products found",
    "shop.noResults.sub": "Try another category or search term",
    "shop.addCart": "Add to Cart",
    "shop.inStock": "In Stock",
    "shop.outStock": "Out of Stock",
    "shop.featured": "Featured",
    "product.material": "Material",
    "product.care": "Care",
    "product.color": "Color",
    "product.size": "Size",
    "product.addCart": "Add to Cart",
    "product.buyNow": "Buy Now",
    "product.share": "Share",
    "product.back": "Back to shop",
    "product.colors": "Available Colors",
    "product.sizes": "Available Sizes",
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.empty.sub": "Add some hats to get started",
    "cart.explore": "Explore Collection",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",
    "cart.remove": "Remove",
    "cart.shipping.mx": "Mexico",
    "cart.shipping.us": "United States",
    "cart.shipping.free": "Calculated at checkout",
    "cart.items": "items",
    "checkout.title": "Checkout",
    "checkout.contact": "Contact Information",
    "checkout.shipping": "Shipping Address",
    "checkout.payment": "Secure Payment with Stripe",
    "checkout.payment.sub": "You will be redirected to Stripe's secure payment gateway.",
    "checkout.firstName": "First Name",
    "checkout.lastName": "Last Name",
    "checkout.email": "Email",
    "checkout.phone": "Phone",
    "checkout.address": "Address",
    "checkout.city": "City",
    "checkout.postal": "Postal Code",
    "checkout.country": "Country",
    "checkout.mexico": "Mexico — Shipping $400 MXN",
    "checkout.usa": "United States — Shipping $2,000 MXN",
    "checkout.pay": "Pay with Stripe",
    "checkout.processing": "Processing...",
    "checkout.summary": "Order Summary",
    "checkout.subtotal": "Subtotal",
    "checkout.shippingCost": "Shipping",
    "checkout.total": "Total",
    "checkout.secure": "100% Secure Transaction",
    "checkout.visa": "We accept all major credit cards",
    "about.title": "Our Story",
    "about.subtitle": "Passion, tradition and authentic style",
    "about.p1": "We are a Mexican brand dedicated to the creation of premium cowboy hats. Every hat is handcrafted with the finest materials and carries our tradition.",
    "about.p2": "From the Bolivian wool texanas to the exclusive artist collaborations, each piece represents the best of Mexican cowboy craftsmanship.",
    "about.mission": "Our Mission",
    "about.mission.text": "To bring the authentic spirit of the Mexican cowboy to the world, through handcrafted hats that tell a story.",
    "footer.rights": "All rights reserved",
    "footer.contact": "Contact",
    "footer.shop": "Shop",
    "footer.about": "About",
    "success.title": "Order Confirmed!",
    "success.sub": "Thank you for your purchase at Estilo Vaquero.",
    "success.email": "You will receive a confirmation email with your order details.",
    "success.continue": "Continue Shopping",
    "success.home": "Home",
    "cancel.title": "Payment Cancelled",
    "cancel.sub": "Your order was not processed. Your cart is still intact.",
    "cancel.cart": "Back to Cart",
    "cancel.shop": "Continue Shopping",
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es")

  const t = (key: string) => translations[locale][key] ?? translations["es"][key] ?? key

  const formatPrice = (mxn: number) => {
    if (locale === "en") {
      return `$${(mxn * USD_RATE).toFixed(0)} USD`
    }
    return `$${mxn.toLocaleString("es-MX")} MXN`
  }

  const currency = locale === "en" ? "USD" : "MXN"

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, formatPrice, currency }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
