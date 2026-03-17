'use client'

import { problemsContent } from '@/data/lp-info'

const { sectionLabel, problems, transition } = problemsContent

export function Problems() {
  return (
    <section className="relative bg-background py-12 md:py-20">
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-6">
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{sectionLabel}</span>
        </div>

        {/* Problems */}
        <div className="max-w-2xl space-y-6">
          {problems.map((problem, index) => (
            <p
              key={index}
              className="md:text-lg text-muted-foreground leading-relaxed tracking-tight"
            >
              {problem}
            </p>
          ))}
        </div>

        {/* Transition */}
        <div className="mt-12 pt-12 border-t border-border">
          <p className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            {transition.title}
          </p>
          <p className="mt-3 text-muted-foreground text-xs md:text-sm max-w-md">
            {transition.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
