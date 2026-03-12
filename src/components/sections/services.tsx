"use client"

import { motion } from "framer-motion"

const services = [
  {
    id: "01",
    title: "Sites",
    count: "(04)",
  },
  {
    id: "02", 
    title: "Sistemas",
    count: "(03)",
  },
  {
    id: "03",
    title: "E-commerce",
    count: "(02)",
  },
  {
    id: "04",
    title: "Consultoria",
    count: "(01)",
  }
]

export function Services() {
  return (
    <section id="servicos" className="relative bg-background py-12 md:py-20">
      {/* Section header */}
      <div className="px-2 md:px-4 mb-6">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
          Serviços
        </span>
      </div>

      {/* Services list - compact, no gaps */}
      <div className="border-t border-border">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="group border-b border-border cursor-pointer relative overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            {/* Wireframe grid background on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div 
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
            <div className="relative px-2 md:px-4 py-3 md:py-4 flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3 md:gap-6">
                <span className="text-[10px] text-muted-foreground w-6">{service.id}</span>
                <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight group-hover:text-[#6a6a6a] transition-colors">
                  {service.title}
                </h3>
              </div>
              <span className="text-[10px] text-muted-foreground">{service.count}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
