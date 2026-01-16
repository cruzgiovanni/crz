'use client'

import { useEffect, useState } from 'react'
import { hero } from '@/data/info'

export function GraphiteWrite() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`transition-all duration-1000 ml-1 mt-3 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="flex items-center gap-2 text-base md:text-lg">
        <div className="relative inline-block">
          <span
            className="absolute -top-6 left-1/2 -translate-x-1/2 -rotate-6 whitespace-nowrap text-xl text-[#cba6f7] md:-top-8 md:text-2xl font-bold"
            style={{
              fontFamily: 'FirstTimeWriting, cursive',
              textShadow: '0 0 20px rgba(203, 166, 247, 0.5)',
            }}
          >
            {hero.graphite.graphitedWord}
          </span>

          <span className="text-foreground/70">{hero.graphite.crossedOutWord}</span>

          {/* Hand-drawn strikethrough SVG */}
          <svg
            className="absolute -left-1 top-1/2 w-[calc(100%+8px)] -translate-y-1/2 overflow-visible"
            height="12"
            viewBox="0 0 100 12"
            preserveAspectRatio="none"
          >
            <path
              d="M2,6 Q15,4 30,7 T55,5 T75,7 T98,5"
              fill="none"
              stroke="#cba6f7"
              strokeOpacity="0.6"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                vectorEffect: 'non-scaling-stroke',
              }}
            />
          </svg>
        </div>

        <span className="text-foreground/70">{hero.graphite.continuationText}</span>
      </div>
    </div>
  )
}
