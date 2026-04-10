/**
 * AnimatedCard Component
 * 
 * Card interactiva con animaciones de entrada, hover y tap
 * Usa Motion (motion.dev) para todas las animaciones
 * 
 * Características:
 * - Entrada: fadeUp (opacity 0 + y 24 -> opacity 1 + y 0)
 * - Hover: Leve elevación (scale 1.02 + y -2)
 * - Tap: Scale down (0.98)
 * - Accesibilidad: Respeta prefers-reduced-motion
 */

"use client"

import { motion } from "motion/react"
import { fadeUp, hoverLift, tapScale, smoothTransition, getAccessibleTransition } from "@/lib/motion"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  onClick?: () => void
  href?: string
}

export function AnimatedCard({ 
  children, 
  className = "", 
  delay = 0,
  onClick,
  href,
}: AnimatedCardProps) {
  const Component = href ? motion.a : motion.div
  const props = href ? { href } : {}

  return (
    <Component
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      whileHover={hoverLift}
      whileTap={tapScale}
      transition={{
        ...getAccessibleTransition(smoothTransition),
        delay,
      }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  )
}

/**
 * AnimatedCardGrid
 * 
 * Grid de cards con efecto stagger (aparecen una tras otra)
 * Útil para listas de productos, galerías, etc.
 */

interface AnimatedCardGridProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function AnimatedCardGrid({ 
  children, 
  className = "",
  staggerDelay = 0.1,
}: AnimatedCardGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
