/**
 * Motion Animation Utilities
 * 
 * Capa de utilidades reutilizables para animaciones con Motion (motion.dev)
 * Incluye variants predefinidos, transitions comunes y configuraciones de gestos
 */

import type { Variants, Transition } from "motion/react"

// ============================================================================
// VARIANTS PREDEFINIDOS PARA UI
// ============================================================================

/**
 * fadeIn: Entrada simple con fade
 * Uso: Elementos que aparecen suavemente
 */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

/**
 * fadeUp: Entrada con fade y movimiento vertical
 * Uso: Cards, secciones, contenido que entra desde abajo
 */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

/**
 * fadeDown: Entrada con fade y movimiento desde arriba
 * Uso: Headers, notificaciones, dropdowns
 */
export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0 },
}

/**
 * scaleIn: Entrada con escala
 * Uso: Modales, popups, elementos que "crecen"
 */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
}

/**
 * slideInLeft: Entrada desde la izquierda
 * Uso: Sidebars, menús laterales
 */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
}

/**
 * slideInRight: Entrada desde la derecha
 * Uso: Paneles, notificaciones laterales
 */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
}

/**
 * staggerContainer: Contenedor para animaciones escalonadas
 * Uso: Listas, grids, grupos de elementos
 * 
 * Ejemplo:
 * <motion.div variants={staggerContainer} initial="hidden" animate="visible">
 *   <motion.div variants={fadeUp}>Item 1</motion.div>
 *   <motion.div variants={fadeUp}>Item 2</motion.div>
 * </motion.div>
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// ============================================================================
// TRANSITIONS COMUNES
// ============================================================================

/**
 * Transition rápida y suave
 * Uso: Hover effects, pequeños cambios de UI
 */
export const fastTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
}

/**
 * Transition suave y elegante
 * Uso: Entradas/salidas principales, cambios importantes
 */
export const smoothTransition: Transition = {
  duration: 0.6,
  ease: [0.32, 0.72, 0, 1], // Custom easing
}

/**
 * Transition con efecto spring (rebote)
 * Uso: Elementos interactivos, botones, cards
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
}

/**
 * Transition spring suave
 * Uso: Movimientos más naturales sin tanto rebote
 */
export const softSpringTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

// ============================================================================
// CONFIGURACIONES DE GESTOS
// ============================================================================

/**
 * Hover effect: Leve elevación
 * Uso: Cards, botones, elementos clickeables
 */
export const hoverLift = {
  scale: 1.02,
  y: -2,
  transition: fastTransition,
}

/**
 * Hover effect: Escala sutil
 * Uso: Imágenes, iconos
 */
export const hoverScale = {
  scale: 1.05,
  transition: fastTransition,
}

/**
 * Tap/Press effect: Escala hacia abajo
 * Uso: Botones, elementos clickeables
 */
export const tapScale = {
  scale: 0.98,
  transition: fastTransition,
}

/**
 * Tap effect: Escala más pronunciada
 * Uso: Botones grandes, CTAs
 */
export const tapScaleStrong = {
  scale: 0.95,
  transition: fastTransition,
}

// ============================================================================
// CONFIGURACIONES DE SCROLL
// ============================================================================

/**
 * Configuración para scroll reveal
 * Uso: Elementos que aparecen al hacer scroll
 */
export const scrollRevealConfig = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.3 }, // Se activa cuando 30% es visible
  transition: smoothTransition,
}

/**
 * Configuración para scroll reveal con stagger
 * Uso: Listas o grids que aparecen con efecto escalonado
 */
export const scrollStaggerConfig = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  transition: {
    staggerChildren: 0.1,
    delayChildren: 0.1,
  },
}

// ============================================================================
// UTILIDADES PARA ACCESIBILIDAD
// ============================================================================

/**
 * Verifica si el usuario prefiere movimiento reducido
 * Uso: Condicional para deshabilitar animaciones complejas
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Retorna transition apropiada según preferencias del usuario
 * Uso: Adaptar animaciones a preferencias de accesibilidad
 */
export const getAccessibleTransition = (
  normalTransition: Transition
): Transition => {
  if (prefersReducedMotion()) {
    return { duration: 0.01 } // Casi instantáneo
  }
  return normalTransition
}

// ============================================================================
// PRESETS COMBINADOS
// ============================================================================

/**
 * Preset completo para cards interactivas
 * Incluye: fadeUp + hover + tap
 */
export const interactiveCardPreset = {
  variants: fadeUp,
  initial: "hidden",
  animate: "visible",
  whileHover: hoverLift,
  whileTap: tapScale,
  transition: smoothTransition,
}

/**
 * Preset para botones
 * Incluye: scaleIn + hover + tap
 */
export const buttonPreset = {
  variants: scaleIn,
  initial: "hidden",
  animate: "visible",
  whileHover: { scale: 1.05 },
  whileTap: tapScale,
  transition: springTransition,
}

/**
 * Preset para elementos de scroll reveal
 * Incluye: fadeUp + scroll activation
 */
export const scrollRevealPreset = {
  variants: fadeUp,
  ...scrollRevealConfig,
}
