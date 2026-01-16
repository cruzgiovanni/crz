"use client"

import { useReveal } from "@/hooks/use-reveal"
import { projects, projectsSection } from "@/data/info"

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 md:px-12 md:pt-20 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 transition-all duration-700 md:mb-10 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl text-shadow-sm">
            {projectsSection.title}
          </h2>
          <p className="font-mono text-xs text-foreground text-shadow-sm">
            {projectsSection.subtitle}
          </p>
        </div>

        <div className="space-y-4 md:space-y-4">
          {projects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isVisible={isVisible}
            />
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
  project: {
    number: string
    title: string
    category: string
    year: string
    tech: string
    direction: "left" | "right"
  }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left"
        ? "-translate-x-8 opacity-0 md:-translate-x-16"
        : "translate-x-8 opacity-0 md:translate-x-16"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group border-b border-foreground/10 py-4 transition-all duration-700 hover:border-foreground/20 md:py-5 ${getRevealClass()}`}
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
          <span className="font-mono text-[10px] text-foreground/30">
            {project.year}
          </span>
        </div>
        <div className="ml-8">
          <p className="font-mono text-[11px] text-foreground/50">
            {project.category}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-foreground/40">
            {project.tech}
          </p>
        </div>
      </div>

      {/* Desktop layout - horizontal */}
      <div
        className="hidden items-center justify-between md:flex"
        style={{
          marginLeft: index % 2 === 0 ? "0" : "auto",
          maxWidth: index % 2 === 0 ? "85%" : "90%",
        }}
      >
        <div className="flex items-baseline gap-8">
          <span className="font-mono text-foreground/30 transition-colors group-hover:text-foreground/50">
            {project.number}
          </span>
          <div>
            <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 lg:text-3xl">
              {project.title}
            </h3>
            <p className="font-mono text-sm text-foreground/50">
              {project.category}
            </p>
            <p className="mt-1 font-mono text-xs text-foreground/40">
              {project.tech}
            </p>
          </div>
        </div>
        <span className="font-mono text-sm text-foreground/30">
          {project.year}
        </span>
      </div>
    </div>
  )
}
