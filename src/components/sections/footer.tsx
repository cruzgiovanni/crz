"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
]

export function Footer() {
  return (
    <footer className="relative bg-background">
      {/* Giant Logo - Full width edge to edge, NO padding */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <svg
          viewBox="0 0 100 14"
          width="100%"
          preserveAspectRatio="none"
          className="block w-full"
          style={{ height: '14vw' }}
          aria-label="GVNNCRZ."
        >
          <text
            x="0"
            y="12"
            fill="#5a5a5a"
            textLength="100"
            lengthAdjust="spacing"
            style={{
              fontFamily: 'var(--font-sans), sans-serif',
              fontWeight: 700,
            }}
          >
            GVNNCRZ.
          </text>
        </svg>
      </motion.div>
      
      {/* Horizontal line - with padding to match content */}
      <div className="px-2 md:px-4">
        <div className="h-[2px] bg-[#3a3a3a]" />
      </div>

      {/* Footer content - tall section like basement */}
      <div className="min-h-[55vh] flex flex-col justify-end px-2 md:px-4 pb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* CTA - Left */}
          <motion.div 
            className="md:col-span-4 order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-foreground leading-snug tracking-tight mb-4 max-w-[280px]">
              Pronto para elevar seu negócio? Entre em contato e vamos conversar sobre seu projeto.
            </p>
            <Link 
              href="https://wa.me/5500000000000"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-foreground hover:text-muted-foreground transition-colors group"
            >
              Fale Comigo
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </motion.div>

          {/* Navigation - Center */}
          <motion.div 
            className="md:col-span-4 md:col-start-6 order-1 md:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <nav className="space-y-0">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block font-sans font-bold text-2xl md:text-3xl text-foreground hover:text-muted-foreground transition-colors tracking-tight leading-[1.1]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Social & Copyright - Bottom Right */}
          <motion.div 
            className="md:col-span-4 order-3 flex flex-col items-start md:items-end gap-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              <a href="https://www.instagram.com/giovannicruzdev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                Instagram
              </a>
              <span>,</span>
              <a href="https://github.com/cruzgiovanni" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                GitHub
              </a>
              <span>,</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                LinkedIn
              </a>
            </div>
            <p className="text-[10px] text-muted-foreground">
              &copy; Giovanni Cruz {new Date().getFullYear()} all rights reserved
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
