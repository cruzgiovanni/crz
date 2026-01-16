'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const targetPositionRef = useRef({ x: 0, y: 0 })
  const isPointerRef = useRef(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let animationFrameId: number

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const updateCursor = () => {
      // Outer ring follows with smooth lag
      positionRef.current.x = lerp(positionRef.current.x, targetPositionRef.current.x, 0.12)
      positionRef.current.y = lerp(positionRef.current.y, targetPositionRef.current.y, 0.12)

      if (cursorRef.current && dotRef.current) {
        const scale = isPointerRef.current ? 1.8 : 1
        const dotScale = isPointerRef.current ? 0 : 1
        const opacity = isPointerRef.current ? 0.6 : 0.4

        // Outer ring - follows with delay
        cursorRef.current.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0) translate(-50%, -50%) scale(${scale})`
        cursorRef.current.style.opacity = String(opacity)

        // Inner dot - follows target directly (no lag)
        dotRef.current.style.transform = `translate3d(${targetPositionRef.current.x}px, ${targetPositionRef.current.y}px, 0) translate(-50%, -50%) scale(${dotScale})`
      }

      animationFrameId = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPositionRef.current = { x: e.clientX, y: e.clientY }

      if (!isVisible) setIsVisible(true)

      const target = e.target
      if (target instanceof HTMLElement) {
        isPointerRef.current =
          window.getComputedStyle(target).cursor === 'pointer' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button, a') !== null
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    animationFrameId = requestAnimationFrame(updateCursor)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-100 hidden transition-opacity duration-300 will-change-transform md:block ${
          isVisible ? 'opacity-40' : 'opacity-0'
        }`}
        style={{ contain: 'layout style paint' }}
      >
        <div
          className="h-8 w-8 rounded-full border border-primary/80"
          style={{
            boxShadow: '0 0 12px rgba(203, 166, 247, 0.15)',
          }}
        />
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className={`pointer-events-none fixed left-0 top-0 z-100 hidden transition-opacity duration-200 will-change-transform md:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ contain: 'layout style paint' }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full bg-primary"
          style={{
            boxShadow: '0 0 8px rgba(203, 166, 247, 0.4)',
          }}
        />
      </div>
    </>
  )
}
