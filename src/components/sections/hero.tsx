'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

import art from '../../../public/art.jpeg'

const words = ['SITES', 'SISTEMAS', 'RESULTADOS']

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Navigation - Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="flex items-center justify-between px-2 md:px-4 py-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={art}
              alt="Giovanni Cruz"
              width={22}
              height={22}
              className="rounded-full"
              loading="eager"
              priority
            />
            <span className="text-[10px] font-semibold text-foreground tracking-tight">giovannicruz.dev</span>
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="#servicos"
              className="text-[10px] font-semibold text-foreground hover:text-muted-foreground transition-colors hidden sm:inline"
            >
              Serviços
            </Link>
            <Link
              href="#sobre"
              className="text-[10px] font-semibold text-foreground hover:text-muted-foreground transition-colors hidden sm:inline"
            >
              Sobre
            </Link>
            <Link
              href="https://wa.me/5500000000000"
              target="_blank"
              className="bg-foreground text-background px-3 py-1.5 text-[10px] font-semibold hover:bg-foreground/90 transition-colors"
            >
              Contato
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-2 md:px-4 pt-16">
        {/* Giant Title */}
        <div className="font-[family-name:var(--font-display)] leading-[0.85] tracking-tight">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="block text-[16vw] md:text-[14vw] text-foreground">EU FAÇO</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={words[currentWord]}
                className="block text-[16vw] md:text-[14vw] text-[#4a4a4a]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {words[currentWord]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="block text-[16vw] md:text-[14vw] text-foreground">QUE PERFORMAM.</span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-6 max-w-md text-muted-foreground text-xs md:text-sm leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Parceiro de empresários que buscam solidez, excelência e resultados reais no digital.
        </motion.p>
      </div>
    </section>
  )
}
