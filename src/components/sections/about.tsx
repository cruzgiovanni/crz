"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function About() {
  return (
    <section id="sobre" className="relative bg-background py-12 md:py-20">
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-6">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            Sobre
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Avatar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-square max-w-xs">
              <Image 
                src="/images/avatar.jpeg"
                alt="Giovanni Cruz"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight leading-[0.9]">
              VOCÊ FALA COMIGO.
              <br />
              <span className="text-[#4a4a4a]">NÃO COM UM ATENDENTE.</span>
            </h2>

            <div className="mt-6 space-y-3 text-muted-foreground text-xs md:text-sm leading-relaxed max-w-lg">
              <p>
                Sou desenvolvedor e trabalho diretamente com cada cliente. Sem intermediários, 
                sem ruído, sem aquele jogo de telefone sem fio que atrasa tudo.
              </p>
              <p>
                Meu trabalho é entregar soluções que funcionam — com clareza, prazo e 
                qualidade. Simples assim.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-10 pt-6 border-t border-border grid grid-cols-3 gap-6">
              <div>
                <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-foreground">5+</span>
                <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Anos</p>
              </div>
              <div>
                <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-foreground">50+</span>
                <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Projetos</p>
              </div>
              <div>
                <span className="font-[family-name:var(--font-display)] text-2xl md:text-3xl text-foreground">100%</span>
                <p className="mt-1 text-[10px] text-muted-foreground uppercase tracking-wider">Entrega</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
