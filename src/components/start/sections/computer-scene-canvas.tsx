'use client'

import { useEffect, useRef } from 'react'
import { initScene } from './computer-scene'

export function ComputerSceneCanvas({ onReadyAction }: { onReadyAction?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const cleanup = initScene(containerRef.current, onReadyAction)
    return cleanup
  }, [onReadyAction])

  return <div ref={containerRef} className="absolute inset-0" />
}
