"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { GraphiteWrite } from "@/components/graphite-write"
import { siteConfig } from "@/data/config"
import { hero, navItems } from "@/data/info"
import { Github, Linkedin } from "lucide-react"
import { useRef, useEffect, useState } from "react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | null>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      isScrollingRef.current = true
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
      setIsMobileMenuOpen(false)

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false
      }, 600)
    }
  }

  useEffect(() => {
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

      // Prioritize vertical swipe for section navigation
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 60) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      })
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY * 0.5,
          behavior: "smooth",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(
          scrollContainerRef.current.scrollLeft / sectionWidth,
        )
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
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

        if (
          newSection !== currentSection &&
          newSection >= 0 &&
          newSection <= 4
        ) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = null
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#cba6f7"
            colorB="#181825"
            speed={0.5}
            detail={0.9}
            blend={45}
            coarseX={35}
            coarseY={35}
            mediumX={45}
            mediumY={45}
            fineX={50}
            fineY={50}
          />
          <ChromaFlow
            baseColor="#16161e"
            upColor="#cba6f7"
            downColor="#11111b"
            leftColor="#94e2d5"
            rightColor="#89b4fa"
            intensity={0.75}
            radius={2.0}
            momentum={20}
            maskType="alpha"
            opacity={0.9}
          />
        </Shader>
        <div className="absolute inset-0 bg-[#11111b]/40" />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-3 transition-opacity duration-700 md:px-12 md:py-6 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Mobile grafite - substitui $ crz - apenas na home */}
          <div className="md:hidden w-24 ml-1 mt-3">
            <div className={currentSection === 0 ? "opacity-100" : "opacity-0"}>
              <GraphiteWrite />
            </div>
          </div>

          {/* Desktop logo */}
          <button
            onClick={() => scrollToSection(0)}
            className="hidden md:flex items-center gap-2 transition-transform"
          >
            <span className="font-mono text-lg font-medium tracking-tight text-foreground/80 md:text-xl">
              <span className="text-[#cba6f7]">$</span> crz
            </span>
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index
                  ? "text-foreground"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#cba6f7] transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative flex h-8 w-8 flex-col items-center justify-center md:hidden -mr-2"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute h-px w-4 bg-foreground transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "rotate-45 bg-primary" : "-translate-y-1"
            }`}
          />
          <span
            className={`absolute h-px w-4 bg-foreground transition-all duration-500 ease-out ${
              isMobileMenuOpen ? "-rotate-45 bg-primary" : "translate-y-1"
            }`}
          />
        </button>

        {/* Desktop social links */}
        <div className="hidden items-center gap-2 md:flex">
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

      {/* Mobile menu overlay - smooth unified transition */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-700 ease-out md:hidden ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop blur layer */}
        <div
          className={`absolute inset-0 bg-crust/98 backdrop-blur-xl transition-opacity duration-700 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`overflow-hidden py-3 font-sans text-3xl font-light transition-colors duration-300 ${
                currentSection === index
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              <span
                className="block transition-all duration-700 ease-out"
                style={{
                  transitionDelay: isMobileMenuOpen
                    ? `${100 + index * 60}ms`
                    : "0ms",
                  transform: isMobileMenuOpen
                    ? "translateY(0)"
                    : "translateY(100%)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                }}
              >
                {item}
              </span>
            </button>
          ))}

          {/* Subtle line separator */}
          <div
            className="my-6 h-px w-12 bg-foreground/10 transition-all duration-700"
            style={{
              transitionDelay: isMobileMenuOpen ? "400ms" : "0ms",
              transform: isMobileMenuOpen ? "scaleX(1)" : "scaleX(0)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          />

          {/* Current section indicator */}
          <p
            className="font-mono text-xs text-foreground/30 transition-all duration-700"
            style={{
              transitionDelay: isMobileMenuOpen ? "450ms" : "0ms",
              transform: isMobileMenuOpen
                ? "translateY(0)"
                : "translateY(20px)",
              opacity: isMobileMenuOpen ? 1 : 0,
            }}
          >
            {String(currentSection + 1).padStart(2, "0")} / 05
          </p>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        <section className="relative flex min-h-screen w-screen shrink-0 snap-start snap-always flex-col justify-end px-5 pb-14 pt-28 md:px-12 md:pb-24 md:pt-24">
          {/* Grafite desktop - canto inferior direito */}
          <div className="absolute bottom-24 right-12 hidden lg:block lg:right-16">
            <GraphiteWrite />
          </div>

          {/* Main content */}
          <div className="w-full max-w-3xl">
            <div className="mb-3 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-[#cba6f7]/50 bg-[#cba6f7]/15 px-4 py-1.5 backdrop-blur-md duration-700 md:mb-4 md:px-5 md:py-2">
              <p className="font-mono text-xs text-[#cba6f7] md:text-sm">
                {hero.badge}
              </p>
            </div>
            <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 sm:text-6xl md:mb-6 md:text-8xl lg:text-9xl text-shadow-sm">
              <span className="text-balance">
                {hero.name}
                <span
                  className="ml-1 inline-block w-0.75 bg-primary animate-blink md:ml-2 md:w-1"
                  style={{ height: "0.85em", verticalAlign: "baseline" }}
                />
              </span>
            </h1>
            <p className="mb-4 max-w-xl animate-in fade-in slide-in-from-bottom-4 leading-relaxed text-foreground/70 duration-1000 delay-200 md:mb-8 md:text-xl">
              <span className="text-pretty">{hero.description}</span>
            </p>

            {/* Code-style call to action - mobile e desktop */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              <button
                onClick={() => scrollToSection(1)}
                className="group flex items-center gap-2 transition-all duration-300 hover:gap-3"
              >
                <span className="font-mono text-sm md:text-lg">
                  <span className="text-primary">{hero.cta.keyword}</span>{" "}
                  <span className="text-foreground/90">{hero.cta.object}</span>
                  <span className="text-foreground/40">.</span>
                  <span className="text-accent transition-colors group-hover:text-accent/80">
                    {hero.cta.method}
                  </span>
                  <span className="text-foreground/40">()</span>
                </span>
                <span className="text-foreground/40 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </section>

        <WorkSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </div>

      {/* Mobile section indicators */}
      <div
        className={`fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 transition-opacity duration-500 md:hidden ${
          isLoaded && !isMobileMenuOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {navItems.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentSection === index
                ? "w-6 bg-primary"
                : "w-1.5 bg-foreground/30"
            }`}
          />
        ))}
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
