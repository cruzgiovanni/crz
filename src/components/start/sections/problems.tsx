'use client'

import { problemsContent } from '@/data/lp-info'

const { sectionLabel, problems, transition } = problemsContent

export function Problems() {
  return (
    <section className="text-muted-foreground relative bg-background py-12 md:py-20">
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-6">
          <span className="text-[1.5rem] text-[#757575] tracking-tight">
            {sectionLabel}
          </span>
        </div>

        {/* Problems */}
        <div className="max-w-2xl space-y-6 ">
          <p className="text-[0.9rem] md:text-xl tracking-tight">{problems}</p>
        </div>

        {/* Transition */}
        <div className="mt-12 pt-12 border-t border-border ">
          <p className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {transition.title}
          </p>
          <p className="mt-3 text-[0.9rem] md:text-xl tracking-tight max-w-md">
            {transition.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
