/**
 * GestureDemo Components
 * 
 * Componentes de demostración para gestos con Motion (motion.dev)
 * Incluye: hover, tap, drag con límites y snap back
 * 
 * Características:
 * - Hover: Cambios visuales al pasar el mouse
 * - Tap/Press: Feedback táctil al hacer click
 * - Drag: Arrastrar con límites y retorno suave
 * - Accesibilidad: No son la única forma de interacción
 */

"use client"

import { motion } from "motion/react"
import { hoverScale, tapScale, fastTransition, springTransition } from "@/lib/motion"
import type { ReactNode } from "react"

/**
 * InteractiveButton
 * 
 * Botón con hover y tap effects
 * Uso: CTAs, botones principales
 */

interface InteractiveButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  variant?: "primary" | "secondary"
}

export function InteractiveButton({ 
  children, 
  onClick,
  className = "",
  variant = "primary",
}: InteractiveButtonProps) {
  const baseClasses = variant === "primary"
    ? "bg-gradient-to-br from-[#d4a5a5] to-[#c89b9b] text-white"
    : "border-2 border-[#d4a5a5] text-[#3d2c29] bg-white/60"

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={tapScale}
      transition={springTransition}
      onClick={onClick}
      className={`rounded-full px-8 py-4 font-semibold shadow-lg ${baseClasses} ${className}`}
    >
      {children}
    </motion.button>
  )
}

/**
 * DraggableCard
 * 
 * Card que se puede arrastrar con límites y retorno suave
 * Uso: Demos interactivas, juegos, interfaces táctiles
 * 
 * Nota: Incluye botón alternativo para accesibilidad
 */

interface DraggableCardProps {
  children: ReactNode
  className?: string
  dragConstraints?: { top: number; left: number; right: number; bottom: number }
}

export function DraggableCard({ 
  children, 
  className = "",
  dragConstraints = { top: -100, left: -100, right: 100, bottom: 100 },
}: DraggableCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={dragConstraints}
      dragElastic={0.1}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
      whileHover={{ scale: 1.02, cursor: "grab" }}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={`touch-none ${className}`}
    >
      {children}
    </motion.div>
  )
}

/**
 * HoverCard
 * 
 * Card con efectos de hover sofisticados
 * Incluye: elevación, brillo, transformación
 */

interface HoverCardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function HoverCard({ 
  children, 
  className = "",
  onClick,
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: "0 20px 40px rgba(212, 165, 165, 0.3)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={fastTransition}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  )
}

/**
 * PressableIcon
 * 
 * Ícono con feedback de presión
 * Uso: Botones de iconos, acciones rápidas
 */

interface PressableIconProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  ariaLabel?: string
}

export function PressableIcon({ 
  children, 
  onClick,
  className = "",
  ariaLabel,
}: PressableIconProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9, rotate: -5 }}
      transition={springTransition}
      onClick={onClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${className}`}
    >
      {children}
    </motion.button>
  )
}

/**
 * MagneticButton
 * 
 * Botón con efecto magnético (sigue el cursor)
 * Efecto avanzado para CTAs especiales
 */

import { useMotionValue, useSpring, useTransform } from "motion/react"
import { useRef } from "react"

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function MagneticButton({ 
  children, 
  onClick,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  )
}
