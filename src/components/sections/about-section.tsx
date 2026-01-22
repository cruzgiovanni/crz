'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { aboutSection, contactSection } from '@/data/info'

export function AboutSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 pb-20 md:px-12 md:pt-0 md:pb-0 lg:px-16 relative"
    >
      {/* Background - brutal tech aesthetic */}
      {/*<div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,currentColor_2px,currentColor_4px)]" />*/}

      <div className="mx-auto w-full max-w-7xl relative">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Left side - Brutal typography block */}
          <div className="md:col-span-5 relative">
            <div
              className={`transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
              }`}
            >
              {/* Label with geometric accent */}
              <div className="mb-6 md:mb-8 flex items-center gap-3">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary md:text-[10px]">
                  / {aboutSection.label}
                </p>
              </div>

              {/* MOBILE: Photo floating card */}
              <div className="md:hidden mb-8 relative">
                <div className="relative w-32 h-32 mx-auto">
                  {/* Geometric frame */}
                  <div className="absolute -top-2 -left-2 w-full h-full border-2 border-primary/30" />
                  <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-accent/30" />

                  {/* Photo container */}
                  <div className="relative w-full h-full overflow-hidden border-2 border-foreground/20">
                    {/* Placeholder - substitua com sua foto */}
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="font-mono text-xs text-foreground/40">PHOTO</span>
                    </div>
                    <Image src="/me.jpg" alt="Your name" fill className="object-cover" sizes="128px" priority />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 bg-primary" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-accent" />
                </div>
              </div>

              {/* DESKTOP: Photo integrated with title */}
              <div className="hidden md:block relative mb-8">
                <div className="relative w-48 h-48 lg:w-56 lg:h-56">
                  {/* Brutal frame system */}
                  <div className="absolute -top-3 -left-3 w-full h-full border border-primary/40" />
                  <div className="absolute -bottom-3 -right-3 w-full h-full border border-accent/40" />
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-accent" />

                  {/* Photo */}
                  <div className="relative w-full h-full overflow-hidden border-2 border-foreground/20 bg-foreground/5">
                    <Image
                      src="me.jpg"
                      alt="Your name"
                      fill
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                      sizes="(max-width: 768px) 192px, 224px"
                      priority
                    />
                  </div>

                  {/* Tech corners */}
                  <div className="absolute top-0 left-0 w-4 h-4 bg-primary" />
                  <div className="absolute top-0 right-0 w-2 h-2 bg-primary/60" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-accent" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-accent/60" />
                </div>
              </div>
            </div>

            {/* Location with brutal card */}
            <div
              className={`mt-10 md:mt-16 transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="border border-foreground/10 p-4 relative group hover:border-foreground/20 transition-colors">
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-primary/30" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-primary/30" />
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/50 block mb-1">
                      {contactSection.location.label}
                    </span>
                    <p className="text-sm text-foreground/80 font-mono">{contactSection.location.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content with brutal structure */}
          <div className="md:col-span-7 relative">
            {/* Vertical divider */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-foreground/10" />

            <div className="md:pl-8 lg:pl-12">
              {/* Content paragraphs */}
              <div
                className={`space-y-6 transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* First paragraph */}
                <div className="relative pl-6 md:pl-8">
                  <p className="text-base leading-relaxed text-foreground/80 md:text-lg md:leading-relaxed">
                    {aboutSection.paragraphs[0]}
                  </p>
                </div>

                {/* Second paragraph with accent bar */}
                <div className="relative pl-6 md:pl-8 border-l-2 border-foreground/10">
                  <p className="text-base leading-relaxed text-foreground/70 md:text-lg md:leading-relaxed">
                    {aboutSection.paragraphs[1]}
                  </p>
                </div>
              </div>

              {/* Stats - Brutal grid cards */}
              <div
                className={`mt-12 md:mt-16 transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '450ms' }}
              >
                {/* Separator line */}
                <div className="flex items-center gap-4 mb-8 md:mb-10">
                  <div className="h-px flex-1 bg-foreground/10" />
                  <div className="font-mono text-[9px] text-foreground/40 tracking-wider">METRICS</div>
                  <div className="h-px flex-1 bg-foreground/10" />
                </div>

                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  {aboutSection.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="group relative border border-foreground/10 p-4 md:p-6 hover:border-primary/30 transition-all duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    >
                      {/* Corner accents */}
                      <div
                        className={`absolute top-0 left-0 w-2 h-2 ${stat.accent ? 'bg-primary' : 'bg-accent'} opacity-50`}
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-2 h-2 ${stat.accent ? 'bg-primary' : 'bg-accent'} opacity-50`}
                      />

                      {/* Number with brutal styling */}
                      <div className="mb-3 md:mb-4">
                        <div
                          className={`font-mono text-4xl md:text-5xl lg:text-6xl font-bold leading-none transition-transform duration-300 group-hover:scale-105 ${
                            stat.accent ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          {stat.value}
                        </div>
                      </div>

                      {/* Label */}
                      <div className="flex items-center gap-2">
                        <div className={`h-px flex-1 ${stat.accent ? 'bg-primary/30' : 'bg-accent/30'}`} />
                      </div>
                      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-foreground/60 block mt-2">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
