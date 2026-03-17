"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CTA() {
  return (
    <section id="contato" className="relative bg-background py-12 md:py-20 mb-[25vh] md:mb-[50vh]">
      <div className="px-2 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[0.85]">
            VAMOS CRIAR ALGO
            <br />
            <span className="text-[#4a4a4a]">QUE FUNCIONA?</span>
          </h2>

          <div className="mt-6">
            <Link
              href="https://wa.me/5500000000000"
              target="_blank"
              className="inline-flex items-center gap-2 bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-foreground/90 transition-colors group"
            >
              Conversar no WhatsApp
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          </div>

          <p className="mt-3 text-[10px] text-muted-foreground">
            Resposta em até 24 horas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
