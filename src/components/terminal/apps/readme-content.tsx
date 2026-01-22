'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, MapPin, ExternalLink, Code } from 'lucide-react'
import { skillCategories, aboutSection, projects, hero, contactSection } from '@/data/info'
import { siteConfig } from '@/data/config'

type Page = 'home' | 'about' | 'skills' | 'projects' | 'contact'

export function ReadmeContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'contact', label: 'CONTACT' },
  ]

  return (
    <div className="flex h-full min-h-full" style={{ fontFamily: "'Millennium', monospace" }}>
      {/* ========== SIDEBAR ========== */}
      <aside className="w-40 md:w-48 shrink-0 flex flex-col pt-6 md:pt-8 px-4 md:px-5 border-r border-[#c0c0c0] bg-white">
        {/* Logo/Name */}
        <div className="mb-8 md:mb-10">
          <h2
            className="text-2xl md:text-3xl text-[#2a2a2a] leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700 }}
          >
            Giovanni
            <br />
            Cruz
          </h2>
          <p className="text-sm md:text-base text-[#888888] mt-2">Portfolio &apos;25</p>
        </div>

        {/* Nav Links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-left text-base md:text-lg transition-colors flex items-center gap-2 py-1 cursor-pointer ${
                currentPage === item.id ? 'text-[#000000] font-bold' : 'text-[#000066] hover:text-[#0000cc]'
              }`}
            >
              {currentPage === item.id && <span className="text-[#000066]">○</span>}
              <span className={currentPage === item.id ? 'underline' : ''}>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-6 md:px-8 py-6 md:py-8 bg-white">
        {/* ========== HOME PAGE ========== */}
        {currentPage === 'home' && (
          <div className="animate-in fade-in duration-300">
            <h1
              className="text-5xl md:text-6xl text-[#2a2a2a] mb-3"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700 }}
            >
              Welcome
            </h1>
            <p
              className="text-xl md:text-2xl text-[#2a2a2a] italic mb-6"
              style={{ fontFamily: 'var(--font-display), serif' }}
            >
              I&apos;m {hero.name}
            </p>

            {/* Photo */}
            <div className="float-right ml-6 mb-4">
              <div className="w-32 h-32 md:w-40 md:h-40 border-2 border-[#cccccc] p-1 bg-[#f5f5f5]">
                <Image
                  src="/me.avif"
                  alt="Giovanni Cruz"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
            </div>

            <p className="text-lg md:text-xl text-[#1a1a1a] leading-relaxed mb-6 text-justify">{hero.description}</p>

            <p className="text-base md:text-lg text-[#333333] leading-relaxed mb-6 text-justify">
              Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it as much as I
              enjoyed building it. If you have any questions or comments, feel free to contact me using the links below
              or shoot me an email at{' '}
              <a
                href={`mailto:${contactSection.email.value}`}
                className="text-[#000066] underline hover:text-[#0000cc]"
              >
                {contactSection.email.value}
              </a>
            </p>

            <div className="clear-both" />
          </div>
        )}

        {/* ========== ABOUT PAGE ========== */}
        {currentPage === 'about' && (
          <div className="animate-in fade-in duration-300">
            <h1
              className="text-5xl md:text-6xl text-[#2a2a2a] mb-6"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700 }}
            >
              About Me
            </h1>

            {/* Photo */}
            <div className="float-left mr-6 mb-4">
              <div className="w-36 h-36 md:w-44 md:h-44 border-2 border-[#cccccc] p-1 bg-[#f5f5f5]">
                <Image
                  src="/me.avif"
                  alt="Giovanni Cruz"
                  width={176}
                  height={176}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4 text-base md:text-lg text-[#1a1a1a] leading-relaxed text-justify">
              {aboutSection.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="clear-both" />

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-[#e0e0e0]">
              <h2
                className="text-xl md:text-2xl font-bold text-[#2a2a2a] mb-4"
                style={{ fontFamily: "'Millennium', monospace" }}
              >
                Quick Facts
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {aboutSection.stats.map((stat, i) => (
                  <div key={i} className="text-center p-4 bg-[#f8f8f8] border border-[#e0e0e0]">
                    <p className="text-2xl md:text-3xl font-bold text-[#000066]">{stat.value}</p>
                    <p className="text-sm md:text-base text-[#666666]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== SKILLS PAGE ========== */}
        {currentPage === 'skills' && (
          <div className="animate-in fade-in duration-300">
            <h1
              className="text-5xl md:text-6xl text-[#2a2a2a] mb-6"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700 }}
            >
              Skills
            </h1>

            <div className="space-y-8">
              {skillCategories.map((category) => (
                <div key={category.title} className="pb-6 border-b border-[#e0e0e0] last:border-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                    <h2
                      className="text-2xl md:text-3xl font-bold text-[#2a2a2a]"
                      style={{ fontFamily: "'Millennium', monospace" }}
                    >
                      {category.title}
                    </h2>
                  </div>
                  <p className="text-base md:text-lg text-[#666666] mb-4">{category.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {category.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm md:text-base text-[#1a1a1a] bg-[#f0f0f0] border border-[#d0d0d0] hover:bg-[#e8e8e8] transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== PROJECTS PAGE ========== */}
        {currentPage === 'projects' && (
          <div className="animate-in fade-in duration-300">
            <h1
              className="text-5xl md:text-6xl text-[#2a2a2a] mb-6"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700 }}
            >
              Projects
            </h1>

            <div className="space-y-6">
              {projects.map((project) => (
                <div
                  key={project.title}
                  className="p-5 bg-[#fafafa] border border-[#e0e0e0] hover:border-[#cccccc] hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h2
                      className="text-xl md:text-2xl font-bold text-[#2a2a2a]"
                      style={{ fontFamily: "'Millennium', monospace" }}
                    >
                      {project.title}
                    </h2>
                    <span className="text-sm md:text-base text-[#888888] bg-[#f0f0f0] px-2 py-1">{project.year}</span>
                  </div>
                  <p className="md:text-lg text-[#444444] mb-2">{project.category}</p>
                  <p className="text-sm md:text-base text-[#666666] mb-4">{project.tech}</p>
                  <div className="flex gap-3">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base text-[#333333] bg-[#ffffff] border border-[#333333] hover:bg-[#f5f5f5] transition-colors"
                      >
                        <Code size={18} />
                        Source Code
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm md:text-base text-[#333333] bg-[#ffffff] border border-[#333333] hover:bg-[#f5f5f5] transition-colors"
                      >
                        <ExternalLink size={18} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CONTACT PAGE ========== */}
        {currentPage === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <h1
              className="text-5xl md:text-6xl text-[#2a2a2a] mb-6"
              style={{ fontFamily: 'var(--font-display), serif', fontWeight: 700 }}
            >
              Contact
            </h1>

            <p className="text-base md:text-lg text-[#444444] mb-8">
              Feel free to reach out! I&apos;m always open to discussing new projects, creative ideas, or opportunities.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <a
                href={`mailto:${contactSection.email.value}`}
                className="flex items-center gap-4 p-4 bg-[#fafafa] border border-[#e0e0e0] hover:border-[#000066] hover:bg-[#f5f5ff] transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-[#000066] text-white group-hover:bg-[#0000aa] transition-colors">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm md:text-base text-[#666666]">{contactSection.email.label}</p>
                  <p className="text-lg md:text-xl text-[#000066] font-bold">{contactSection.email.value}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-[#fafafa] border border-[#e0e0e0]">
                <div className="w-12 h-12 flex items-center justify-center bg-[#666666] text-white">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm md:text-base text-[#666666]">{contactSection.location.label}</p>
                  <p className="text-lg md:text-xl text-[#1a1a1a] font-bold">{contactSection.location.value}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2
                className="text-xl md:text-2xl font-bold text-[#2a2a2a] mb-4"
                style={{ fontFamily: "'Millennium', monospace" }}
              >
                Find me on
              </h2>
              <div className="flex gap-4">
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 text-base md:text-lg border border-gray-50000  bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Github size={24} />
                  GitHub
                </a>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 text-base md:text-lg border border-gray-50000  bg-[#0077b5]/70 hover:bg-[#005c8f]/50 transition-colors"
                >
                  <Linkedin size={24} />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-[#e0e0e0] text-center text-sm md:text-base text-[#888888]">
          © {new Date().getFullYear()} Giovanni Cruz
        </footer>
      </main>
    </div>
  )
}
