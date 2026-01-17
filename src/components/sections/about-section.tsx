"use client"

import { MapPin } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { aboutSection, contactSection } from "@/data/info"

export function AboutSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8 lg:gap-16">
          {/* Left side - Large typography with accent */}
          <div className="md:col-span-5">
            <div
              className={`transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-12 opacity-0"
              }`}
            >
              <div className="mb-4 flex items-center gap-3 md:mb-6">
                <div className="h-8 w-px bg-linear-to-b from-primary to-transparent md:h-12" />
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary md:text-xs">
                  {aboutSection.label}
                </p>
              </div>
              <h2 className="mb-4 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-6 md:text-5xl lg:text-6xl text-shadow-sm">
                {aboutSection.title.line1}
                <br />
                <span className="text-primary">{aboutSection.title.line2}</span>
                <br />
                {aboutSection.title.line3}
              </h2>
            </div>

            <div
              className={`mt-8 transition-all duration-700 md:mt-12 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-foreground/50" />
                <span className="font-mono text-[10px] text-foreground/50 md:text-xs">
                  {contactSection.location.label}
                </span>
              </div>
              <p className="mt-1 text-sm text-foreground/70 md:mt-2 md:text-foreground/70">
                {contactSection.location.value}
              </p>
            </div>
          </div>

          {/* Right side - Content with refined typography */}
          <div className="md:col-span-7">
            <div
              className={`space-y-4 transition-all duration-700 md:space-y-6 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="relative">
                <span className="absolute -left-2 -top-2 font-serif text-4xl text-primary/20 md:-left-4 md:-top-4 md:text-6xl">
                  "
                </span>
                <p className="pl-3 text-sm leading-relaxed text-foreground/80 md:pl-4 md:text-lg">
                  {aboutSection.paragraphs[0]}
                </p>
              </div>
              <p className="pl-3 text-sm leading-relaxed text-foreground/80 md:pl-4 md:text-lg">
                {aboutSection.paragraphs[1]}
              </p>
            </div>

            <div
              className={`mt-8 grid grid-cols-2 gap-6 border-t border-foreground/10 pt-8 transition-all duration-700 md:mt-12 md:gap-8 md:pt-12 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: "450ms" }}
            >
              {aboutSection.stats.map((stat, i) => (
                <div key={i} className="group">
                  <div
                    className={`mb-1.5 font-sans text-4xl font-light transition-transform duration-300 group-hover:translate-x-1 md:mb-2 md:text-6xl ${
                      stat.accent ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-px w-3 md:w-4 ${stat.accent ? "bg-primary/50" : "bg-accent/50"}`}
                    />
                    <span className="font-mono text-[10px] text-foreground/50 md:text-xs">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
