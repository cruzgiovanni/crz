'use client'

import { useState, useEffect } from 'react'

const initialTrashItems = [
  { name: 'old_resume_v1.doc', size: '24 KB', date: 'Jan 15, 2024' },
  { name: 'portfolio_raw_html_version', size: '-- folder', date: 'Mar 8, 2024' },
  { name: 'screenshot_2024.png', size: '156 KB', date: 'Feb 22, 2024' },
  { name: 'notes_backup.txt', size: '2 KB', date: 'Dec 3, 2023' },
  { name: 'test_file.js', size: '1 KB', date: 'Apr 1, 2024' },
]

const TRASH_STORAGE_KEY = 'cruz-os-trash-items'

export function TrashContent() {
  const [items, setItems] = useState(initialTrashItems)
  const [isEmptying, setIsEmptying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(TRASH_STORAGE_KEY)
    if (saved !== null) {
      setItems(JSON.parse(saved))
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoaded])

  const handleEmptyTrash = () => {
    if (items.length === 0) return

    setIsEmptying(true)

    const deleteInterval = setInterval(() => {
      setItems((prev) => {
        if (prev.length <= 1) {
          clearInterval(deleteInterval)
          setIsEmptying(false)
          return []
        }
        return prev.slice(0, -1)
      })
    }, 200)
  }

  return (
    <div className="h-full flex flex-col bg-white font-['Geneva',_'Chicago',_sans-serif] text-[11px] md:text-[12px]">
      {/* Header */}
      <div
        className="px-3 py-2 border-b border-[#888888] shrink-0 flex items-center justify-between"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #dddddd 100%)',
        }}
      >
        <p className="text-black font-bold">
          {items.length === 0 ? 'Trash is empty' : `${items.length} item${items.length !== 1 ? 's' : ''} in Trash`}
        </p>
        <button
          onClick={handleEmptyTrash}
          disabled={items.length === 0 || isEmptying}
          className="px-3 py-1 text-[10px] md:text-[11px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:brightness-90 text-black/90"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)',
            border: '1px solid #000000',
            boxShadow: 'inset -1px -1px 0 #888888, inset 1px 1px 0 #ffffff',
          }}
        >
          {isEmptying ? 'Emptying...' : 'Empty Trash'}
        </button>
      </div>

      {/* File list header */}
      <div
        className="grid grid-cols-[1fr_80px_100px] px-3 py-1 border-b border-[#aaaaaa] text-[10px] text-[#666666] shrink-0"
        style={{
          background: '#eeeeee',
        }}
      >
        <span>Name</span>
        <span>Size</span>
        <span>Date Deleted</span>
      </div>

      {/* File list - scrollable area using main tag */}
      <main
        className="flex-1 min-h-0"
        style={{
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-[#888888]">
            <span className="text-[32px] mb-2">🗑️</span>
            <p>No items in Trash</p>
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_80px_100px] px-3 py-1.5 border-b border-[#dddddd] hover:bg-[#e8e8ff] cursor-default"
            >
              <div className="flex items-center gap-2">
                <span className="text-[14px]">{item.name.includes('folder') ? '📁' : '📄'}</span>
                <span className="text-black truncate">{item.name}</span>
              </div>
              <span className="text-[#666666]">{item.size}</span>
              <span className="text-[#666666]">{item.date}</span>
            </div>
          ))
        )}
      </main>

      {/* Footer */}
      <div
        className="px-3 py-2 border-t border-[#888888] text-[10px] text-[#666666] shrink-0"
        style={{
          background: 'linear-gradient(180deg, #eeeeee 0%, #dddddd 100%)',
        }}
      >
        <p>{items.length === 0 ? 'Trash has been emptied' : 'Click "Empty Trash" to permanently delete all items'}</p>
      </div>
    </div>
  )
}
