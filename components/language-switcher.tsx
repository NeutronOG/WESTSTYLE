"use client"

import { useLanguage } from "@/contexts/language-context"
import { motion } from "motion/react"

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-[#d4a5a5]/40 bg-white/80 p-1 shadow-lg backdrop-blur-md"
    >
      <button
        onClick={() => setLocale("es")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
          locale === "es"
            ? "bg-[#d4a5a5] text-white shadow-md"
            : "text-[#3d2c29]/60 hover:text-[#3d2c29]"
        }`}
      >
        🇲🇽 ES
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
          locale === "en"
            ? "bg-[#d4a5a5] text-white shadow-md"
            : "text-[#3d2c29]/60 hover:text-[#3d2c29]"
        }`}
      >
        🇺🇸 EN
      </button>
    </motion.div>
  )
}
