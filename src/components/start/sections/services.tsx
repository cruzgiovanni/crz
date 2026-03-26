'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue, useInView } from 'framer-motion'
import { servicesContent } from '@/data/lp-info'

const { sectionLabel, title, services } = servicesContent

type Service = (typeof services)[number]

/* ── Desktop: scroll-driven sticky reveal ── */
function ServiceItemDesktop({
  service,
  index,
  totalServices,
  scrollYProgress,
}: {
  service: Service
  index: number
  totalServices: number
  scrollYProgress: MotionValue<number>
}) {
  const step = 0.75 / totalServices
  const start = 0.1 + index * step
  const end = start + step * 0.8

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
  const y = useTransform(scrollYProgress, [start, end], [60, 0])

  return (
    <motion.div style={{ opacity, y }} className="border-b border-border group cursor-pointer relative overflow-hidden">
      <ServiceItemContent service={service} />
    </motion.div>
  )
}

/* ── Mobile: simple fade-in on viewport enter ── */
function ServiceItemMobile({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="border-b border-border group cursor-pointer relative overflow-hidden"
    >
      <ServiceItemContent service={service} />
    </motion.div>
  )
}

/* ── Shared content ── */
function ServiceItemContent({ service }: { service: Service }) {
  return (
    <>
      {/* Wireframe grid on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '10px 10px',
          }}
        />
      </div>

      <div className="relative px-2 md:px-4 py-4 md:py-6 tracking-tight">
        {/* Desktop */}
        <div className="hidden md:grid md:grid-cols-[3rem_1fr_1fr] md:items-center md:gap-4">
          <span className="text-[10px] text-muted-foreground/50">{service.id}</span>
          <h3 className="font-sans font-bold text-4xl lg:text-5xl tracking-tight text-white">{service.title}</h3>
          <p className="text-[0.9rem] lg:text-base tracking-tight max-w-sm text-[#c4c4c4]">{service.description}</p>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-2">
          <span className="text-[10px] text-muted-foreground/50">{service.id}</span>
          <h3 className="font-sans font-bold text-3xl tracking-tight text-white">{service.title}</h3>
          <p className="text-[0.9rem] tracking-tight text-[#c4c4c4]">{service.description}</p>
        </div>
      </div>
    </>
  )
}

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <div id="services">
      {/* Desktop: sticky scroll (md+) */}
      <section ref={containerRef} className="relative hidden md:block" style={{ height: '300vh' }}>
        <div className="sticky top-0 h-screen bg-background text-muted-foreground overflow-hidden flex flex-col">
          <div className="px-2 md:px-4 pt-12 md:pt-20">
            <span className="text-[1.5rem] text-[#757575] tracking-tight ml-[15vw]">{sectionLabel}</span>
            <p className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mt-2">{title}</p>
          </div>

          <div className="mt-8 md:mt-12 border-t border-border overflow-hidden">
            {services.map((service, index) => (
              <ServiceItemDesktop
                key={service.id}
                service={service}
                index={index}
                totalServices={services.length}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile: normal flow with fade-in */}
      <section className="md:hidden bg-background text-muted-foreground py-20">
        <div className="px-2">
          <span className="text-[1.5rem] text-[#757575] tracking-tight ml-[15vw]">{sectionLabel}</span>
          <p className="font-sans font-bold text-4xl tracking-tight mt-2">{title}</p>
        </div>

        <div className="mt-8 border-t border-border">
          {services.map((service, index) => (
            <ServiceItemMobile key={service.id} service={service} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}
