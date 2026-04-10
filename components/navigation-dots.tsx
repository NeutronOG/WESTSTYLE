"use client"

import { motion } from "motion/react"

interface NavigationDotsProps {
  total: number
  current: number
  onSelect: (index: number) => void
  colors: string[]
}

export function NavigationDots({ total, current, onSelect, colors }: NavigationDotsProps) {
  return (
    <motion.div
      className="absolute top-28 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-[#d4a5a5]/40 bg-[#faf3ed]/60 px-4 py-3 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className="group relative p-1"
          aria-label={`Go to slide ${index + 1}`}
        >
          <motion.div
            className="h-2 rounded-full transition-colors"
            animate={{
              width: index === current ? 24 : 8,
              backgroundColor: index === current ? colors[0] || "#d4a5a5" : "rgba(61, 44, 41, 0.3)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-[#d4a5a5]/30"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      ))}
    </motion.div>
  )
}
