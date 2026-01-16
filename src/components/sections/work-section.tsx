'use client'

import { useReveal } from '@/hooks/use-reveal'

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-16 ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Projects
          </h2>
          <p className="font-mono text-xs text-foreground">/ Check out my latest work</p>
        </div>

        <div className="space-y-4 md:space-y-8">
          {[
            {
              number: '01',
              title: 'Solution Card',
              category: 'Digital Health Platform',
              year: '07/2025',
              tech: 'Next.js • Tailwind CSS • Framer Motion',
              direction: 'left',
            },
            {
              number: '02',
              title: 'Book SaaS',
              category: 'SaaS with Auth & Subscriptions',
              year: '02/2025',
              tech: 'Next.js • Prisma • Stripe • NextAuth',
              direction: 'right',
            },
            {
              number: '03',
              title: 'Delivery FSW',
              category: 'Real-time Delivery System',
              year: '02/2025',
              tech: 'Next.js • Prisma • NeonDB • Stripe',
              direction: 'left',
            },
            {
              number: '04',
              title: 'Piva Insurances',
              category: 'Insurance Management Platform',
              year: '11/2024',
              tech: 'React • Pocketbase • Shadcn UI',
              direction: 'right',
            },
          ].map((project, i) => (
            <ProjectCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: { number: string; title: string; category: string; year: string; tech: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === 'left'
        ? '-translate-x-8 opacity-0 md:-translate-x-16'
        : 'translate-x-8 opacity-0 md:translate-x-16'
    }
    return 'translate-x-0 opacity-100'
  }

  return (
    <div
      className={`group border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Mobile layout - stacked */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-foreground/30 transition-colors group-hover:text-foreground/50">
              {project.number}
            </span>
            <h3 className="font-sans text-xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-1">
              {project.title}
            </h3>
          </div>
          <span className="font-mono text-[10px] text-foreground/30">{project.year}</span>
        </div>
        <div className="ml-8">
          <p className="font-mono text-[11px] text-foreground/50">{project.category}</p>
          <p className="mt-0.5 font-mono text-[10px] text-foreground/40">{project.tech}</p>
        </div>
      </div>

      {/* Desktop layout - horizontal */}
      <div
        className="hidden items-center justify-between md:flex"
        style={{
          marginLeft: index % 2 === 0 ? '0' : 'auto',
          maxWidth: index % 2 === 0 ? '85%' : '90%',
        }}
      >
        <div className="flex items-baseline gap-8">
          <span className="font-mono text-foreground/30 transition-colors group-hover:text-foreground/50">
            {project.number}
          </span>
          <div>
            <h3 className="mb-1 font-sans text-3xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 lg:text-4xl">
              {project.title}
            </h3>
            <p className="font-mono text-sm text-foreground/50">{project.category}</p>
            <p className="mt-1 font-mono text-xs text-foreground/40">{project.tech}</p>
          </div>
        </div>
        <span className="font-mono text-sm text-foreground/30">{project.year}</span>
      </div>
    </div>
  )
}
