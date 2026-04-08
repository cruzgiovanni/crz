'use client'

import { useEffect, useRef } from 'react'
import { initScene } from './computer-scene'

export function ComputerSceneCanvas({ onReady }: { onReady?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const cleanup = initScene(containerRef.current, onReady)
    return cleanup
  }, [onReady])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
    />
  )
}
