'use client'

import { useState } from 'react'

interface Track {
  id: number
  title: string
  artist: string
  duration: string
}

const playlist: Track[] = [
  { id: 1, title: 'Loading...', artist: 'Cruz OS', duration: '0:00' },
]

export function MusicPlayerContent() {
  const [currentTrack, setCurrentTrack] = useState<Track>(playlist[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(75)

  return (
    <div
      className="h-full flex flex-col"
      style={{
        background: 'linear-gradient(180deg, #c0c0c0 0%, #a0a0a0 100%)',
        fontFamily: 'Chicago, Geneva, sans-serif',
      }}
    >
      {/* Display */}
      <div
        className="mx-3 mt-3 p-3 text-center"
        style={{
          background: '#2a2a2a',
          border: '2px inset #888888',
          color: '#00ff00',
          fontFamily: 'monospace',
        }}
      >
        <div className="text-xs text-[#888888] mb-1">NOW PLAYING</div>
        <div className="text-sm truncate">{currentTrack.title}</div>
        <div className="text-xs text-[#00aa00] truncate">{currentTrack.artist}</div>
        <div className="text-xs mt-2 text-[#888888]">{currentTrack.duration}</div>
      </div>

      {/* Progress bar */}
      <div className="mx-3 mt-3">
        <div
          className="h-2 w-full"
          style={{
            background: '#ffffff',
            border: '1px solid #000000',
            boxShadow: 'inset 1px 1px 0 #888888',
          }}
        >
          <div className="h-full bg-[#000080]" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 mt-4 px-3">
        <ControlButton label="⏮" onClick={() => {}} />
        <ControlButton label="⏹" onClick={() => setIsPlaying(false)} />
        <ControlButton
          label={isPlaying ? '⏸' : '▶'}
          onClick={() => setIsPlaying(!isPlaying)}
          primary
        />
        <ControlButton label="⏭" onClick={() => {}} />
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 mx-3 mt-4">
        <span className="text-xs">🔈</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="flex-1 h-2 appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #000080 ${volume}%, #ffffff ${volume}%)`,
            border: '1px solid #000000',
          }}
        />
        <span className="text-xs">🔊</span>
      </div>

      {/* Playlist */}
      <div className="flex-1 mx-3 mt-4 mb-3 overflow-auto">
        <div
          className="text-xs font-bold mb-1 px-1"
          style={{ color: '#000000' }}
        >
          PLAYLIST
        </div>
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #000000',
            boxShadow: 'inset 1px 1px 0 #888888',
          }}
        >
          {playlist.map((track) => (
            <div
              key={track.id}
              onClick={() => setCurrentTrack(track)}
              className={`px-2 py-1 text-xs cursor-pointer flex justify-between ${
                currentTrack.id === track.id
                  ? 'bg-[#000080] text-white'
                  : 'hover:bg-[#cccccc]'
              }`}
            >
              <span className="truncate">{track.title}</span>
              <span className="text-[#888888] ml-2">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Status bar */}
      <div
        className="px-3 py-1 text-xs border-t border-[#888888]"
        style={{ background: '#c0c0c0' }}
      >
        <span className="text-[#666666]">
          {isPlaying ? '▶ Playing' : '⏹ Stopped'} | Volume: {volume}%
        </span>
      </div>
    </div>
  )
}

function ControlButton({
  label,
  onClick,
  primary = false,
}: {
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 flex items-center justify-center text-sm cursor-pointer active:translate-y-[1px]"
      style={{
        background: primary
          ? 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)'
          : 'linear-gradient(180deg, #eeeeee 0%, #aaaaaa 100%)',
        border: '1px solid #000000',
        boxShadow: 'inset -1px -1px 0 #888888, inset 1px 1px 0 #ffffff',
      }}
    >
      {label}
    </button>
  )
}
