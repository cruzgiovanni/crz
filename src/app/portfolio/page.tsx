'use client'

import { DesktopSection } from '@/components/desktop/desktop-section'
import { siteConfig } from '@/data/config'
import { Github, Linkedin } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const backgroundRef = useRef<HTMLDivElement>(null)

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

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-end px-12 py-3 transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
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
        className={`relative z-10 flex h-screen overflow-hidden transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
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
