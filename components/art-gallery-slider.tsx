"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArtworkCard } from "./artwork-card"
import { NavigationDots } from "./navigation-dots"
import { artworks } from "@/public/artworks"
import { useSliderNavigation } from "@/hooks/use-slider-navigation"
import { useSliderDrag } from "@/hooks/use-slider-drag"
import { useSliderWheel } from "@/hooks/use-slider-wheel"
import { useColorExtraction, useCurrentColors } from "@/hooks/use-color-extraction"

export function ArtGallerySlider() {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [slideWidth, setSlideWidth] = useState(432)

  const { currentIndex, goToNext, goToPrev, goToSlide } = useSliderNavigation({
    totalSlides: artworks.length,
    enableKeyboard: true,
  })

  const { isDragging, dragX, handleDragStart, handleDragMove, handleDragEnd } = useSliderDrag({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
  })

  useSliderWheel({
    sliderRef,
    onScrollLeft: goToNext,
    onScrollRight: goToPrev,
  })

  const colors = useColorExtraction(artworks)
  const currentColors = useCurrentColors(colors, artworks[currentIndex]?.id)

  useEffect(() => {
    const updateSlideWidth = () => {
      setSlideWidth(window.innerWidth > 768 ? 564 : 432)
    }
    
    updateSlideWidth()
    window.addEventListener('resize', updateSlideWidth)
    return () => window.removeEventListener('resize', updateSlideWidth)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated ambient background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 30% 20%, ${currentColors[0]}33 0%, transparent 50%),
              radial-gradient(ellipse at 70% 80%, ${currentColors[1]}33 0%, transparent 50%),
              radial-gradient(ellipse at 50% 50%, ${currentColors[2]}22 0%, transparent 70%),
              linear-gradient(180deg, #f5ebe0 0%, #e8ddd0 100%)
            `,
          }}
        />
      </AnimatePresence>

      {/* Decorative stars */}
      <div className="absolute top-12 left-12 text-4xl text-[#3d2c29] opacity-40">✦</div>
      <div className="absolute top-20 right-20 text-2xl text-[#3d2c29] opacity-30">✦</div>
      <div className="absolute bottom-32 left-24 text-3xl text-[#3d2c29] opacity-35">✦</div>
      <div className="absolute bottom-20 right-32 text-2xl text-[#3d2c29] opacity-25">✦</div>

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-2xl" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <img src="/logo.png" alt="Estilo Vaquero" className="h-20 w-auto" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 rounded-full border border-[#d4a5a5]/40 bg-[#faf3ed]/60 px-4 py-2 backdrop-blur-md"
        >
          <span className="text-sm text-[#3d2c29]/70">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-[#d4a5a5]">/</span>
          <span className="text-sm text-[#3d2c29]/50">{String(artworks.length).padStart(2, "0")}</span>
        </motion.div>
      </header>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="relative flex h-full w-full cursor-grab items-center active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
      >
        <motion.div
          className="flex items-center gap-8 px-[calc(50vw-200px)] md:gap-16 md:px-[calc(50vw-250px)]"
          animate={{
            x: -currentIndex * slideWidth + dragX,
          }}
          transition={isDragging ? { duration: 0 } : { duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        >
          {artworks.map((artwork, index) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              isActive={index === currentIndex}
              dragOffset={dragX}
              index={index}
              currentIndex={currentIndex}
            />
          ))}
        </motion.div>
      </div>

      {/* Navigation dots */}
      <NavigationDots total={artworks.length} current={currentIndex} onSelect={goToSlide} colors={currentColors} />

      {/* Keyboard hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-8 hidden items-center gap-3 text-[#3d2c29]/40 md:flex"
      >
        <kbd className="rounded border border-[#d4a5a5]/30 bg-[#faf3ed]/50 px-2 py-1 font-mono text-xs text-[#3d2c29]">←</kbd>
        <kbd className="rounded border border-[#d4a5a5]/30 bg-[#faf3ed]/50 px-2 py-1 font-mono text-xs text-[#3d2c29]">→</kbd>
        <span className="text-xs">navigate</span>
      </motion.div>
    </div>
  )
}
