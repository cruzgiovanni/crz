'use client'

import { useReveal } from '@/hooks/use-reveal'

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-16 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Core Skills
          </h2>
          <p className="font-mono text-xs text-foreground/50 md:text-sm">/ Technologies I work with</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-12 lg:gap-16">
          {[
            {
              title: 'Backend',
              description: 'TypeScript, Bun, Node.js, ORMs, PostgreSQL, MongoDB, BaaS Platforms',
              direction: 'top',
            },
            {
              title: 'Frontend',
              description: 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion',
              direction: 'right',
            },
            {
              title: 'Blockchain',
              description: 'Solidity, Hardhat, Ethereum',
              direction: 'left',
            },
            {
              title: 'DevOps',
              description: 'Docker, CI/CD, AWS, Vercel, Linux',
              direction: 'bottom',
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-1.5 transition-all duration-700 md:mt-16 md:gap-2 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            'TypeScript',
            'Bun',
            'Node.js',
            'PostgreSQL',
            'MongoDB',
            'Prisma',
            'Drizzle',
            'Supabase',
            'Firebase',
            'React',
            'Next.js',
            'Tailwind CSS',
            'Framer Motion',
            'Solidity',
            'Hardhat',
            'Ethereum',
            'Docker',
            'AWS',
            'Vercel',
            'Linux',
            'Git',
          ].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-foreground/15 bg-foreground/5 px-2.5 py-1 font-mono text-[10px] text-foreground/70 md:px-3 md:text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case 'left':
          return '-translate-x-8 opacity-0 md:-translate-x-16'
        case 'right':
          return 'translate-x-8 opacity-0 md:translate-x-16'
        case 'top':
          return '-translate-y-8 opacity-0 md:-translate-y-16'
        case 'bottom':
          return 'translate-y-8 opacity-0 md:translate-y-16'
        default:
          return 'translate-y-8 opacity-0 md:translate-y-12'
      }
    }
    return 'translate-x-0 translate-y-0 opacity-100'
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="mb-2 flex items-center gap-3 md:mb-3">
        <div className="h-px w-4 bg-foreground/30 transition-all duration-300 group-hover:w-8 group-hover:bg-foreground/50 md:w-6 md:group-hover:w-10" />
        <span className="font-mono text-[10px] text-foreground/50 md:text-xs">0{index + 1}</span>
      </div>
      <h3 className="mb-1.5 font-sans text-xl font-light text-foreground md:mb-2 md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-xs leading-relaxed text-foreground/70 md:text-sm">{service.description}</p>
    </div>
  )
}
