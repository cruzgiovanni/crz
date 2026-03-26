'use client'

export function FooterNavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (href.startsWith('#')) {
          e.preventDefault()
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
        }
      }}
      className="block font-sans font-bold text-[2.8rem] md:text-5xl text-foreground hover:text-muted-foreground transition-colors tracking-tight leading-[1.1]"
    >
      {label}
    </a>
  )
}
