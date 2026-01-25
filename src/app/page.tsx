'use client'

import { DesktopSection } from '@/components/desktop/desktop-section'
import { GraphiteWrite } from '@/components/graphite-write'
import { siteConfig } from '@/data/config'
import { hero, navItems } from '@/data/info'
import { Github, Linkedin } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

const TOTAL_SECTIONS = navItems.length

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | null>(null)
  const isScrollingRef = useRef(false)

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      isScrollingRef.current = true
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: 'smooth',
      })
      setCurrentSection(index)
      setIsMobileMenuOpen(false)

      setTimeout(() => {
        isScrollingRef.current = false
      }, 600)
    }
  }

  // Touch handlers - only for desktop
  useEffect(() => {
    if (isMobile) return

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return

      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 60) {
        if (deltaY > 0 && currentSection < TOTAL_SECTIONS - 1) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true })
      container.addEventListener('touchmove', handleTouchMove, { passive: false })
      container.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart)
        container.removeEventListener('touchmove', handleTouchMove)
        container.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [currentSection, isMobile])

  // Wheel handler - only for desktop
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY * 0.5,
          behavior: 'smooth',
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel)
      }
    }
  }, [currentSection, isMobile])

  // Scroll handler - only for desktop
  useEffect(() => {
    if (isMobile) return

    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = null
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection < TOTAL_SECTIONS) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = null
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection, isMobile])

  // Mobile: render only the Macintosh
  if (isMobile) {
    return (
      <main className="relative w-full overflow-hidden bg-background" style={{ height: '100dvh' }}>
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: '#191919' }}
        />
        <div
          className={`relative z-10 h-full w-full transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <DesktopSection isMobileFullscreen />
        </div>
      </main>
    )
  }

  // Desktop: render both pages with horizontal scroll
  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <div
        ref={backgroundRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className="absolute inset-0"
          style={{
            background: '#191919',
          }}
        />
      </div>

      {/* Navbar - Desktop only */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-12 py-3 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-4" />

        {/* Desktop nav */}
        <div className="flex items-center gap-8">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                  currentSection === index ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Desktop social links */}
        <div className="flex items-center gap-2">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10"
          >
            <Github className="h-4 w-4 text-foreground/50 transition-colors duration-300 group-hover:text-foreground/70" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/10"
          >
            <Linkedin className="h-4 w-4 text-foreground/50 transition-colors duration-300 group-hover:text-foreground/70" />
          </a>
        </div>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory',
        }}
      >
        {/* Home Section */}
        <section className="relative flex min-h-screen w-screen shrink-0 snap-start snap-always flex-col justify-end px-12 pb-24 pt-24">
          <div className="absolute bottom-24 right-12 hidden lg:block lg:right-16">
            <GraphiteWrite />
          </div>

          <div className="w-full max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-primary/50 bg-primary/15 px-5 py-2 backdrop-blur-md duration-700">
              <p className="font-mono text-sm text-primary">{hero.badge}</p>
            </div>
            <h1 className="mb-6 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-8xl lg:text-9xl text-shadow-sm">
              <span className="text-balance">
                {hero.name}
                <span
                  className="ml-2 inline-block w-1 bg-primary animate-blink"
                  style={{ height: '0.85em', verticalAlign: 'baseline' }}
                />
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 leading-relaxed text-foreground/70 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">{hero.intro}</span>
            </p>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <button
                onClick={() => scrollToSection(1)}
                className="group flex items-center gap-2 transition-all duration-300 hover:gap-3"
              >
                <span className="font-mono text-lg">
                  <span className="text-primary">{hero.cta.keyword}</span>{' '}
                  <span className="text-foreground/90">{hero.cta.object}</span>
                  <span className="text-foreground/40">.</span>
                  <span className="text-accent transition-colors group-hover:text-accent/80">{hero.cta.method}</span>
                  <span className="text-foreground/40">()</span>
                </span>
                <span className="text-foreground/40 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        <DesktopSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
