import { problemsContent } from '@/data/lp-info'

const { sectionLabel, problems, transition } = problemsContent

export function Problems() {
  return (
    <section className="text-muted-foreground relative bg-background py-20 md:py-32">
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-2">
          <span className="text-[1.5rem] text-[#757575] tracking-tight ml-[15vw]">
            {sectionLabel}
          </span>
        </div>

        {/* Problem statement - big and bold */}
        <p className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
          {problems}
        </p>

        {/* Transition */}
        <div className="mt-20 md:mt-32 pt-12 border-t border-border">
          <p className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight">
            {transition.title}
          </p>
          <p className="mt-4 text-[0.9rem] md:text-xl tracking-tight max-w-md">
            {transition.subtitle}
          </p>
        </div>
      </div>
    </section>
  )
}
