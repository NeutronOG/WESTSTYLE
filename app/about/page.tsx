"use client"

import { motion } from "motion/react"
import { Heart, Award, Users, Sparkles } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-y-auto bg-gradient-to-br from-[#f5ebe0] via-[#faf3ed] to-[#e8ddd0] pb-32">
      <div className="fixed top-16 left-16 text-5xl text-[#3d2c29] opacity-20 pointer-events-none">✦</div>
      <div className="fixed top-24 right-24 text-4xl text-[#3d2c29] opacity-25 pointer-events-none">✦</div>
      <div className="fixed bottom-32 left-32 text-3xl text-[#3d2c29] opacity-30 pointer-events-none">✦</div>
      <div className="fixed bottom-24 right-16 text-4xl text-[#3d2c29] opacity-20 pointer-events-none">✦</div>

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <img src="/logo.png" alt="Estilo Vaquero" className="h-32 w-auto" />
          </motion.div>
          <h1 className="font-serif text-6xl font-bold tracking-wider text-[#3d2c29]">
            NUESTRA HISTORIA
          </h1>
          <p className="mt-6 text-xl text-[#3d2c29]/70">
            Artesanía tradicional con un toque moderno
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16 overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center">
            <div className="prose prose-lg max-w-none order-2 md:order-1">
              <p className="text-lg leading-relaxed text-[#3d2c29]/80">
                <strong className="text-[#d4a5a5]">Estilo Vaquero</strong> nació en 2021, impulsado por la pasión por los sombreros de alta calidad fabricados en México y por el orgullo de representar el auténtico estilo vaquero.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-[#3d2c29]/80">
                A lo largo de este camino hemos construido nuestra historia junto a nuestros clientes, enviando más de 5,000 texanas y sombreros finos a todo México y Estados Unidos, llevando en cada pieza tradición, esfuerzo y compromiso con la calidad.
              </p>
              <p className="mt-6 text-lg leading-relaxed text-[#3d2c29]/80">
                Hoy, tú también eres parte de esta historia, creciendo con nosotros y llevando un producto creado con trabajo, amor y grandes sueños.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="overflow-hidden rounded-2xl order-1 md:order-2"
            >
              <img 
                src="/quiero_que_sin_202604091809.png" 
                alt="Artesano trabajando" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mt-16">
          {[
            {
              icon: Heart,
              title: "Hecho con Pasión",
              description: "Cada pieza es creada con dedicación y amor por el oficio",
              delay: 0.4
            },
            {
              icon: Award,
              title: "Calidad Premium",
              description: "Solo utilizamos los mejores materiales disponibles",
              delay: 0.5
            },
            {
              icon: Users,
              title: "Artesanos Expertos",
              description: "Maestros con décadas de experiencia en el arte",
              delay: 0.6
            },
            {
              icon: Sparkles,
              title: "Diseño Único",
              description: "Combinamos tradición con innovación contemporánea",
              delay: 0.7
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.delay }}
              className="group relative overflow-hidden rounded-2xl border-2 border-[#d4a5a5]/30 bg-white/60 p-8 text-center backdrop-blur-sm transition-all hover:border-[#d4a5a5] hover:shadow-2xl"
            >
              <motion.div
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#d4a5a5]/20"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <item.icon className="h-8 w-8 text-[#d4a5a5]" />
              </motion.div>
              <h3 className="mb-3 font-serif text-xl font-bold text-[#3d2c29]">
                {item.title}
              </h3>
              <p className="text-[#3d2c29]/70">
                {item.description}
              </p>
              <div className="absolute inset-0 bg-gradient-to-t from-[#d4a5a5]/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 overflow-hidden rounded-3xl border-2 border-[#d4a5a5]/30 bg-gradient-to-br from-[#d4a5a5]/20 to-[#d4a5a5]/5 p-12 text-center backdrop-blur-sm"
        >
          <h2 className="mb-4 font-serif text-4xl font-bold text-[#3d2c29]">
            ¿Listo para encontrar tu estilo?
          </h2>
          <p className="mb-8 text-lg text-[#3d2c29]/70">
            Explora nuestra colección y descubre el sombrero perfecto para ti
          </p>
          <motion.a
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full bg-[#d4a5a5] px-10 py-4 font-serif text-lg font-bold text-white shadow-xl transition-all hover:bg-[#3d2c29]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Ver Colección
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
}
