'use client'

import Link from 'next/link'
import Image from 'next/image'
import art from '../../../../public/art.jpeg'
import { navbarContent } from '@/data/lp-info'

const { logo, navLinks } = navbarContent

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="flex items-center justify-between px-2 md:px-4 py-2">
        <Link href={logo.href} className="flex items-center gap-2">
          <Image src={art} alt={logo.alt} width={22} height={22} loading="eager" priority />
          <span className="text-[10px] font-semibold text-foreground tracking-tight">{logo.text}</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[10px] font-semibold text-foreground hover:text-muted-foreground transition-colors hidden sm:inline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
