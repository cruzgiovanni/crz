'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { initScene } from './computer-scene'

export function ComputerSceneCanvas({ onReadyAction }: { onReadyAction?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleScreenClick = useCallback(() => {
    router.push('/portfolio')
  }, [router])

  useEffect(() => {
    if (!containerRef.current) return
    const cleanup = initScene(containerRef.current, onReadyAction, handleScreenClick)
    return cleanup
  }, [onReadyAction, handleScreenClick])

  return <div ref={containerRef} className="absolute inset-0" />
}
