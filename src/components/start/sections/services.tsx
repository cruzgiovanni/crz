'use client'

import { servicesContent } from '@/data/lp-info'

const { sectionLabel, services } = servicesContent

export function Services() {
  return (
    <section id="servicos" className="relative bg-background py-12 md:py-20">
      {/* Section header */}
      <div className="px-2 md:px-4 mb-6">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{sectionLabel}</span>
      </div>

      {/* Services list - compact, no gaps */}
      <div className="border-t border-border">
        {services.map((service) => (
          <div
            key={service.id}
            className="group border-b border-border cursor-pointer relative overflow-hidden"
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
                <h3 className="font-sans font-bold text-4xl md:text-6xl lg:text-7xl text-foreground tracking-tight group-hover:text-[#6a6a6a] transition-colors">
                  {service.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
