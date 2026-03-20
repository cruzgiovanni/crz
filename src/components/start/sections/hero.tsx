'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroContent } from '@/data/lp-info'

const { words, mainTitle, subtitle } = heroContent

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-background overflow-hidden tracking-tight">
      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-2 md:px-4 pb-4">
        {/* Giant Title */}
        <div className="font-sans font-bold leading-[0.95] ">
          <div>
            <span className="block text-[8vh] md:text-[10vh] lg:text-[12vh] text-[#E6E6E6] tracking-tight ">
              {mainTitle.line1}
            </span>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[currentWord]}
                className="block text-[8vh] md:text-[10vh] lg:text-[12vh] text-[#c4c4c494] my-0.5 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </div>

          <div>
            <span className="block text-[8vh] md:text-[10vh] lg:text-[12vh] text-[#E6E6E6] tracking-tight">
              {mainTitle.line2}
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="mt-6 max-w-md text-[#E6E6E6] text-[0.9rem] md:text-xl tracking-tight">
          {subtitle}
        </p>
      </div>
    </section>
  )
}
