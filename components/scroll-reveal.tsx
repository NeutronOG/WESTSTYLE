/**
 * ScrollReveal Component
 * 
 * Componente que revela contenido al hacer scroll
 * Usa Motion (motion.dev) con whileInView para detectar visibilidad
 * 
 * Características:
 * - Se activa cuando el elemento entra en viewport
 * - Configurable: amount (% visible), once (solo una vez)
 * - Múltiples variantes de animación disponibles
 * - Accesibilidad: Respeta prefers-reduced-motion
 */

"use client"

import { motion } from "motion/react"
import { 
  fadeUp, 
  fadeIn, 
  scaleIn, 
  slideInLeft, 
  slideInRight,
  smoothTransition,
  getAccessibleTransition,
} from "@/lib/motion"
import type { ReactNode } from "react"
import type { Variants } from "motion/react"

type AnimationType = "fadeUp" | "fadeIn" | "scaleIn" | "slideInLeft" | "slideInRight"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: AnimationType
  delay?: number
  amount?: number // 0-1, porcentaje del elemento que debe ser visible
  once?: boolean // Si true, solo anima una vez
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
}

export function ScrollReveal({ 
  children, 
  className = "",
  animation = "fadeUp",
  delay = 0,
  amount = 0.3,
  once = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={animationVariants[animation]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{
        ...getAccessibleTransition(smoothTransition),
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollRevealStagger
 * 
 * Contenedor que revela sus hijos con efecto stagger al hacer scroll
 * Útil para listas, grids, grupos de elementos
 */

interface ScrollRevealStaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  amount?: number
  once?: boolean
}

export function ScrollRevealStagger({ 
  children, 
  className = "",
  staggerDelay = 0.1,
  amount = 0.2,
  once = true,
}: ScrollRevealStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/**
 * ScrollProgressBar
 * 
 * Barra de progreso que se actualiza con el scroll de la página
 * Útil para artículos largos, landing pages
 */

import { useScroll, useSpring } from "motion/react"

interface ScrollProgressBarProps {
  className?: string
  color?: string
}

export function ScrollProgressBar({ 
  className = "",
  color = "#d4a5a5",
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 origin-left z-50 ${className}`}
      style={{
        scaleX,
        backgroundColor: color,
      }}
    />
  )
}
