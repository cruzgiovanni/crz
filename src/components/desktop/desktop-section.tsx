'use client'

import { useReveal } from '@/hooks/use-reveal'
import { useState, useEffect, useRef, useCallback } from 'react'
import { ReadmeContent } from '@/components/desktop/apps/readme-content'
import { TerminalContent } from '@/components/desktop/apps/terminal-content'
import { MusicPlayerContent } from '@/components/desktop/apps/music-player-content'
import Image from 'next/image'
import finderIcon from '../../../public/mac-icons/finder.png'
import readmeIcon from '../../../public/mac-icons/readme.png'
import trashIcon from '../../../public/mac-icons/trash.png'
import terminalIcon from '../../../public/mac-icons/terminal.png'
import musicPlayerIcon from '../../../public/mac-icons/music-player.png'

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

// Sound utilities
const playClickSound = () => {
  if (typeof window !== 'undefined') {
    const audio = new Audio('/sounds/click.wav')
    audio.volume = 0.5
    audio.play().catch(() => {})
  }
}

// Mac OS 9 Platinum Window Component
function MacWindow({
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

  useEffect(() => {
    const content = contentRef.current
    if (!content || !win.isOpen) return

    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation()
      const scrollableElement = content.querySelector('main') || content
      if (scrollableElement) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableElement as HTMLElement
        const isAtTop = scrollTop <= 0
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
        if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
          e.preventDefault()
        }
      }
    }

    content.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      content.removeEventListener('wheel', handleWheel)
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
        if (dir.includes('s')) newHeight = Math.max(200, resizeStart.current.height + deltaY)

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

  // Button click handlers with sound
  const handleClose = () => {
    playClickSound()
    onClose()
  }

  const handleMinimize = () => {
    playClickSound()
    onMinimize()
  }

  const handleMaximize = () => {
    playClickSound()
    onMaximize()
  }

  if (win.isMinimized) return null

  const isFullscreen = isMobile || win.isMaximized

  const windowStyle = isFullscreen
    ? { left: 0, top: 0, width: '100%', height: '100%' }
    : {
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
      }

  return (
    <div
      className={`absolute flex flex-col ${isFullscreen ? '' : 'animate-in fade-in zoom-in-95 duration-150'}`}
      style={{
        ...windowStyle,
        zIndex: win.zIndex,
        background: '#dddddd',
        border: '1px solid #000000',
        boxShadow: '1px 1px 0 #000000',
      }}
      onClick={onFocus}
    >
      {/* Mac OS 9 Title Bar */}
      <div
        className="flex items-center h-[24px] md:h-[20px] px-[4px] md:px-[3px] select-none shrink-0"
        style={{
          background: `linear-gradient(180deg,
            #ffffff 0%,
            #dddddd 45%,
            #bbbbbb 50%,
            #dddddd 55%,
            #cccccc 100%
          )`,
          borderBottom: '1px solid #888888',
          cursor: !isMobile && !win.isMaximized ? 'grab' : 'default',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Close Box */}
        <button
          onClick={handleClose}
          className="w-[18px] h-[18px] md:w-[13px] md:h-[13px] flex items-center justify-center cursor-pointer transition-colors group"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)',
            border: '1px solid #000000',
            boxShadow: 'inset -1px -1px 0 #888888, inset 1px 1px 0 #ffffff',
          }}
        >
          <div
            className="w-full h-full group-hover:bg-[#ff6666]/50 group-active:bg-[#ff0000]/70"
            style={{ transition: 'background 0.1s' }}
          />
        </button>

        {/* Title Bar Stripes */}
        <div className="flex-1 mx-[6px] md:mx-[8px] h-[16px] md:h-[13px] flex items-center justify-center relative overflow-hidden">
          <div
            className="absolute inset-y-[1px] left-0 right-0"
            style={{
              background: `repeating-linear-gradient(
                180deg,
                #ffffff 0px,
                #ffffff 1px,
                #aaaaaa 1px,
                #aaaaaa 2px
              )`,
            }}
          />
          <span
            className="relative px-[6px] md:px-[8px] text-[11px] md:text-[12px] font-normal text-black"
            style={{
              fontFamily: 'Chicago, Charcoal, sans-serif',
              background: 'linear-gradient(180deg, #ffffff 0%, #dddddd 45%, #bbbbbb 50%, #dddddd 55%, #cccccc 100%)',
            }}
          >
            {win.title}
          </span>
        </div>

        {/* Window Controls */}
        <div className="flex">
          <button
            onClick={handleMinimize}
            className="w-[18px] h-[18px] md:w-[13px] md:h-[13px] flex items-center justify-center cursor-pointer mr-[2px] hover:brightness-90 active:brightness-75 transition-all"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)',
              border: '1px solid #000000',
              boxShadow: 'inset -1px -1px 0 #888888, inset 1px 1px 0 #ffffff',
            }}
          >
            <div
              className="w-[10px] md:w-[7px] h-[2px] md:h-[1px]"
              style={{ background: '#000000', marginTop: '2px' }}
            />
          </button>
          <button
            onClick={handleMaximize}
            className="w-[18px] h-[18px] md:w-[13px] md:h-[13px] flex items-center justify-center cursor-pointer hover:brightness-90 active:brightness-75 transition-all"
            style={{
              background: 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)',
              border: '1px solid #000000',
              boxShadow: 'inset -1px -1px 0 #888888, inset 1px 1px 0 #ffffff',
            }}
          >
            <div
              className="w-[10px] h-[10px] md:w-[7px] md:h-[7px]"
              style={{
                border: '1px solid #000000',
                background: win.isMaximized ? '#888888' : 'transparent',
              }}
            />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        ref={contentRef}
        className="flex-1 flex flex-col min-h-0 overflow-hidden"
        style={{
          margin: '1px',
          background: '#ffffff',
          border: '1px solid #000000',
          boxShadow: 'inset 1px 1px 0 #888888',
        }}
      >
        <div className="flex-1 min-h-0 overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          {win.content}
        </div>
      </div>

      {/* Resize Handle */}
      {!isMobile && !win.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-[15px] h-[15px] cursor-se-resize"
          onMouseDown={(e) => handleResizeStart(e, 'se')}
        >
          <svg viewBox="0 0 15 15" className="w-full h-full">
            <line x1="14" y1="4" x2="4" y2="14" stroke="#888888" strokeWidth="1" />
            <line x1="14" y1="7" x2="7" y2="14" stroke="#888888" strokeWidth="1" />
            <line x1="14" y1="10" x2="10" y2="14" stroke="#888888" strokeWidth="1" />
            <line x1="14" y1="13" x2="13" y2="14" stroke="#888888" strokeWidth="1" />
          </svg>
        </div>
      )}
    </div>
  )
}

// Mac OS 9 Desktop Icon
function MacDesktopIcon({
  icon,
  label,
  onDoubleClick,
  selected,
  onSelect,
}: {
  icon: React.ReactNode
  label: string
  onDoubleClick: () => void
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      className="flex flex-col items-center gap-[2px] p-[2px] w-[68px] md:w-[74px] focus:outline-none"
      onClick={(e) => {
        e.stopPropagation()
        onSelect()
      }}
      onDoubleClick={onDoubleClick}
    >
      {/* Icon - darker when selected */}
      <div
        style={{
          filter: selected ? 'brightness(0.5)' : 'none',
          transition: 'filter 0.1s',
        }}
      >
        {icon}
      </div>
      {/* Label - Mac OS 9 style: translucent white bg when not selected, black bg when selected */}
      <span
        className="text-[10px] md:text-[11px] text-center leading-tight px-[3px] py-[1px]"
        style={{
          fontFamily: 'Chicago, Charcoal, Geneva, sans-serif',
          color: selected ? '#ffffff' : '#000000',
          background: selected ? '#000000' : 'rgba(255, 255, 255, 0.7)',
          textShadow: 'none',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// Mac OS 9 Menu Bar
function MacMenuBar({
  currentTime,
  onAppleMenuClick,
  appleMenuOpen,
  onOpenWindow,
  onShutdown,
}: {
  currentTime: string
  onAppleMenuClick: () => void
  appleMenuOpen: boolean
  onOpenWindow: (id: string) => void
  onShutdown: () => void
}) {
  const menuItems = ['File', 'Edit', 'View', 'Special', 'Help']

  // Pixelated font style for menu bar
  const pixelFontStyle = {
    fontFamily: '"Chicago", "Geneva", "Charcoal", monospace',
    fontWeight: 700,
    fontSize: '12px',
    WebkitFontSmoothing: 'none' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
    textRendering: 'optimizeSpeed' as const,
  }

  return (
    <>
      <div
        className="h-4.5 md:h-5 flex items-center justify-between px-1 md:px-2 select-none shrink-0 relative"
        style={{
          zIndex: 10000,
          background: 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)',
          borderBottom: '1px solid #000000',
        }}
      >
        {/* Left: Apple Menu + Menu Items */}
        <div className="flex items-center">
          {/* Apple Logo Menu */}
          <button
            onClick={onAppleMenuClick}
            className={`flex items-center justify-center w-4 h-3.5 md:w-4.5 md:h-4 cursor-pointer ${appleMenuOpen ? 'bg-[#000080]/80 p-1' : ''}`}
          >
            <svg viewBox="0 0 18 20" className="w-[12px] h-[14px] md:w-[14px] md:h-[16px]">
              <defs>
                <path
                  id="applePath"
                  d="M15.2 10.6c0-2.8 2.3-4.2 2.4-4.3-1.3-1.9-3.3-2.2-4-2.2-1.7-.2-3.3 1-4.2 1s-2.2-1-3.6-1c-1.9 0-3.6 1.1-4.5 2.7-1.9 3.3-.5 8.3 1.4 11 .9 1.3 2 2.8 3.5 2.8 1.4 0 1.9-.9 3.6-.9s2.2.9 3.6.9 2.5-1.4 3.4-2.7c1.1-1.5 1.5-3 1.5-3.1-.1 0-2.9-1.1-2.9-4.2zM12.5 2.8c.8-.9 1.3-2.2 1.1-3.5-1.1 0-2.4.7-3.2 1.6-.7.8-1.3 2.1-1.2 3.4 1.2.1 2.5-.6 3.3-1.5z"
                />

                <clipPath id="appleClip">
                  <use href="#applePath" />
                </clipPath>
              </defs>

              <use href="#applePath" fill="none" stroke="#000" strokeWidth="0.9" strokeLinejoin="round" />

              <g clipPath="url(#appleClip)">
                <rect y="0" width="18" height="3.3" fill="#61BB46" />
                <rect y="3.3" width="18" height="3.3" fill="#FDB827" />
                <rect y="6.6" width="18" height="3.3" fill="#F5821F" />
                <rect y="9.9" width="18" height="3.3" fill="#E03A3E" />
                <rect y="13.2" width="18" height="3.3" fill="#963D97" />
                <rect y="16.5" width="18" height="3.5" fill="#009DDC" />
              </g>
            </svg>
          </button>

          {/* Menu Items with pixelated bold font */}
          {menuItems.map((item) => (
            <span
              key={item}
              className="text-[11px] md:text-[12px] text-black cursor-default  px-[8px] md:px-[10px] py-[1px]"
              style={pixelFontStyle}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Right: Clock and Finder */}
        <div className="flex items-center gap-[4px] md:gap-[8px]">
          <span className="text-[11px] md:text-[12px] text-black" style={pixelFontStyle}>
            {currentTime}
          </span>

          {/* Finder icon */}
          <div className="flex items-center gap-[2px] md:gap-[4px]">
            <Image
              src={finderIcon}
              alt="Finder"
              width={14}
              height={14}
              className="w-[12px] h-[12px] md:w-[14px] md:h-[14px]"
            />
            <span className="text-[11px] md:text-[12px] text-black hidden sm:inline" style={pixelFontStyle}>
              Finder
            </span>
          </div>
        </div>
      </div>

      {/* Apple Menu Dropdown */}
      {appleMenuOpen && (
        <>
          <div className="fixed inset-0" style={{ zIndex: 10001 }} onClick={onAppleMenuClick} />
          <div
            className="absolute top-[18px] md:top-[20px] left-[2px] w-[180px] md:w-[200px] py-[2px]"
            style={{
              zIndex: 10002,
              background: '#ffffff',
              border: '1px solid #000000',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}
          >
            <div
              className="flex items-center gap-[6px] px-[12px] py-[3px] hover:bg-[#000080]/80 hover:text-white cursor-pointer text-black text-[11px] md:text-[12px]"
              style={pixelFontStyle}
            >
              <span className="w-[16px] text-center">
                <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] inline">
                  <rect x="2" y="2" width="12" height="10" fill="#dddddd" stroke="#000" strokeWidth="1" />
                  <rect x="6" y="12" width="4" height="2" fill="#888888" />
                  <rect x="4" y="14" width="8" height="1" fill="#666666" />
                </svg>
              </span>
              <span>About This Computer</span>
            </div>

            <div className="mx-[4px] my-[3px] border-t border-[#888888]" />

            <div
              className="flex items-center gap-[6px] px-[12px] py-[3px] hover:bg-[#000080]/80 hover:text-white cursor-pointer text-black text-[11px] md:text-[12px]"
              style={pixelFontStyle}
              onClick={() => {
                onOpenWindow('readme')
                onAppleMenuClick()
              }}
            >
              <span className="w-[16px] text-center">
                <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] inline">
                  <path d="M3 1 L3 15 L13 15 L13 4 L10 1 Z" fill="#ffffff" stroke="#000" strokeWidth="1" />
                  <path d="M10 1 L10 4 L13 4" fill="#cccccc" stroke="#000" strokeWidth="1" />
                  <line x1="5" y1="7" x2="11" y2="7" stroke="#000" strokeWidth="0.5" />
                  <line x1="5" y1="9" x2="11" y2="9" stroke="#000" strokeWidth="0.5" />
                  <line x1="5" y1="11" x2="9" y2="11" stroke="#000" strokeWidth="0.5" />
                </svg>
              </span>
              <span>ReadMe</span>
            </div>

            <div className="mx-[4px] my-[3px] border-t border-[#888888]" />

            <div
              className="flex items-center gap-[6px] px-[12px] py-[3px] hover:bg-[#000080]/80 hover:text-white cursor-pointer text-black text-[11px] md:text-[12px]"
              style={pixelFontStyle}
              onClick={() => {
                onShutdown()
                onAppleMenuClick()
              }}
            >
              <span className="w-[16px] text-center">
                <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] inline">
                  <circle cx="8" cy="8" r="6" fill="none" stroke="#000" strokeWidth="1.5" />
                  <line x1="8" y1="3" x2="8" y2="8" stroke="#000" strokeWidth="1.5" />
                </svg>
              </span>
              <span>Shut Down</span>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// Mac OS 9 Boot Screen
function MacBootScreen({ stage }: { stage: 'happy' | 'loading' | 'extensions' }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#c0c0c0]">
      {stage === 'happy' && (
        <div className="animate-in fade-in duration-300">
          <svg viewBox="0 0 64 64" className="w-[48px] h-[48px] md:w-[64px] md:h-[64px]">
            <rect x="12" y="4" width="40" height="48" rx="4" fill="#ffffff" stroke="#000000" strokeWidth="2" />
            <rect x="16" y="8" width="32" height="24" fill="#000000" />
            <circle cx="26" cy="17" r="2" fill="#00ff00" />
            <circle cx="38" cy="17" r="2" fill="#00ff00" />
            <path d="M24 24 Q32 30 40 24" fill="none" stroke="#00ff00" strokeWidth="2" />
            <rect x="24" y="36" width="16" height="3" fill="#888888" />
            <rect x="16" y="52" width="32" height="4" fill="#c0c0c0" stroke="#000000" strokeWidth="1" />
            <rect x="8" y="56" width="48" height="4" fill="#888888" />
          </svg>
        </div>
      )}

      {stage === 'loading' && (
        <div className="flex flex-col items-center animate-in fade-in duration-300">
          <div className="mb-[16px] md:mb-[24px]">
            <svg viewBox="0 0 160 55" className="w-[140px] h-[48px] md:w-[180px] md:h-[62px]">
              <defs>
                <clipPath id="bootApple">
                  <path d="M28 25c0-5.5 4.5-8.2 4.7-8.4-2.5-3.7-6.5-4.3-7.9-4.3-3.3-.3-6.5 2-8.2 2s-4.3-2-7-2c-3.7 0-7 2.1-8.9 5.3-3.8 6.5-1 16.3 2.7 21.7 1.8 2.6 4 5.5 6.8 5.4 2.7 0 3.8-1.8 7-1.8s4.2 1.8 7 1.8 4.9-2.7 6.7-5.3c2.1-3 3-6 3-6.1-.1 0-5.8-2.2-5.9-8.3zM22.6 9.5c1.5-1.8 2.5-4.3 2.2-6.8-2.1.1-4.7 1.4-6.3 3.2-1.4 1.6-2.6 4.1-2.3 6.6 2.4.1 4.9-1.2 6.4-3z" />
                </clipPath>
              </defs>
              <g clipPath="url(#bootApple)">
                <rect x="0" y="0" width="40" height="8" fill="#61BB46" />
                <rect x="0" y="8" width="40" height="8" fill="#FDB827" />
                <rect x="0" y="16" width="40" height="8" fill="#F5821F" />
                <rect x="0" y="24" width="40" height="8" fill="#E03A3E" />
                <rect x="0" y="32" width="40" height="8" fill="#963D97" />
                <rect x="0" y="40" width="40" height="10" fill="#009DDC" />
              </g>
              <text x="48" y="35" fill="#000000" fontSize="18" fontFamily="Chicago, sans-serif" fontWeight="bold">
                Cruz OS 9
              </text>
            </svg>
          </div>

          <p
            className="text-[11px] md:text-[12px] text-black"
            style={{ fontFamily: 'Chicago, Charcoal, Geneva, sans-serif' }}
          >
            Starting up...
          </p>

          <div
            className="w-[180px] md:w-[240px] h-[12px] md:h-[14px] mt-[8px] relative"
            style={{
              background: '#ffffff',
              border: '1px solid #000000',
              boxShadow: 'inset 1px 1px 0 #888888',
            }}
          >
            <div className="absolute inset-[2px] bg-[#000080] animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}
    </div>
  )
}

// Mac OS 9 Shutdown Screen
function MacShutdownScreen({ onPowerOn }: { onPowerOn: () => void }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
      <div className="text-center animate-in fade-in duration-500">
        {/* Classic Mac "power off" icon - old Macintosh silhouette */}
        <div className="mb-6 flex justify-center">
          <svg viewBox="0 0 64 80" className="w-12 h-16 md:w-16 md:h-20">
            {/* Classic Mac silhouette */}
            <rect x="8" y="4" width="48" height="56" rx="4" fill="none" stroke="#ff6600" strokeWidth="2" />
            <rect x="12" y="8" width="40" height="32" fill="none" stroke="#ff6600" strokeWidth="2" />
            {/* Screen content - off */}
            <rect x="16" y="12" width="32" height="24" fill="#1a1a1a" stroke="#ff6600" strokeWidth="1" />
            {/* Base/foot */}
            <rect x="20" y="60" width="24" height="4" fill="#ff6600" />
            <rect x="12" y="64" width="40" height="6" rx="1" fill="none" stroke="#ff6600" strokeWidth="2" />
            {/* Floppy slot */}
            <rect x="16" y="44" width="12" height="3" fill="#ff6600" />
          </svg>
        </div>

        <p
          className="text-[#ff6600] text-[14px] md:text-[18px] mb-6"
          style={{ fontFamily: 'Chicago, Geneva, Charcoal, sans-serif' }}
        >
          Computer is off
        </p>

        {/* Mac OS 9 style button */}
        <button
          onClick={onPowerOn}
          className="cursor-pointer active:brightness-90"
          style={{
            background: 'linear-gradient(180deg, #dddddd 0%, #bbbbbb 45%, #999999 55%, #aaaaaa 100%)',
            border: '2px solid #000000',
            boxShadow: 'inset -1px -1px 0 #666666, inset 1px 1px 0 #ffffff',
            padding: '6px 20px',
          }}
        >
          <span
            className="text-[12px] md:text-[14px] text-black"
            style={{ fontFamily: 'Chicago, Geneva, Charcoal, sans-serif' }}
          >
            Restart
          </span>
        </button>
      </div>
    </div>
  )
}

// Mac OS 9 Icon Component
function MacIcon({ src, alt }: { src: typeof readmeIcon; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={48}
      height={48}
      className="w-[32px] h-[32px] md:w-[48px] md:h-[48px]"
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

export function DesktopSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [bootStage, setBootStage] = useState<'off' | 'happy' | 'loading' | 'desktop'>('off')
  const [currentTime, setCurrentTime] = useState('')
  const [appleMenuOpen, setAppleMenuOpen] = useState(false)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [highestZIndex, setHighestZIndex] = useState(100)
  const [isShutdown, setIsShutdown] = useState(false)

  const desktopRef = useRef<HTMLDivElement>(null)

  // Windows State
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: 'readme',
      title: 'ReadMe',
      icon: '📄',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 30, y: 30 },
      size: { width: 560, height: 400 },
    },
    {
      id: 'terminal',
      title: 'Terminal',
      icon: '💻',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 60, y: 60 },
      size: { width: 500, height: 350 },
    },
    {
      id: 'music-player',
      title: 'Music Player',
      icon: '🎵',
      content: null,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      zIndex: 100,
      position: { x: 90, y: 90 },
      size: { width: 400, height: 300 },
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

  // Boot sequence
  useEffect(() => {
    if (!isVisible || isShutdown) return

    setBootStage('happy')
    const timer1 = setTimeout(() => setBootStage('loading'), 1200)
    const timer2 = setTimeout(() => {
      setBootStage('desktop')
      // Auto-open ReadMe centered after a short delay for the desktop to render
      setTimeout(() => {
        const container = desktopRef.current
        if (!container) return

        const rect = container.getBoundingClientRect()
        // ReadMe window size: 560x400
        const winWidth = 560
        const winHeight = 400
        const centerX = Math.max(0, (rect.width - winWidth) / 2)
        const centerY = Math.max(0, (rect.height - winHeight) / 2 - 10)

        setWindows((prev) =>
          prev.map((w) =>
            w.id === 'readme'
              ? { ...w, isOpen: true, position: { x: centerX, y: centerY }, content: <ReadmeContent /> }
              : w,
          ),
        )
      }, 150)
    }, 3000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [isVisible, isShutdown])

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const time = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      })
      setCurrentTime(time)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const getWindowContent = useCallback((id: string) => {
    switch (id) {
      case 'readme':
        return <ReadmeContent />
      case 'terminal':
        return <TerminalContent />
      case 'music-player':
        return <MusicPlayerContent />
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

  const handleShutdown = useCallback(() => {
    setWindows((prev) => prev.map((w) => ({ ...w, isOpen: false, isMinimized: false, isMaximized: false })))
    setIsShutdown(true)
  }, [])

  const handlePowerOn = useCallback(() => {
    setIsShutdown(false)
    setBootStage('off')
  }, [])

  const desktopIcons = [
    { id: 'readme', icon: <MacIcon src={readmeIcon} alt="ReadMe" />, label: 'ReadMe' },
    { id: 'terminal', icon: <MacIcon src={terminalIcon} alt="Terminal" />, label: 'Terminal' },
    { id: 'music-player', icon: <MacIcon src={musicPlayerIcon} alt="Music Player" />, label: 'Music Player' },
  ]

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center justify-center px-3 md:px-8 lg:px-16 relative"
    >
      <div className="w-full h-full max-w-6xl max-h-[90vh] md:max-h-[85vh] relative flex items-center justify-center">
        {/* Macintosh Monitor Frame */}
        <div
          className={`relative w-full h-full transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Monitor outer shell */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #d4d0c8 0%, #c8c4bc 50%, #b8b4ac 100%)',
              padding: '12px 12px 28px 12px',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)',
              border: '2px solid #888888',
            }}
          >
            {/* Ventilation slots */}
            <div className="absolute top-[6px] left-1/2 -translate-x-1/2 flex gap-[3px]">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-[24px] md:w-[32px] h-[4px] rounded-full bg-[#a0a098] shadow-inner" />
              ))}
            </div>

            {/* Inner bezel */}
            <div
              className="w-full h-full overflow-hidden mt-[8px]"
              style={{
                background: '#1a1a1a',
                padding: '4px',
                borderRadius: '4px',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9)',
                border: '2px solid #333333',
              }}
            >
              {/* Screen area */}
              <div
                ref={desktopRef}
                className="relative w-full h-full overflow-hidden"
                style={{ background: '#4477aa' }}
              >
                {/* Shutdown Screen */}
                {isShutdown && <MacShutdownScreen onPowerOn={handlePowerOn} />}

                {/* Boot Stages */}
                {!isShutdown && (bootStage === 'happy' || bootStage === 'loading') && (
                  <MacBootScreen stage={bootStage} />
                )}

                {/* Desktop */}
                {!isShutdown && bootStage === 'desktop' && (
                  <div className="absolute inset-0 flex flex-col animate-in fade-in duration-300">
                    {/* Menu Bar */}
                    <MacMenuBar
                      currentTime={currentTime}
                      onAppleMenuClick={() => setAppleMenuOpen(!appleMenuOpen)}
                      appleMenuOpen={appleMenuOpen}
                      onOpenWindow={openWindow}
                      onShutdown={handleShutdown}
                    />

                    {/* Desktop Area */}
                    <div
                      className="flex-1 relative overflow-hidden"
                      onClick={() => {
                        setSelectedIcon(null)
                        setAppleMenuOpen(false)
                      }}
                    >
                      {/* Wallpaper Background - Mac OS X Aqua Blue style */}
                      <div
                        className="absolute inset-0 overflow-hidden"
                        style={{
                          background: 'linear-gradient(180deg, #4a7ab5 0%, #3d6ca8 30%, #2d5a96 60%, #1e4a85 100%)',
                        }}
                      >
                        {/* Large sweeping curve from bottom-left */}
                        <div
                          className="absolute"
                          style={{
                            width: '200%',
                            height: '120%',
                            left: '-80%',
                            bottom: '-60%',
                            background:
                              'radial-gradient(ellipse at center, rgba(120, 180, 220, 0.4) 0%, transparent 70%)',
                            borderRadius: '50%',
                          }}
                        />
                        {/* Upper curve sweeping right */}
                        <div
                          className="absolute"
                          style={{
                            width: '180%',
                            height: '100%',
                            left: '-40%',
                            top: '-50%',
                            background:
                              'radial-gradient(ellipse at center, rgba(100, 160, 210, 0.3) 0%, transparent 60%)',
                            borderRadius: '50%',
                          }}
                        />
                        {/* Middle accent curve */}
                        <div
                          className="absolute"
                          style={{
                            width: '150%',
                            height: '80%',
                            left: '-20%',
                            top: '10%',
                            background:
                              'radial-gradient(ellipse at 30% 50%, rgba(140, 190, 230, 0.25) 0%, transparent 50%)',
                            borderRadius: '50%',
                            transform: 'rotate(-15deg)',
                          }}
                        />
                        {/* Subtle highlight curve top-left */}
                        <div
                          className="absolute"
                          style={{
                            width: '120%',
                            height: '60%',
                            left: '-30%',
                            top: '-20%',
                            background:
                              'radial-gradient(ellipse at 40% 60%, rgba(160, 200, 240, 0.2) 0%, transparent 50%)',
                            borderRadius: '50%',
                            transform: 'rotate(-25deg)',
                          }}
                        />
                        {/* Bottom-right glow */}
                        <div
                          className="absolute"
                          style={{
                            width: '100%',
                            height: '80%',
                            right: '-30%',
                            bottom: '-20%',
                            background:
                              'radial-gradient(ellipse at center, rgba(90, 150, 200, 0.3) 0%, transparent 60%)',
                            borderRadius: '50%',
                          }}
                        />
                        {/* Crossing arc from bottom */}
                        <div
                          className="absolute"
                          style={{
                            width: '250%',
                            height: '100%',
                            left: '-75%',
                            bottom: '-70%',
                            background:
                              'radial-gradient(ellipse at 50% 30%, rgba(130, 185, 225, 0.35) 0%, transparent 45%)',
                            borderRadius: '50%',
                          }}
                        />
                      </div>

                      {/* Desktop Icons - top right */}
                      <div className="absolute top-[8px] right-[8px] md:top-[12px] md:right-[12px] flex flex-col gap-[4px]">
                        {desktopIcons.map((icon, i) => (
                          <div
                            key={icon.id}
                            className="animate-in fade-in slide-in-from-right-2 duration-300"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <MacDesktopIcon
                              icon={icon.icon}
                              label={icon.label}
                              selected={selectedIcon === icon.id}
                              onSelect={() => setSelectedIcon(icon.id)}
                              onDoubleClick={() => openWindow(icon.id)}
                            />
                          </div>
                        ))}
                      </div>

                      {/* Trash Icon - bottom right */}
                      <div className="absolute bottom-[8px] right-[8px] md:bottom-[12px] md:right-[12px] animate-in fade-in slide-in-from-right-2 duration-300 delay-200">
                        <MacDesktopIcon
                          icon={<MacIcon src={trashIcon} alt="Trash" />}
                          label="Trash"
                          selected={selectedIcon === 'trash'}
                          onSelect={() => setSelectedIcon('trash')}
                          onDoubleClick={() => {}}
                        />
                      </div>

                      {/* Hint */}
                      {windows.filter((w) => w.isOpen).length === 0 && (
                        <div className="absolute bottom-[8px] left-[8px] md:bottom-[12px] md:left-[12px] animate-in fade-in duration-1000 delay-500">
                          <p
                            className="text-[10px] md:text-[11px] text-white/80"
                            style={{
                              fontFamily: 'Chicago, Charcoal, Geneva, sans-serif',
                              textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
                            }}
                          >
                            Double-click icon to open
                          </p>
                        </div>
                      )}

                      {/* Windows */}
                      {windows
                        .filter((w) => w.isOpen)
                        .map((win) => (
                          <MacWindow
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
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Monitor brand */}
            <div className="absolute bottom-[0.5px] left-1/2 -translate-x-1/2">
              <span
                className="text-[10px] md:text-[11px] font-bold tracking-[0.15em]"
                style={{
                  fontFamily: 'Chicago, sans-serif',
                  color: '#666666',
                  textShadow: '0 1px 0 rgba(255,255,255,0.5)',
                }}
              >
                CRUZ
              </span>
            </div>

            {/* Power LED */}
            <div className="absolute bottom-1.5 right-5 md:right-7">
              <div
                className={`w-[6px] h-[6px] md:w-[8px] md:h-[8px] rounded-full transition-all duration-500 ${
                  !isShutdown && bootStage === 'desktop' ? 'bg-[#00cc00]' : isShutdown ? 'bg-[#333333]' : 'bg-[#ffaa00]'
                }`}
                style={{
                  boxShadow:
                    !isShutdown && bootStage === 'desktop'
                      ? '0 0 6px #00cc00'
                      : isShutdown
                        ? 'none'
                        : '0 0 4px #ffaa00',
                }}
              />
            </div>

            {/* Floppy drive slot */}
            <div className="absolute bottom-2.5 left-5 md:left-7">
              <div
                className="w-[32px] md:w-[40px] h-[4px]"
                style={{
                  background: 'linear-gradient(180deg, #666666 0%, #444444 100%)',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.6)',
                  borderRadius: '1px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
