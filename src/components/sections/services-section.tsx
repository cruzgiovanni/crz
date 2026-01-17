"use client"

import { useReveal } from "@/hooks/use-reveal"
import { skillsSection, skillCategories } from "@/data/info"
import { useState } from "react"

// Icon components for each category
const BackendIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <rect x="4" y="6" width="16" height="12" rx="1" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
    <line x1="8" y1="10" x2="16" y2="10" stroke={color} strokeWidth="1.5" opacity="0.7" />
    <line x1="8" y1="14" x2="16" y2="14" stroke={color} strokeWidth="1.5" opacity="0.7" />
  </svg>
)

const FrontendIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <rect x="3" y="5" width="18" height="14" rx="1" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
    <rect x="5" y="11" width="8" height="2" rx="0.5" fill={color} opacity="0.5" />
    <rect x="5" y="15" width="5" height="2" rx="0.5" fill={color} opacity="0.5" />
  </svg>
)

const BlockchainIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <rect x="6" y="8" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill={color} opacity="0.25" />
    <rect x="12" y="8" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill={color} opacity="0.25" />
    <rect x="9" y="14" width="6" height="6" rx="1" stroke={color} strokeWidth="1.5" fill={color} opacity="0.25" />
  </svg>
)

const DevOpsIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="12" cy="12" r="2.5" fill={color} opacity="0.4" />
  </svg>
)

const iconMap: Record<string, React.ComponentType<{ color: string }>> = {
  Backend: BackendIcon,
  Frontend: FrontendIcon,
  Blockchain: BlockchainIcon,
  DevOps: DevOpsIcon,
}

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const activeSkill = selectedCategory
    ? skillCategories.find((s) => s.title === selectedCategory) || skillCategories[0]
    : skillCategories[0]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 pb-20 md:px-12 md:pb-0 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-6 md:mb-12 transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl text-shadow-sm">
            {skillsSection.title}
          </h2>
          <p className="font-mono text-xs text-foreground/60 text-shadow-sm">
            {skillsSection.subtitle}
          </p>
        </div>

        {/* MOBILE: Minimal tabs (VSCode style) */}
        <div className="md:hidden mb-6">
          <div className="flex flex-wrap gap-4 border-b border-foreground/10">
            {skillCategories.map((skill, i) => {
              const isSelected = selectedCategory === skill.title || (!selectedCategory && i === 0)
              return (
                <button
                  key={i}
                  onClick={() => setSelectedCategory(skill.title)}
                  className={`relative pb-3 font-mono text-xs transition-all duration-200 ${
                    isSelected
                      ? "text-foreground"
                      : "text-foreground/50 hover:text-foreground/70"
                  }`}
                >
                  {skill.title}
                  {isSelected && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: skill.color }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* DESKTOP: Sidebar + Content | MOBILE: Content only */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:h-[500px]">
          {/* DESKTOP ONLY: Minimal sidebar */}
          <div className="hidden md:block shrink-0 md:w-48">
            <div className="border-l border-foreground/10 pl-4 h-full">
              <div className="mb-4 flex items-center gap-2">
                <span className="font-mono text-[9px] uppercase tracking-wider text-foreground/40">
                  Explorer
                </span>
              </div>
              <nav className="space-y-1">
                {skillCategories.map((skill, i) => {
                  const IconComponent = iconMap[skill.title] || BackendIcon
                  const isSelected = selectedCategory === skill.title || (!selectedCategory && i === 0)
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedCategory(skill.title)}
                      className={`group w-full flex items-center gap-2 px-2 py-1.5 text-left transition-all duration-150 ${
                        isSelected
                          ? "text-foreground"
                          : "text-foreground/60 hover:text-foreground/80"
                      }`}
                    >
                      <IconComponent color={skill.color} />
                      <span className="font-mono text-xs">
                        {skill.title}
                      </span>
                      {isSelected && (
                        <div
                          className="ml-auto h-1 w-1 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 md:h-full md:overflow-hidden">
            <div className="min-h-[500px] md:min-h-0 md:h-full md:overflow-y-auto">
              {/* File tab (desktop only) */}
              <div className="hidden md:flex mb-6 items-center gap-3 border-b border-foreground/10">
                <div className="flex items-center gap-2 pb-3 border-b-2" style={{ borderColor: activeSkill.color }}>
                  <span className="font-mono text-xs text-foreground/80">
                    {activeSkill.title}.tsx
                  </span>
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: activeSkill.color }}
                  />
                </div>
              </div>

              {/* Content area */}
              <div className="space-y-6">
                {/* Description */}
                <div className="border-l-2 pl-4" style={{ borderColor: activeSkill.color + "30" }}>
                  <p className="font-mono text-xs text-foreground/60 mb-1">
                    // Description
                  </p>
                  <p className="text-sm leading-relaxed text-foreground/80">
                    {activeSkill.description}
                  </p>
                </div>

                {/* Technologies */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-mono text-xs text-foreground/60">
                      // Technologies
                    </span>
                    <div className="flex-1 h-px bg-foreground/10" />
                  </div>

                  {/* Technologies grid - minimal */}
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                    {activeSkill.technologies.map((tech, techIndex) => (
                      <div
                        key={tech}
                        className="group relative border border-foreground/10 rounded-md p-2.5 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-200 cursor-default"
                        style={{
                          transitionDelay: `${techIndex * 20}ms`,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="h-1 w-1 rounded-full shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: activeSkill.color }}
                          />
                          <span className="font-mono text-xs text-foreground/90 group-hover:text-foreground transition-colors">
                            {tech}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}