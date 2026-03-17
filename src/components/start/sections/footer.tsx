'use client'

import React from 'react'
import Link from 'next/link'
import { footerContent, contactContent } from '@/data/lp-info'

const { logoText, ctaText, ctaLinkText, navLinks, socialLinks, copyright } = footerContent

export function Footer() {
  return (
    <footer className="relative bg-background">
      {/* Giant Logo - Full width edge to edge, NO padding */}
      <div className="w-full overflow-hidden" style={{ height: '20vw' }}>
        <h1
          className="w-full text-[20vw] leading-none text-[#5a5a5a] -mb-4"
          style={{
            fontFamily: 'var(--font-sans), sans-serif',
            fontWeight: 1000,
            letterSpacing: '-0.05em',
          }}
        >
          {logoText}
        </h1>
      </div>

      {/* Horizontal line - with padding to match content */}
      <div className="px-2 md:px-4 -mt-2 md:-mt-4">
        <div className="h-px bg-border/50" />
      </div>

      {/* Footer content - tall section like basement */}
      <div className="min-h-[55vh] flex flex-col justify-end px-2 md:px-4 pb-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          {/* CTA - Left */}
          <div className="md:col-span-4 order-2 md:order-1">
            <p className="text-xs text-foreground leading-snug tracking-tight mb-4 max-w-70">{ctaText}</p>
            <Link
              href={contactContent.whatsapp}
              target="_blank"
              className="inline-flex items-center gap-1 text-xs text-foreground hover:text-muted-foreground transition-colors group"
            >
              {ctaLinkText}
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>

          {/* Navigation - Center */}
          <div className="md:col-span-4 md:col-start-6 order-1 md:order-2">
            <nav className="space-y-0">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block font-sans font-bold text-2xl md:text-3xl text-foreground hover:text-muted-foreground transition-colors tracking-tight leading-[1.1]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social & Copyright - Bottom Right */}
          <div className="md:col-span-4 order-3 flex flex-col items-start md:items-end gap-1">
            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
              {socialLinks.map((link, index) => (
                <React.Fragment key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                  {index < socialLinks.length - 1 && <span>,</span>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground">{copyright(new Date().getFullYear())}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
