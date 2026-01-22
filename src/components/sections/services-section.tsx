'use client'

import { useReveal } from '@/hooks/use-reveal'
import { skillsSection } from '@/data/info'
import { useState, useEffect } from 'react'

// Ícones SVG pixel art style
const FolderIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 32 32" className="w-16 h-16 md:w-20 md:h-20">
    <rect x="4" y="8" width="24" height="18" fill="none" stroke={color} strokeWidth="2" />
    <path d="M4 8 L4 6 L14 6 L16 8 Z" fill={color} opacity="0.3" />
    <rect x="4" y="8" width="24" height="4" fill={color} opacity="0.5" />
  </svg>
)

const FileIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 16 16" className="w-4 h-4">
    <rect x="3" y="2" width="10" height="12" fill="none" stroke={color} strokeWidth="1.5" />
    <line x1="5" y1="5" x2="11" y2="5" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="5" y1="8" x2="11" y2="8" stroke={color} strokeWidth="1.5" opacity="0.6" />
    <line x1="5" y1="11" x2="9" y2="11" stroke={color} strokeWidth="1.5" opacity="0.6" />
  </svg>
)

// Skills organizadas
const folders = [
  {
    name: 'Languages',
    color: '#cba6f7', // primary
    files: ['TypeScript', 'JavaScript', 'Solidity'],
  },
  {
    name: 'Backend',
    color: '#89b4fa', // blue
    files: ['Node.js', 'PostgreSQL', 'MongoDB'],
  },
  {
    name: 'Frontend',
    color: '#94e2d5', // accent
    files: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    name: 'Tools',
    color: '#fab387', // peach
    files: ['Docker', 'Git', 'Linux', 'AWS'],
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const [bootStage, setBootStage] = useState(0)
  const [currentTime, setCurrentTime] = useState('')

  // Boot sequence
  useEffect(() => {
    if (!isVisible) return

    const stages = [
      { delay: 0, stage: 1 }, // Boot text
      { delay: 800, stage: 2 }, // System OK
      { delay: 1400, stage: 3 }, // Desktop loaded
    ]

    stages.forEach(({ delay, stage }) => {
      setTimeout(() => setBootStage(stage), delay)
    })
  }, [isVisible])

  // Relógio
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const openedFolder = folders.find((f) => f.name === openFolder)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 pb-20 md:px-12 md:pb-0 md:pt-0 lg:px-16 relative"
    >
      <div className="mx-auto w-full max-w-6xl relative">
        {/* Macintosh Classic shell */}
        <div className="relative bg-[#e8e4d9] rounded-[24px] p-6 md:p-8 shadow-2xl border-4 border-[#3a3a3a]">
          {/* Bezel interno */}
          <div className="bg-[#2a2a2a] rounded-[16px] p-3 md:p-4 shadow-inner">
            {/* Screen - CRT effect */}
            <div className="bg-[#0a0a0a] rounded-[8px] aspect-[4/3] relative overflow-hidden">
              {/* Scanlines */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#fff_2px,#fff_4px)]" />

              {/* Screen glow */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/30 pointer-events-none" />

              {/* Boot sequence */}
              {bootStage < 3 ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  {bootStage >= 1 && (
                    <div className="font-mono text-sm md:text-base text-green-500 space-y-2 animate-in fade-in duration-500">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
                        <span>INITIALIZING SYSTEM...</span>
                      </div>
                      {bootStage >= 2 && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center gap-2 text-green-400">
                            <span>✓</span>
                            <span>LOADING SKILLS DATABASE</span>
                          </div>
                          <div className="flex items-center gap-2 text-green-400 mt-1">
                            <span>✓</span>
                            <span>SYSTEM READY</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* Desktop Interface */
                <div className="absolute inset-0 flex flex-col animate-in fade-in duration-700">
                  {/* Menu bar - Macintosh style */}
                  <div className="bg-white border-b-2 border-black px-3 py-1 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4 font-mono text-xs md:text-sm">
                      <div className="font-bold">⌘</div>
                      <div className="text-black">{skillsSection.title}</div>
                    </div>
                    <div className="font-mono text-xs text-black">{currentTime}</div>
                  </div>

                  {/* Desktop area */}
                  <div className="flex-1 p-4 md:p-8 overflow-auto">
                    {!openFolder ? (
                      /* Folders on desktop */
                      <div>
                        <div className="font-mono text-xs md:text-sm text-white/60 mb-4 md:mb-6">
                          Double-click to open
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                          {folders.map((folder, i) => (
                            <button
                              key={folder.name}
                              onDoubleClick={() => setOpenFolder(folder.name)}
                              onClick={(e) => {
                                if (e.detail === 2) setOpenFolder(folder.name)
                              }}
                              className="group flex flex-col items-center gap-2 md:gap-3 p-3 md:p-4 hover:bg-white/5 rounded-lg transition-all duration-300"
                              style={{
                                animationDelay: `${i * 100}ms`,
                                opacity: 0,
                                animation: 'fade-in 0.5s ease-out forwards',
                              }}
                            >
                              <div className="transform group-hover:scale-110 transition-transform duration-300">
                                <FolderIcon color={folder.color} />
                              </div>
                              <div
                                className="font-mono text-xs md:text-sm text-center px-2 py-1 rounded"
                                style={{
                                  backgroundColor: 'rgba(0,0,0,0.6)',
                                  color: folder.color,
                                }}
                              >
                                {folder.name}
                              </div>
                              <div className="font-mono text-[10px] text-white/40">{folder.files.length} items</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Opened window */
                      <div className="max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
                        {/* Window frame */}
                        <div className="bg-white border-2 border-black shadow-2xl">
                          {/* Title bar */}
                          <div
                            className="border-b-2 border-black p-2 md:p-3 flex items-center justify-between"
                            style={{ backgroundColor: openedFolder?.color }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="transform scale-75">
                                <FolderIcon color="#000" />
                              </div>
                              <span className="font-mono text-sm md:text-base font-bold text-black">
                                {openedFolder?.name}
                              </span>
                            </div>
                            <button
                              onClick={() => setOpenFolder(null)}
                              className="w-6 h-6 md:w-7 md:h-7 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors font-mono text-sm md:text-base font-bold flex items-center justify-center"
                            >
                              ×
                            </button>
                          </div>

                          {/* Window content */}
                          <div className="bg-white p-4 md:p-6">
                            <div className="space-y-2 md:space-y-3">
                              {openedFolder?.files.map((file, i) => (
                                <div
                                  key={file}
                                  className="flex items-center gap-3 p-3 md:p-4 border-2 border-black/10 hover:border-black/30 hover:bg-gray-50 transition-all duration-300 group"
                                  style={{
                                    animationDelay: `${i * 60}ms`,
                                    opacity: 0,
                                    animation: 'fade-in 0.3s ease-out forwards',
                                  }}
                                >
                                  <FileIcon color={openedFolder.color} />
                                  <span className="font-mono text-sm md:text-base text-black group-hover:translate-x-1 transition-transform">
                                    {file}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Window footer */}
                          <div className="border-t-2 border-black p-2 md:p-3 bg-gray-100">
                            <div className="flex items-center justify-between font-mono text-xs md:text-sm text-black/60">
                              <div>{openedFolder?.files.length} files</div>
                              <button
                                onClick={() => setOpenFolder(null)}
                                className="hover:text-black transition-colors"
                              >
                                Close [ESC]
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom bar */}
                  <div className="bg-white border-t-2 border-black px-3 py-1 font-mono text-xs text-black shrink-0">
                    <div className="flex items-center justify-between">
                      <div>{openFolder ? `Viewing: ${openFolder}` : `${folders.length} folders available`}</div>
                      <div className="hidden md:block text-black/60">{skillsSection.subtitle}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mac logo bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 bg-[#3a3a3a] rounded-sm flex items-center justify-center">
            <div className="text-[#e8e4d9] font-bold text-lg md:text-xl">⌘</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
