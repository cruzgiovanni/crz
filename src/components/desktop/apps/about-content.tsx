'use client'

import Image from 'next/image'
import systemIcon from '../../../../public/mac-icons/system.png'

export function AboutContent() {
  const currentYear = new Date().getFullYear()

  return (
    <main
      className="h-full p-4 select-none"
      style={{
        background: '#ffffff',
        fontFamily: 'Chicago, Charcoal, Geneva, sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Header with icon and system name */}
      <div className="flex items-start gap-4 mb-4">
        {/* System Icon from mac-icons */}
        <div className="shrink-0">
          <Image
            src={systemIcon}
            alt="System"
            width={48}
            height={48}
            className="w-[48px] h-[48px]"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>

        {/* System info */}
        <div className="flex-1">
          <h1 className="text-[16px] font-bold mb-1 text-black" style={{ fontFamily: 'Chicago, Charcoal, sans-serif' }}>
            Cruz OS 9
          </h1>
          <p className="text-[11px] text-[#444444] mb-2">Version 9.0 - {currentYear}</p>
          <div className="h-[1px] my-2" style={{ background: 'linear-gradient(90deg, #888888, transparent)' }} />
        </div>
      </div>

      {/* Memory bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[11px] mb-1 text-black">
          <span>Built-in Memory</span>
          <span className="font-bold">4 MB</span>
        </div>
        <div
          className="h-[16px] relative"
          style={{
            background: '#ffffff',
            border: '1px solid #000000',
            boxShadow: 'inset 1px 1px 0 #888888',
          }}
        >
          {/* System usage */}
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: '35%',
              background: 'repeating-linear-gradient(90deg, #666666 0px, #666666 2px, #999999 2px, #999999 4px)',
            }}
          />
          {/* Used memory label */}
          <span
            className="absolute left-2 top-0 text-[10px] leading-[16px] font-bold"
            style={{ color: '#ffffff', textShadow: '1px 1px 0 #000000' }}
          >
            System: 1.4 MB
          </span>
        </div>
      </div>

      {/* Hardware specs */}
      <div
        className="p-3 text-[11px]"
        style={{
          background: '#f0f0f0',
          border: '1px solid #888888',
          boxShadow: 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #cccccc',
        }}
      >
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">Processor:</td>
              <td className="py-[3px] text-black">Motorola 68000 @ 8 MHz</td>
            </tr>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">Architecture:</td>
              <td className="py-[3px] text-black">32-bit (16-bit data path)</td>
            </tr>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">System Bus:</td>
              <td className="py-[3px] text-black">8 MHz</td>
            </tr>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">ROM:</td>
              <td className="py-[3px] text-black">Cruztosh ROM, 512 KB</td>
            </tr>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">RAM:</td>
              <td className="py-[3px] text-black">4 MB (30-pin SIMM, 120 ns)</td>
            </tr>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">Display:</td>
              <td className="py-[3px] text-black">9&quot; Monochrome, 512x342</td>
            </tr>
            <tr>
              <td className="py-[3px] pr-4 text-[#333333] font-bold">Video:</td>
              <td className="py-[3px] text-black">Integrated (Built-in VRAM)</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-[#555555]">Cruztosh Classic - Giovanni Cruz</p>
      </div>
    </main>
  )
}
