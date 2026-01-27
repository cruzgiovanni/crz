'use client'

export function AboutContent() {
  const currentYear = new Date().getFullYear()

  // Simulated memory data (in KB)
  const totalMemory = 4096 // 4 MB
  const systemUsage = 1420 // System usage in KB
  const finderUsage = 512 // Finder usage in KB
  const largestUnused = totalMemory - systemUsage - finderUsage

  return (
    <main
      className="h-full select-none"
      style={{
        background: '#dddddd',
        fontFamily: 'Chicago, Charcoal, Geneva, sans-serif',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Header with logo centered */}
      <div
        className="w-full px-4 pt-4 md:pt-6 pb-3 md:pb-4"
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #888888',
        }}
      >
        {/* Rainbow Apple Logo + Cruz OS 9 - centered and larger */}
        <svg viewBox="0 0 200 55" className="h-[50px] md:h-[65px] mx-auto block">
          <defs>
            <clipPath id="aboutApple">
              <path d="M28 25c0-5.5 4.5-8.2 4.7-8.4-2.5-3.7-6.5-4.3-7.9-4.3-3.3-.3-6.5 2-8.2 2s-4.3-2-7-2c-3.7 0-7 2.1-8.9 5.3-3.8 6.5-1 16.3 2.7 21.7 1.8 2.6 4 5.5 6.8 5.4 2.7 0 3.8-1.8 7-1.8s4.2 1.8 7 1.8 4.9-2.7 6.7-5.3c2.1-3 3-6 3-6.1-.1 0-5.8-2.2-5.9-8.3zM22.6 9.5c1.5-1.8 2.5-4.3 2.2-6.8-2.1.1-4.7 1.4-6.3 3.2-1.4 1.6-2.6 4.1-2.3 6.6 2.4.1 4.9-1.2 6.4-3z" />
            </clipPath>
          </defs>
          <g clipPath="url(#aboutApple)">
            <rect x="0" y="0" width="40" height="8" fill="#61BB46" />
            <rect x="0" y="8" width="40" height="8" fill="#FDB827" />
            <rect x="0" y="16" width="40" height="8" fill="#F5821F" />
            <rect x="0" y="24" width="40" height="8" fill="#E03A3E" />
            <rect x="0" y="32" width="40" height="8" fill="#963D97" />
            <rect x="0" y="40" width="40" height="10" fill="#009DDC" />
          </g>
          <text x="42" y="36" fill="#000000" fontSize="22" fontFamily="Chicago, sans-serif" fontWeight="bold">
            Cruz OS 9
          </text>
        </svg>
      </div>

      {/* System Information */}
      <div className="px-3 md:px-4 py-2 md:py-3" style={{ borderBottom: '1px solid #888888' }}>
        <table className="w-full text-[10px] md:text-[11px]" style={{ borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td className="pr-2 md:pr-3 py-[2px] text-black font-bold">Version:</td>
              <td className="py-[2px] text-black" colSpan={2}>
                Cruz OS 9.0
              </td>
            </tr>
            <tr>
              <td className="pr-2 md:pr-3 py-[2px] text-black font-bold">Built-in Memory:</td>
              <td className="py-[2px] text-black" colSpan={2}>
                4 MB
              </td>
            </tr>
            <tr>
              <td className="pr-2 md:pr-3 py-[2px] text-black font-bold">Virtual Memory:</td>
              <td className="py-[2px] text-black" colSpan={2}>
                Off
              </td>
            </tr>
            <tr>
              <td className="pr-2 md:pr-3 py-[2px] text-black font-bold">Largest Unused Block:</td>
              <td className="py-[2px] text-black">{(largestUnused / 1024).toFixed(1)} MB</td>
              <td className="py-[2px] text-[9px] md:text-[10px] text-[#666666] text-right">
                ™ &amp; © Giovanni Cruz, {currentYear}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Memory Usage List */}
      <div
        className="mx-3 md:mx-4 my-2 md:my-3"
        style={{
          background: '#ffffff',
          border: '1px solid #000000',
          boxShadow: 'inset 1px 1px 0 #888888',
        }}
      >
        {/* Header row */}
        <div
          className="flex items-center text-[9px] md:text-[10px] text-black font-bold px-2 py-1"
          style={{
            background: '#dddddd',
            borderBottom: '1px solid #888888',
          }}
        >
          <div className="flex-1">Application</div>
          <div className="w-[50px] md:w-[70px] text-right">Memory</div>
          <div className="w-[60px] md:w-[80px]"></div>
        </div>

        {/* Cruz OS row */}
        <div className="flex items-center text-[10px] md:text-[11px] text-black px-2 py-[5px] md:py-[6px] border-b border-[#cccccc]">
          <div className="flex items-center gap-1 md:gap-2 flex-1">
            {/* Small system icon */}
            <svg viewBox="0 0 16 16" className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] shrink-0">
              <rect x="2" y="2" width="12" height="9" fill="#dddddd" stroke="#000" strokeWidth="1" />
              <rect x="4" y="4" width="8" height="5" fill="#4477aa" />
              <rect x="6" y="11" width="4" height="2" fill="#888888" />
              <rect x="4" y="13" width="8" height="1" fill="#666666" />
            </svg>
            <span>Cruz OS</span>
          </div>
          <div className="w-[50px] md:w-[70px] text-right text-[9px] md:text-[10px]">
            {(systemUsage / 1024).toFixed(1)} MB
          </div>
          <div className="w-[60px] md:w-[80px] pl-1 md:pl-2">
            <MemoryBar used={systemUsage} total={totalMemory} color="#888888" />
          </div>
        </div>

        {/* Finder row */}
        <div className="flex items-center text-[10px] md:text-[11px] text-black px-2 py-[5px] md:py-[6px]">
          <div className="flex items-center gap-1 md:gap-2 flex-1">
            {/* Small finder icon */}
            <svg viewBox="0 0 16 16" className="w-[12px] h-[12px] md:w-[14px] md:h-[14px] shrink-0">
              <rect x="1" y="3" width="14" height="10" rx="1" fill="#cccccc" stroke="#000" strokeWidth="1" />
              <rect x="3" y="5" width="10" height="6" fill="#ffffff" stroke="#888" strokeWidth="0.5" />
              <circle cx="8" cy="8" r="2" fill="#4477aa" />
            </svg>
            <span>Finder</span>
          </div>
          <div className="w-[50px] md:w-[70px] text-right text-[9px] md:text-[10px]">{finderUsage} K</div>
          <div className="w-[60px] md:w-[80px] pl-1 md:pl-2">
            <MemoryBar used={finderUsage} total={totalMemory} color="#4477aa" />
          </div>
        </div>
      </div>
    </main>
  )
}

function MemoryBar({ used, total, color }: { used: number; total: number; color: string }) {
  const percentage = (used / total) * 100

  return (
    <div
      className="h-[8px] md:h-[10px] w-full"
      style={{
        background: '#ffffff',
        border: '1px solid #000000',
        boxShadow: 'inset 1px 1px 0 #888888',
      }}
    >
      <div
        className="h-full"
        style={{
          width: `${percentage}%`,
          background: `repeating-linear-gradient(
            90deg,
            ${color} 0px,
            ${color} 2px,
            transparent 2px,
            transparent 4px
          )`,
        }}
      />
    </div>
  )
}
