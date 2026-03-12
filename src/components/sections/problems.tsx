"use client"

import { motion } from "framer-motion"

const problems: string[] = [
  "Você já contratou alguém que sumiu no meio do projeto.",
  "Pagou caro por algo que nunca funcionou direito.",
  "Teve que explicar a mesma coisa mil vezes.",
  "E no final, ficou com um site que você tem vergonha de mostrar.",
]

export function Problems() {
  return (
    <section className="relative bg-background py-12 md:py-20">
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-6">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            O Problema
          </span>
        </div>

        {/* Problems */}
        <div className="max-w-2xl space-y-6">
          {problems.map((problem, index) => (
            <motion.p
              key={index}
              className="text-base md:text-lg text-muted-foreground leading-relaxed tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {problem}
            </motion.p>
          ))}
        </div>

        {/* Transition */}
        <motion.div
          className="mt-12 pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            AQUI É DIFERENTE.
          </p>
          <p className="mt-3 text-muted-foreground text-xs md:text-sm max-w-md">
            Entrega silenciosa. Qualidade que fala por si.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
