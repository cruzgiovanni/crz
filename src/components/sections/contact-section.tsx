"use client"

import { Mail } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { contactSection } from "@/data/info"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const year = new Date().getFullYear()

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl text-shadow-sm">
            {contactSection.title}
          </h2>
          <p className="font-mono text-[10px] text-foreground/50 md:text-sm">
            {contactSection.subtitle}
          </p>
        </div>

        <div className="mt-12 space-y-6 md:mt-16 md:space-y-8">
          <a
            href={`mailto:${contactSection.email.value}`}
            className={`group block transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-16 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="mb-2 flex items-center gap-2 md:mb-3">
              <Mail className="h-3 w-3 text-foreground/50" />
              <span className="font-mono text-[10px] text-foreground/50 md:text-xs">
                {contactSection.email.label}
              </span>
            </div>
            <p className="text-sm text-foreground transition-colors group-hover:text-foreground/70 md:text-xl">
              {contactSection.email.value}
            </p>
          </a>

          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "350ms" }}
          >
            <p className="font-mono text-[10px] text-foreground/60 md:text-xs">
              © {year} Giovanni Cruz
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
