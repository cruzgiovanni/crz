'use client'

import { useReveal } from '@/hooks/use-reveal'
import { skillCategories, aboutSection, projects, hero, contactSection } from '@/data/info'
import { siteConfig } from '@/data/config'
import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'

// Types
interface WindowState {
  id: string
  title: string
  icon: string
  content: React.ReactNode
  isOpen: boolean
  isMinimized: boolean
  isMaximized: boolean
  zIndex: number
  position: { x: number; y: number }
  size: { width: number; height: number }
}

// Classic Windows 98 style button
function Win98Button({
  children,
  onClick,
  className = '',
  active = false,
  variant = 'default',
}: {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  active?: boolean
  variant?: 'default' | 'title'
}) {
  const baseStyle =
    variant === 'title'
      ? 'w-[18px] h-[16px] md:w-[20px] md:h-[18px] flex items-center justify-center text-[11px] md:text-xs leading-none'
      : 'px-4 py-1.5 text-sm'

  return (
    <button
      onClick={onClick}
      className={`
        ${baseStyle}
        font-['Tahoma',_sans-serif]
        ${
          active
            ? 'border-t-[#505050] border-l-[#505050] border-b-[#dfdfdf] border-r-[#dfdfdf] bg-[#c0c0c0]'
            : 'border-t-[#dfdfdf] border-l-[#dfdfdf] border-b-[#505050] border-r-[#505050] bg-[#c0c0c0]'
        }
        border-2
        active:border-t-[#505050] active:border-l-[#505050] active:border-b-[#dfdfdf] active:border-r-[#dfdfdf]
        text-black
        ${className}
      `}
    >
      {children}
    </button>
  )
}

// Window Component with resize functionality
function Window98({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDrag,
  onResize,
  isMobile,
  containerRef,
}: {
  window: WindowState
  onClose: () => void
  onMinimize: () => void
  onMaximize: () => void
  onFocus: () => void
  onDrag: (x: number, y: number) => void
  onResize: (width: number, height: number) => void
  isMobile: boolean
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const isDragging = useRef(false)
  const isResizing = useRef<string | null>(null)
  const dragOffset = useRef({ x: 0, y: 0 })
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0 })
  const contentRef = useRef<HTMLDivElement>(null)

  // Completely prevent scroll propagation
  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()

      const { scrollTop, scrollHeight, clientHeight } = content
      const isAtTop = scrollTop <= 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight

      if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      e.stopPropagation()
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.stopPropagation()

      const { scrollTop, scrollHeight, clientHeight } = content
      const isAtTop = scrollTop <= 0
      const isAtBottom = scrollTop + clientHeight >= scrollHeight

      const touch = e.touches[0]
      const startY = (content as HTMLDivElement & { _touchStartY?: number })._touchStartY || touch.clientY
      const deltaY = startY - touch.clientY

      if ((deltaY < 0 && isAtTop) || (deltaY > 0 && isAtBottom)) {
        e.preventDefault()
      }
    }

    const handleTouchStartRecord = (e: TouchEvent) => {
      ;(content as HTMLDivElement & { _touchStartY?: number })._touchStartY = e.touches[0].clientY
    }

    content.addEventListener('wheel', handleWheel, { passive: false })
    content.addEventListener('touchstart', handleTouchStartRecord, { passive: true })
    content.addEventListener('touchstart', handleTouchStart, { passive: false })
    content.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      content.removeEventListener('wheel', handleWheel)
      content.removeEventListener('touchstart', handleTouchStartRecord)
      content.removeEventListener('touchstart', handleTouchStart)
      content.removeEventListener('touchmove', handleTouchMove)
    }
  }, [win.isOpen])

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    if (win.isMaximized || isMobile) return
    isDragging.current = true
    dragOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    }
    onFocus()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if ((e.target as HTMLElement).closest('button')) return
    if (win.isMaximized || isMobile) return
    isDragging.current = true
    dragOffset.current = {
      x: e.touches[0].clientX - win.position.x,
      y: e.touches[0].clientY - win.position.y,
    }
    onFocus()
  }

  // Resize handlers
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (isMobile || win.isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    isResizing.current = direction
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: win.size.width,
      height: win.size.height,
    }
    onFocus()
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.clientX - dragOffset.current.x, rect.width - 100))
        const y = Math.max(0, Math.min(e.clientY - dragOffset.current.y, rect.height - 50))
        onDrag(x, y)
      }

      if (isResizing.current) {
        const deltaX = e.clientX - resizeStart.current.x
        const deltaY = e.clientY - resizeStart.current.y
        const dir = isResizing.current

        let newWidth = resizeStart.current.width
        let newHeight = resizeStart.current.height

        if (dir.includes('e')) newWidth = Math.max(300, resizeStart.current.width + deltaX)
        if (dir.includes('w')) newWidth = Math.max(300, resizeStart.current.width - deltaX)
        if (dir.includes('s')) newHeight = Math.max(200, resizeStart.current.height + deltaY)
        if (dir.includes('n')) newHeight = Math.max(200, resizeStart.current.height - deltaY)

        onResize(newWidth, newHeight)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) {
        const container = containerRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        const x = Math.max(0, Math.min(e.touches[0].clientX - dragOffset.current.x, rect.width - 100))
        const y = Math.max(0, Math.min(e.touches[0].clientY - dragOffset.current.y, rect.height - 50))
        onDrag(x, y)
      }
    }

    const handleEnd = () => {
      isDragging.current = false
      isResizing.current = null
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleEnd)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [onDrag, onResize, containerRef])

  if (win.isMinimized) return null

  // On mobile always fullscreen, on desktop floating unless maximized
  const isFullscreen = isMobile || win.isMaximized

  const windowStyle = isFullscreen
    ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 32px)' }
    : {
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
      }

  return (
    <div
      className={`absolute flex flex-col shadow-[3px_3px_10px_rgba(0,0,0,0.4)] ${
        isFullscreen ? '' : 'animate-in fade-in zoom-in-95 duration-200'
      }`}
      style={{
        ...windowStyle,
        zIndex: win.zIndex,
        background: '#c0c0c0',
        borderTop: '2px solid #dfdfdf',
        borderLeft: '2px solid #dfdfdf',
        borderBottom: '2px solid #404040',
        borderRight: '2px solid #404040',
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-0.75 py-0.75 select-none"
        style={{
          background: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
          cursor: !isMobile && !win.isMaximized && isDragging.current ? 'grabbing' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-sm md:text-base ml-1">{win.icon}</span>
          <span
            className="text-white font-bold text-xs md:text-sm truncate"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            {win.title}
          </span>
        </div>
        <div className="flex gap-0.5 mr-0.5">
          <Win98Button onClick={onMinimize} variant="title" className="cursor-pointer">
            <span className="leading-none relative -top-0.5">_</span>
          </Win98Button>
          <Win98Button onClick={onMaximize} variant="title" className="cursor-pointer">
            <span className="text-[9px] md:text-[10px]">{win.isMaximized ? '❐' : '□'}</span>
          </Win98Button>
          <Win98Button onClick={onClose} variant="title" className="cursor-pointer">
            <span className="text-[11px] md:text-xs">×</span>
          </Win98Button>
        </div>
      </div>

      {/* Menu Bar */}
      <div
        className="flex gap-4 px-2 py-[3px] text-xs md:text-sm border-b border-[#808080]"
        style={{
          background: '#c0c0c0',
          fontFamily: 'Tahoma, sans-serif',
          color: '#000000',
        }}
      >
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">File</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Edit</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">View</span>
        <span className="hover:bg-[#000080] hover:text-white px-1 cursor-pointer">Help</span>
      </div>

      {/* Content Area */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto overflow-x-hidden m-[3px]"
        style={{
          background: '#ffffff',
          borderTop: '2px solid #808080',
          borderLeft: '2px solid #808080',
          borderBottom: '2px solid #dfdfdf',
          borderRight: '2px solid #dfdfdf',
        }}
      >
        <div className="p-3 md:p-4">{win.content}</div>
      </div>

      {/* Status Bar */}
      <div
        className="px-2 py-0.75 text-black/50 text-xs md:text-sm flex items-center"
        style={{
          background: '#c0c0c0',
          borderTop: '1px solid #dfdfdf',
          fontFamily: 'Tahoma, sans-serif',
        }}
      >
        <div
          className="flex-1 px-2"
          style={{
            borderTop: '1px solid #808080',
            borderLeft: '1px solid #808080',
            borderBottom: '1px solid #dfdfdf',
            borderRight: '1px solid #dfdfdf',
          }}
        >
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Resize handles - only on desktop and not maximized */}
      {!isMobile && !win.isMaximized && (
        <>
          {/* Right edge */}
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'e')}
          />
          {/* Bottom edge */}
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 's')}
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'se')}
          />
          {/* Left edge */}
          <div
            className="absolute top-0 left-0 w-2 h-full cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'w')}
          />
          {/* Bottom-left corner */}
          <div
            className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'sw')}
          />
        </>
      )}
    </div>
  )
}

// Desktop Icon
function DesktopIcon({
  icon,
  label,
  onDoubleClick,
  selected,
  onSelect,
}: {
  icon: string
  label: string
  onDoubleClick: () => void
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      className="flex flex-col items-center gap-1 p-1.5 w-16 md:w-20 focus:outline-none  hover:bg-white/20"
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      <span
        className={`text-2xl md:text-3xl ${selected ? 'brightness-75' : ''}`}
        style={{
          filter: selected ? 'brightness(0.7) sepia(1) hue-rotate(200deg) saturate(3)' : 'none',
        }}
      >
        {icon}
      </span>
      <span
        className={`text-[10px] md:text-xs text-center leading-tight px-1 ${
          selected ? 'bg-[#000080] text-white' : 'text-white'
        }`}
        style={{
          fontFamily: 'Tahoma, sans-serif',
          textShadow: selected ? 'none' : '1px 1px 2px #000',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// Start Menu
function StartMenu({
  isOpen,
  onClose,
  onOpenWindow,
  onShutdown,
}: {
  isOpen: boolean
  onClose: () => void
  onOpenWindow: (id: string) => void
  onShutdown: () => void
}) {
  if (!isOpen) return null

  const menuItems = [
    { id: 'about', icon: '📄', label: 'about.txt' },
    { id: 'skills', icon: '📁', label: 'Skills' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'contact', icon: '🌐', label: 'Contact' },
  ]

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="absolute bottom-8 md:bottom-9 left-0 w-48 md:w-60 z-50 shadow-[3px_3px_10px_rgba(0,0,0,0.4)] animate-in slide-in-from-bottom-2 fade-in duration-150"
        style={{
          background: '#c0c0c0',
          borderTop: '2px solid #dfdfdf',
          borderLeft: '2px solid #dfdfdf',
          borderBottom: '2px solid #404040',
          borderRight: '2px solid #404040',
        }}
      >
        {/* Cruz98 side banner - fixed alignment */}
        <div
          className="absolute left-0 top-0 bottom-0 w-6 md:w-8 flex items-end pb-2"
          style={{ background: 'linear-gradient(180deg, #000080 0%, #1084d0 100%)' }}
        >
          <span
            className="text-white font-bold text-[12px] md:text-xs transform -rotate-90 origin-left whitespace-nowrap ml-[18px] md:ml-[22px]"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            Cruz<span className="font-normal">98</span>
          </span>
        </div>

        {/* Menu Items */}
        <div className="ml-6 md:ml-8 py-1">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white cursor-pointer text-black"
              onClick={() => {
                onOpenWindow(item.id)
                onClose()
              }}
              style={{ fontFamily: 'Tahoma, sans-serif' }}
            >
              <span className="text-lg md:text-xl w-6 text-center">{item.icon}</span>
              <span className="text-xs md:text-sm">{item.label}</span>
            </div>
          ))}

          <div className="border-t border-[#808080] my-1 mx-2" />

          <div
            className="flex items-center gap-3 px-3 py-2 hover:bg-[#000080] hover:text-white cursor-pointer text-black"
            onClick={() => {
              onShutdown()
              onClose()
            }}
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            <span className="text-lg md:text-xl w-6 text-center">🔌</span>
            <span className="text-xs md:text-sm">Shut Down...</span>
          </div>
        </div>
      </div>
    </>
  )
}

// Shutdown Screen - simplified, better legibility
function ShutdownScreen({ onPowerOn }: { onPowerOn: () => void }) {
  return (
    <div className="absolute inset-0 bg-[#000000] flex flex-col items-center justify-center z-200" onClick={onPowerOn}>
      <div className="text-center animate-in fade-in duration-500">
        <p className="text-white md:text-xl mb-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          It is now safe to turn off
        </p>
        <p className="text-white md:text-xl mb-8" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          your computer.
        </p>
        <button
          onClick={onPowerOn}
          className="px-8 py-3 bg-[#c0c0c0] text-black text-sm md:text-base font-bold hover:bg-[#d4d4d4] transition-colors cursor-pointer"
          style={{
            fontFamily: 'Tahoma, sans-serif',
            borderTop: '2px solid #dfdfdf',
            borderLeft: '2px solid #dfdfdf',
            borderBottom: '2px solid #404040',
            borderRight: '2px solid #404040',
          }}
        >
          🔌 Power On
        </button>
        <p className="text-[#808080] text-xs md:text-sm mt-6" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          Click anywhere to restart
        </p>
      </div>
    </div>
  )
}

export function TerminalSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [bootStage, setBootStage] = useState(0)
  const [bootText, setBootText] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState('')
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [highestZIndex, setHighestZIndex] = useState(100)
  const [isShutdown, setIsShutdown] = useState(false)
  const desktopRef = useRef<HTMLDivElement>(null)

  // Windows Default Configuration
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'about',
      title: 'about.txt - Notepad',
      icon: '📄',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 30, y: 20 },
      size: { width: 620, height: 500 },
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: '📁',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 60, y: 35 },
      size: { width: 480, height: 400 },
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: '📁',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 90, y: 50 },
      size: { width: 540, height: 440 },
    },
    {
      id: 'contact',
      title: 'Contact - Internet Explorer',
      icon: '🌐',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 45, y: 30 },
      size: { width: 500, height: 420 },
    },
  ])

  // Check mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const openWindows = windows.filter((w) => w.isOpen && !w.isMinimized)
        if (openWindows.length > 0) {
          const topWindow = openWindows.reduce((a, b) => (a.zIndex > b.zIndex ? a : b))
          closeWindow(topWindow.id)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [windows])

  // Boot sequence Message
  useEffect(() => {
    if (!isVisible || isShutdown) return

    const bootMessages = [
      'BIOS Date 01/21/26 15:23:42',
      'CPU: Giovanni Cruz Portfolio Engine',
      'Memory Test: 262144K OK',
      '',
      'Detecting IDE Primary Master... PORTFOLIO_DRIVE',
      'Detecting IDE Primary Slave... None',
      '',
      'Starting Cruz98...',
      '',
      'HIMEM is testing extended memory...done.',
      'Loading SKILLS.SYS',
      'Loading PROJECTS.DRV',
      'Loading EXPERIENCE.EXE',
      '',
      '▓▒░ CRUZ98 ░▒▓',
    ]

    let currentLine = 0
    setBootText([])

    const bootInterval = setInterval(() => {
      if (currentLine < bootMessages.length) {
        setBootText((prev) => [...prev, bootMessages[currentLine]])
        currentLine++
      } else {
        clearInterval(bootInterval)
        setTimeout(() => setBootStage(1), 600)
      }
    }, 100)

    return () => clearInterval(bootInterval)
  }, [isVisible, isShutdown])

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now
          .toLocaleTimeString('en-US', {
            hour12: true,
            hour: 'numeric',
            minute: '2-digit',
          })
          .replace(' ', ''),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Files and Folders windows
  const getWindowContent = useCallback((id: string) => {
    switch (id) {
      case 'about':
        return (
          <div
            className="font-mono text-sm md:text-base text-black leading-relaxed"
            style={{ fontFamily: 'Courier New, monospace' }}
          >
            {/* Photo and header */}
            <div className="flex flex-col sm:flex-row gap-4 mb-5 pb-4 border-b-2 border-[#c0c0c0]">
              <div
                className="w-24 h-24 md:w-28 md:h-28 shrink-0 mx-auto sm:mx-0"
                style={{
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderBottom: '2px solid #dfdfdf',
                  borderRight: '2px solid #dfdfdf',
                  padding: '2px',
                  background: '#c0c0c0',
                }}
              >
                <Image
                  src="/me.avif"
                  alt="Giovanni Cruz"
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-lg md:text-xl font-bold text-[#000080] mb-1">{hero.name}</h1>
                <p className="text-xs md:text-sm text-[#404040] mb-3">{hero.badge}</p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {aboutSection.stats.map((stat, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-[11px] md:text-xs"
                      style={{
                        background: stat.accent ? '#000080' : '#c0c0c0',
                        color: stat.accent ? '#fff' : '#000',
                        border: '1px solid #808080',
                      }}
                    >
                      {stat.value} {stat.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-xs md:text-sm text-[#000000]">
              {aboutSection.paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Quote */}
            <div
              className="mt-5 p-3 text-xs md:text-sm italic text-[#000000]"
              style={{
                background: '#ffffcc',
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #dfdfdf',
                borderRight: '2px solid #dfdfdf',
              }}
            >
              &quot;{hero.description}&quot;
            </div>
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-3" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="p-3"
                style={{
                  background: '#fff',
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderBottom: '2px solid #dfdfdf',
                  borderRight: '2px solid #dfdfdf',
                }}
              >
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-[#c0c0c0]">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: category.color }} />
                  <span className="font-bold text-sm md:text-base text-[#000080]">{category.title}</span>
                </div>
                <p className="text-xs md:text-sm text-[#404040] mb-3">{category.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {category.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 text-[11px] md:text-xs text-[#000000]"
                      style={{
                        background: '#e8e8e8',
                        borderTop: '1px solid #dfdfdf',
                        borderLeft: '1px solid #dfdfdf',
                        borderBottom: '1px solid #808080',
                        borderRight: '1px solid #808080',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {projects.map((project) => (
              <div
                key={project.title}
                className="flex items-start gap-3 p-3 hover:bg-[#000080] group cursor-pointer text-[#000000] hover:text-white transition-colors"
                style={{
                  borderTop: '1px solid #dfdfdf',
                  borderLeft: '1px solid #dfdfdf',
                  borderBottom: '1px solid #808080',
                  borderRight: '1px solid #808080',
                }}
              >
                <span className="text-xl shrink-0">📄</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm md:text-base text-[#000080] group-hover:text-white truncate">
                      {project.title}
                    </span>
                    <span className="text-[11px] md:text-xs text-[#606060] group-hover:text-[#c0c0c0] shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#404040] group-hover:text-[#c0c0c0]">{project.category}</p>
                  <p className="text-[11px] md:text-xs text-[#606060] group-hover:text-[#a0a0a0] mt-1">
                    {project.tech}
                  </p>
                  <div className="flex gap-3 mt-2">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0000ff] group-hover:text-[#00ffff] underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        [Source]
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[#0000ff] group-hover:text-[#00ffff] underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        [Demo]
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )

      case 'contact':
        return (
          <div style={{ fontFamily: 'Tahoma, sans-serif' }}>
            {/* IE Address bar */}
            <div
              className="flex items-center gap-2 p-1.5 mb-4"
              style={{
                background: '#c0c0c0',
                borderTop: '2px solid #808080',
                borderLeft: '2px solid #808080',
                borderBottom: '2px solid #dfdfdf',
                borderRight: '2px solid #dfdfdf',
              }}
            >
              <span className="text-xs md:text-sm px-1 text-[#000000]">Address</span>
              <div
                className="flex-1 px-2 py-1 text-xs md:text-sm truncate text-[#000000]"
                style={{
                  background: '#fff',
                  border: '1px solid #808080',
                }}
              >
                http://www.giovannicruz.dev/contact
              </div>
              <Win98Button className="text-xs px-2 py-1">Go</Win98Button>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <div
                className="p-3"
                style={{
                  background: '#ffffcc',
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderBottom: '2px solid #dfdfdf',
                  borderRight: '2px solid #dfdfdf',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📧</span>
                  <span className="text-xs md:text-sm text-[#606060]">{contactSection.email.label}</span>
                </div>
                <a
                  href={`mailto:${contactSection.email.value}`}
                  className="text-sm md:text-base text-[#0000ff] hover:text-[#ff0000] underline"
                >
                  {contactSection.email.value}
                </a>
              </div>

              {/* Location */}
              <div
                className="p-3"
                style={{
                  background: '#fff',
                  borderTop: '2px solid #808080',
                  borderLeft: '2px solid #808080',
                  borderBottom: '2px solid #dfdfdf',
                  borderRight: '2px solid #dfdfdf',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📍</span>
                  <span className="text-xs md:text-sm text-[#606060]">{contactSection.location.label}</span>
                </div>
                <span className="text-sm md:text-base text-[#000000]">{contactSection.location.value}</span>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer">
                  <Win98Button className="flex items-center gap-2 text-xs md:text-sm">
                    <span>🐱</span> GitHub
                  </Win98Button>
                </a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <Win98Button className="flex items-center gap-2 text-xs md:text-sm">
                    <span>💼</span> LinkedIn
                  </Win98Button>
                </a>
              </div>
            </div>

            {/* Marquee */}
            <div
              className="mt-5 p-2 text-xs md:text-sm overflow-hidden"
              style={{
                background: '#000080',
                color: '#ffff00',
              }}
            >
              <div className="marquee">
                Welcome to my portfolio! Feel free to reach out for collaborations or opportunities!
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }, [])

  // Window handlers
  const openWindow = useCallback(
    (id: string) => {
      const newZIndex = highestZIndex + 1
      setHighestZIndex(newZIndex)
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: newZIndex, content: getWindowContent(id) }
            : w,
        ),
      )
      setSelectedIcon(null)
    },
    [highestZIndex, getWindowContent],
  )

  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isOpen: false, isMaximized: false } : w)))
  }, [])

  const minimizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w)))
  }, [])

  const maximizeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)))
  }, [])

  const focusWindow = useCallback(
    (id: string) => {
      const newZIndex = highestZIndex + 1
      setHighestZIndex(newZIndex)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, zIndex: newZIndex } : w)))
    },
    [highestZIndex],
  )

  const dragWindow = useCallback((id: string, x: number, y: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, position: { x, y } } : w)))
  }, [])

  const resizeWindow = useCallback((id: string, width: number, height: number) => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, size: { width, height } } : w)))
  }, [])

  const restoreWindow = useCallback(
    (id: string) => {
      const newZIndex = highestZIndex + 1
      setHighestZIndex(newZIndex)
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, isMinimized: false, zIndex: newZIndex } : w)))
    },
    [highestZIndex],
  )

  // Shutdown handler
  const handleShutdown = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, isOpen: false, isMinimized: false, isMaximized: false })))
    setIsShutdown(true)
  }, [])

  // Power on handler
  const handlePowerOn = useCallback(() => {
    setIsShutdown(false)
    setBootStage(0)
    setBootText([])
  }, [])

  // Desktop icons
  const desktopIcons = [
    { id: 'about', icon: '📄', label: 'about.txt' },
    { id: 'skills', icon: '📁', label: 'Skills' },
    { id: 'projects', icon: '📁', label: 'Projects' },
    { id: 'contact', icon: '🌐', label: 'Contact' },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center justify-center px-3 md:px-8 lg:px-16 relative"
    >
      <div className="w-full h-full max-w-6xl max-h-[90vh] md:max-h-[85vh] relative flex items-center justify-center">
        {/* Monitor Frame - Matching site aesthetic */}
        <div
          className={`relative w-full h-full transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Monitor outer shell - dark theme matching site */}
          <div
            className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #2a2a3e 0%, #1e1e2e 50%, #181825 100%)',
              padding: '12px 12px 24px 12px',
              boxShadow:
                '0 0 60px rgba(203, 166, 247, 0.08), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
              border: '1px solid rgba(203, 166, 247, 0.1)',
            }}
          >
            {/* Inner bezel - subtle accent */}
            <div
              className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden"
              style={{
                background: '#0a0a12',
                padding: '4px',
                boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.9), inset 0 0 1px rgba(203, 166, 247, 0.2)',
              }}
            >
              {/* Screen area */}
              <div ref={desktopRef} className="relative w-full h-full overflow-hidden rounded-none md:rounded-t-2xl">
                {/* Shutdown Screen */}
                {isShutdown && <ShutdownScreen onPowerOn={handlePowerOn} />}

                {/* CRT scanlines - very subtle */}
                <div
                  className="absolute inset-0 pointer-events-none z-50 opacity-[0.02]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                  }}
                />

                {/* Boot Stage 0: BIOS/DOS */}
                {!isShutdown && bootStage === 0 && (
                  <div className="absolute inset-0 bg-black p-4 md:p-6 font-mono text-sm md:text-base overflow-hidden">
                    <div className="text-[#aaaaaa]">
                      {bootText.map((line, i) => (
                        <div key={i} className="leading-relaxed">
                          {line || '\u00A0'}
                        </div>
                      ))}
                      <span className="inline-block w-2.5 h-4 md:h-5 bg-[#aaaaaa] animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Boot Stage 1: Desktop */}
                {!isShutdown && bootStage === 1 && (
                  <div className="absolute inset-0 flex flex-col animate-in fade-in duration-500">
                    {/* Desktop Area with teal gradient */}
                    <div
                      className="flex-1 relative p-3 md:p-4 overflow-hidden"
                      style={{
                        background: 'linear-gradient(180deg, #008080 0%, #006666 50%, #005555 100%)',
                      }}
                      onClick={() => {
                        setSelectedIcon(null)
                        setStartMenuOpen(false)
                      }}
                    >
                      {/* Desktop Icons */}
                      <div className="flex flex-col gap-1 md:gap-2">
                        {desktopIcons.map((icon, i) => (
                          <div
                            key={icon.id}
                            className="animate-in fade-in slide-in-from-left-2 duration-300"
                            style={{ animationDelay: `${i * 80}ms` }}
                          >
                            <DesktopIcon
                              icon={icon.icon}
                              label={icon.label}
                              selected={selectedIcon === icon.id}
                              onSelect={() => setSelectedIcon(icon.id)}
                              onDoubleClick={() => openWindow(icon.id)}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Hint */}
                      {windows.filter((w) => w.isOpen).length === 0 && (
                        <div className="absolute bottom-2 right-3 md:bottom-4 md:right-4 animate-in fade-in duration-1000 delay-500">
                          <p
                            className="text-[10px] md:text-xs text-white/80"
                            style={{ fontFamily: 'Tahoma, sans-serif', textShadow: '1px 1px 2px rgba(0,0,0,0.7)' }}
                          >
                            Double-click to open
                          </p>
                        </div>
                      )}

                      {/* Windows */}
                      {windows
                        .filter((w) => w.isOpen)
                        .map((win) => (
                          <Window98
                            key={win.id}
                            window={win}
                            onClose={() => closeWindow(win.id)}
                            onMinimize={() => minimizeWindow(win.id)}
                            onMaximize={() => maximizeWindow(win.id)}
                            onFocus={() => focusWindow(win.id)}
                            onDrag={(x, y) => dragWindow(win.id, x, y)}
                            onResize={(w, h) => resizeWindow(win.id, w, h)}
                            isMobile={isMobile}
                            containerRef={desktopRef}
                          />
                        ))}

                      {/* Start Menu */}
                      <StartMenu
                        isOpen={startMenuOpen}
                        onClose={() => setStartMenuOpen(false)}
                        onOpenWindow={openWindow}
                        onShutdown={handleShutdown}
                      />
                    </div>

                    {/* Taskbar */}
                    <div
                      className="h-8 md:h-9 flex items-center px-1 gap-1 shrink-0"
                      style={{
                        background: '#c0c0c0',
                        borderTop: '2px solid #dfdfdf',
                      }}
                    >
                      {/* Start Button */}
                      <Win98Button
                        onClick={() => setStartMenuOpen(!startMenuOpen)}
                        active={startMenuOpen}
                        className="flex items-center gap-1.5 font-bold px-2 h-6 md:h-6.5 cursor-pointer hover:bg-gray-300"
                      >
                        <span className="text-sm md:text-base">🪟</span>
                        <span className="hidden sm:inline text-xs md:text-sm">Start</span>
                      </Win98Button>

                      {/* Divider */}
                      <div
                        className="w-px h-5 mx-1"
                        style={{
                          borderLeft: '1px solid #808080',
                          borderRight: '1px solid #dfdfdf',
                        }}
                      />

                      {/* Open Windows */}
                      <div className="flex-1 flex gap-1 overflow-x-auto">
                        {windows
                          .filter((w) => w.isOpen)
                          .map((win) => (
                            <Win98Button
                              key={win.id}
                              onClick={() => (win.isMinimized ? restoreWindow(win.id) : focusWindow(win.id))}
                              active={!win.isMinimized}
                              className="flex items-center gap-1.5 min-w-0 max-w-25 md:max-w-37.5 px-2 h-6 md:h-6.5 cursor-pointer hover:bg-gray-300"
                            >
                              <span className="text-xs md:text-sm shrink-0">{win.icon}</span>
                              <span className="truncate text-[10px] md:text-xs">{win.title.split(' - ')[0]}</span>
                            </Win98Button>
                          ))}
                      </div>

                      {/* System Tray */}
                      <div
                        className="flex items-center gap-2 px-2 h-5 md:h-5.5"
                        style={{
                          borderTop: '1px solid #808080',
                          borderLeft: '1px solid #808080',
                          borderBottom: '1px solid #dfdfdf',
                          borderRight: '1px solid #dfdfdf',
                        }}
                      >
                        <span className="text-xs mb-1.5 md:text-sm">🔊</span>
                        <span
                          className="text-[10px] md:text-xs text-[#000000]"
                          style={{ fontFamily: 'Tahoma, sans-serif' }}
                        >
                          {currentTime}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Monitor brand - centered at bottom */}
            <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2">
              <span
                className={`${isShutdown ? 'text-white/30' : 'text-white'} text-xs md:text-sm font-medium tracking-[0.2em]`}
              >
                CRUZ
              </span>
            </div>

            {/* Power LED */}
            <div className="absolute bottom-2 right-4 md:right-6">
              <div
                className={`w-2 h-2 md:w-2 md:h-2 rounded-full transition-all duration-500 ${
                  !isShutdown && bootStage === 1 ? 'bg-[#94e2d5]' : isShutdown ? 'bg-[#f38ba8]' : 'bg-[#fab387]'
                }`}
                style={{
                  boxShadow:
                    !isShutdown && bootStage === 1
                      ? '0 0 8px #94e2d5'
                      : isShutdown
                        ? '0 0 4px #f38ba8'
                        : '0 0 6px #fab387',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
