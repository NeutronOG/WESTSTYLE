"use client"

import { motion } from "motion/react"
import Link from "next/link"
import { ShoppingBag, Star, Heart, Award, TrendingUp, Users, Package } from "lucide-react"
import Image from "next/image"
import { ScrollReveal, ScrollRevealStagger, ScrollProgressBar } from "@/components/scroll-reveal"
import { AnimatedCard } from "@/components/animated-card"
import { InteractiveButton, HoverCard } from "@/components/gesture-demo"

export default function Home() {
  const bestSellers = [
    { id: 10, name: "Castor 500X – Morcon", price: "$18,000", image: "/Los alegres del barranco 5000x TOMBSTONE Sombrero.png", sales: "150+ vendidos" },
    { id: 11, name: "Conejo 200X – Morcon", price: "$8,000", image: "/Este Oeste- Gris Granito.png", sales: "120+ vendidos" },
    { id: 12, name: "Sinaloa - Tombstone 5000X", price: "$3,800", image: "/Este oeste 5000x TOMBSTONE Sombrero.png", sales: "100+ vendidos" },
  ]

  return (
    <main className="relative w-screen overflow-x-hidden overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0]">
      {/* Scroll Progress Bar - Demostración de scroll tracking con Motion */}
      <ScrollProgressBar color="#d4a5a5" />
      
      {/* Hero Section - Full Screen Image */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
          className="absolute inset-0"
        >
          {/* Imagen móvil */}
          <img
            src="/quiero_que_eso_202604092010.png"
            alt="Sombrero Premium"
            className="block md:hidden h-full w-full object-cover object-center"
          />
          {/* Imagen desktop */}
          <img
            src="/Sinaloa 20x lana boliviana MORCON Texana.png"
            alt="Sombrero Premium"
            className="hidden md:block h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
        </motion.div>

        {/* Logo centrado arriba */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="absolute top-10 inset-x-0 z-10 flex flex-col items-center gap-2 px-4 text-center"
        >
          <img src="/logo.png" alt="Estilo Vaquero" className="h-20 w-auto md:h-28 drop-shadow-2xl mx-auto" />
          <span className="font-serif text-xs uppercase tracking-[0.35em] text-white/70 drop-shadow-md">
            Artesanal · México
          </span>
        </motion.div>

        {/* Botón de compra centrado abajo */}
        <div className="absolute bottom-14 inset-x-0 z-10 flex flex-col items-center gap-5 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex justify-center w-full"
          >
            <Link
              href="/shop"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/30 bg-white/10 px-8 py-4 text-white backdrop-blur-md transition-all duration-500 hover:bg-white hover:text-[#3d2c29] hover:shadow-2xl whitespace-nowrap"
            >
              <span className="font-serif text-base font-semibold tracking-widest uppercase">Ver Catálogo</span>
              <ShoppingBag className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Flecha scroll down */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="flex justify-center"
          >
            <svg className="h-5 w-5 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* Sección texto principal */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl text-center"
        >
          <motion.img
            src="/logo.png"
            alt="Estilo Vaquero"
            className="mx-auto mb-6 h-32 w-auto md:h-36"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 font-serif text-4xl font-bold leading-tight text-[#3d2c29] md:text-6xl lg:text-7xl"
          >
            El Sombrero que Define
            <br />
            <span className="bg-gradient-to-r from-[#d4a5a5] to-[#c89b9b] bg-clip-text text-transparent">
              Tu Personalidad
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-[#3d2c29]/80 md:text-xl"
          >
            Cada pieza es una obra maestra hecha a mano. Diseños exclusivos que combinan
            <span className="font-semibold text-[#3d2c29]"> tradición vaquera con elegancia moderna</span>.
            No encontrarás esto en ningún otro lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mb-10 flex flex-wrap items-center justify-center gap-6 text-sm text-[#3d2c29]/70"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#d4a5a5] text-[#d4a5a5]" />
                ))}
              </div>
              <span className="font-medium">+500 clientes satisfechos</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 fill-[#d4a5a5] text-[#d4a5a5]" />
              <span className="font-medium">Hecho con amor</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-[#d4a5a5]" />
              <span className="font-medium">100% Artesanal</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/shop">
              <InteractiveButton variant="primary" className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Comprar Ahora
              </InteractiveButton>
            </Link>
            <Link href="/gallery">
              <InteractiveButton variant="secondary" className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Ver Colección
              </InteractiveButton>
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-6 text-sm font-medium text-[#d4a5a5]"
          >
            Solo quedan pocas unidades disponibles
          </motion.p>
        </motion.div>
      </section>

      {/* Best Sellers Section - Con ScrollReveal y HoverCard de Motion */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal animation="fadeUp" className="mb-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-[#3d2c29] md:text-5xl">
              Los Más Vendidos
            </h2>
            <p className="text-lg text-[#3d2c29]/70">
              Descubre por qué estos diseños conquistan corazones
            </p>
          </ScrollReveal>

          {/* ScrollRevealStagger - Cards aparecen con efecto stagger */}
          <ScrollRevealStagger staggerDelay={0.15} className="grid gap-8 md:grid-cols-3">
            {bestSellers.map((item) => (
              <AnimatedCard key={item.id}>
                <Link href="/shop" className="block">
                  <HoverCard className="overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 p-6 backdrop-blur-sm">
                    <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#f5ebe0] to-[#faf3ed]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute right-3 top-3 rounded-full bg-[#d4a5a5] px-3 py-1 text-xs font-bold text-white">
                        {item.sales}
                      </div>
                    </div>
                    <h3 className="mb-2 font-serif text-xl font-bold text-[#3d2c29]">{item.name}</h3>
                    <p className="text-2xl font-bold text-[#d4a5a5]">{item.price}</p>
                  </HoverCard>
                </Link>
              </AnimatedCard>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* Brand Story Section - Con ScrollReveal slideInLeft */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal 
            animation="slideInLeft" 
            amount={0.2}
            className="overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 backdrop-blur-sm md:p-12"
          >
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="mb-6 font-serif text-4xl font-bold text-[#3d2c29] md:text-5xl">
                  Nuestra Historia
                </h2>
                <div className="space-y-4 text-lg text-[#3d2c29]/80">
                  <p>
                    <span className="font-semibold text-[#3d2c29]">Estilo Vaquero</span> nació de una pasión por preservar 
                    la tradición artesanal mexicana mientras la reinventamos para el mundo moderno.
                  </p>
                  <p>
                    Cada sombrero es elaborado a mano por maestros artesanos con más de 20 años de experiencia, 
                    utilizando técnicas ancestrales y materiales de la más alta calidad.
                  </p>
                  <p>
                    Hemos vestido a más de <span className="font-bold text-[#d4a5a5]">500 clientes satisfechos</span> que 
                    buscan expresar su personalidad única con piezas que cuentan una historia.
                  </p>
                </div>
                <Link
                  href="/about"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#d4a5a5] px-6 py-3 font-medium text-[#3d2c29] transition-all hover:bg-[#d4a5a5] hover:text-white"
                >
                  Conoce más sobre nosotros
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-square overflow-hidden rounded-2xl">
                  <img
                    src="/quiero_que_sin_202604091809.png"
                    alt="Artesano trabajando"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section - Con ScrollReveal scaleIn */}
      <section className="relative px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <ScrollRevealStagger staggerDelay={0.2} className="grid gap-8 md:grid-cols-3">
            {[
              { icon: Users, number: "500+", label: "Clientes Felices" },
              { icon: Award, number: "100%", label: "Hecho a Mano" },
              { icon: Heart, number: "20+", label: "Años de Experiencia" },
            ].map((stat, index) => (
              <ScrollReveal 
                key={index}
                animation="scaleIn"
                delay={index * 0.15}
                className="rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 text-center backdrop-blur-sm"
              >
                <stat.icon className="mx-auto mb-4 h-12 w-12 text-[#d4a5a5]" />
                <div className="mb-2 font-serif text-4xl font-bold text-[#3d2c29]">{stat.number}</div>
                <div className="text-lg text-[#3d2c29]/70">{stat.label}</div>
              </ScrollReveal>
            ))}
          </ScrollRevealStagger>
        </div>
      </section>

      {/* CTA Section - Con ScrollReveal fadeUp */}
      <section className="relative px-4 py-20">
        <ScrollReveal 
          animation="fadeUp"
          amount={0.3}
          className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#d4a5a5] to-[#c89b9b] p-12 text-center shadow-2xl"
        >
          <h2 className="mb-4 font-serif text-4xl font-bold text-white md:text-5xl">
            Encuentra Tu Estilo Único
          </h2>
          <p className="mb-8 text-xl text-white/90">
            Cada sombrero cuenta una historia. ¿Cuál será la tuya?
          </p>
          <Link href="/shop">
            <InteractiveButton className="inline-flex items-center gap-2 bg-white text-[#3d2c29] shadow-xl">
              <ShoppingBag className="h-5 w-5" />
              Explorar Colección Completa
            </InteractiveButton>
          </Link>
        </ScrollReveal>
      </section>
    </main>
  )
}
