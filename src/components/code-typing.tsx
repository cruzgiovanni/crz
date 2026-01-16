'use client'

import { useEffect, useState, useMemo } from 'react'

const codeSnippets = [
  `const giovanni = {
  role: "Software Engineer",
  stack: ["TypeScript", "Node.js", "Bun"],
  passion: "Building scalable systems"
};`,
  `async function buildSolution(idea: Idea) {
  const architecture = await design(idea);
  const code = await implement(architecture);
  return deploy(code);
}`,
  `interface Developer {
  name: "Giovanni Cruz";
  skills: Backend | Frontend | Blockchain;
  status: "Available for projects";
}`,
  `export const stack = {
  backend: ["Bun", "Node.js", "PostgreSQL"],
  blockchain: ["Solidity", "Hardhat"],
  deploy: ["Docker", "AWS", "Vercel"]
} as const;`,
]

export function CodeTyping() {
  const [currentSnippetIndex, setCurrentSnippetIndex] = useState(0)
  const [displayedCode, setDisplayedCode] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)

  const currentSnippet = useMemo(() => codeSnippets[currentSnippetIndex], [currentSnippetIndex])

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing effect
  useEffect(() => {
    if (isTyping) {
      if (displayedCode.length < currentSnippet.length) {
        const timeout = setTimeout(
          () => {
            setDisplayedCode(currentSnippet.slice(0, displayedCode.length + 1))
          },
          Math.random() * 30 + 20,
        )
        return () => clearTimeout(timeout)
      } else {
        // Finished typing, wait then start erasing
        const timeout = setTimeout(() => {
          setIsTyping(false)
        }, 3000)
        return () => clearTimeout(timeout)
      }
    } else {
      // Erasing
      if (displayedCode.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, -1))
        }, 15)
        return () => clearTimeout(timeout)
      } else {
        // Finished erasing, move to next snippet
        setCurrentSnippetIndex((prev) => (prev + 1) % codeSnippets.length)
        setIsTyping(true)
      }
    }
  }, [displayedCode, isTyping, currentSnippet])

  // Syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(
        /(const|let|var|function|async|await|return|export|interface|type)/g,
        '<span class="text-[#cba6f7]">$1</span>',
      )
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-[#a6e3a1]">$1</span>')
      .replace(/(\{|\}|\[|\]|$$|$$)/g, '<span class="text-[#f9e2af]">$1</span>')
      .replace(/(:|=|=>|&lt;|&gt;|\|)/g, '<span class="text-[#89dceb]">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#fab387]">$1</span>')
      .replace(/\/\/.*/g, '<span class="text-[#6c7086]">$&</span>')
  }

  return (
    <div className="relative hidden lg:block">
      {/* Floating code window */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-105 opacity-60 hover:opacity-90 transition-opacity duration-500">
        {/* Window chrome */}
        <div className="rounded-xl border border-[#313244] bg-[#1e1e2e]/90 backdrop-blur-xl shadow-2xl shadow-[#cba6f7]/5 overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[#313244] bg-[#181825]/50">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#f38ba8]" />
              <div className="w-3 h-3 rounded-full bg-[#f9e2af]" />
              <div className="w-3 h-3 rounded-full bg-[#a6e3a1]" />
            </div>
            <span className="ml-2 font-mono text-xs text-[#6c7086]">giovanni-cruz.ts</span>
          </div>

          {/* Code content */}
          <div className="p-4 font-mono text-sm leading-relaxed">
            {/* Line numbers */}
            <div className="flex">
              <div className="pr-4 text-right text-[#45475a] select-none border-r border-[#313244] mr-4">
                {displayedCode.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <pre className="flex-1 text-[#cdd6f4] whitespace-pre-wrap">
                <code
                  dangerouslySetInnerHTML={{
                    __html:
                      highlightCode(displayedCode) +
                      (showCursor
                        ? '<span class="inline-block w-2 h-5 ml-0.5 bg-[#cba6f7] animate-pulse align-middle"></span>'
                        : '<span class="inline-block w-2 h-5 ml-0.5 align-middle"></span>'),
                  }}
                />
              </pre>
            </div>
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 py-2 border-t border-[#313244] bg-[#181825]/50">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#6c7086]">
                <span className="w-2 h-2 rounded-full bg-[#a6e3a1]" />
                TypeScript
              </span>
              <span className="font-mono text-xs text-[#6c7086]">UTF-8</span>
            </div>
            <span className="font-mono text-xs text-[#6c7086]">
              Ln {displayedCode.split('\n').length}, Col {(displayedCode.split('\n').pop()?.length || 0) + 1}
            </span>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-4 -z-10 rounded-2xl bg-linear-to-br from-[#cba6f7]/10 via-transparent to-[#89b4fa]/10 blur-2xl" />
      </div>
    </div>
  )
}
