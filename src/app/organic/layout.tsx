import type React from 'react'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { PageTransition } from '@/components/page-transition'
import { NavigationTransition } from '@/components/navigation-transition'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Dancing_Script, Caveat } from 'next/font/google'

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Giovanni Cruz',
  description: 'Giovanni Cruz - Portfolio',
  generator: 'Next.js',
  keywords: ['Giovanni', 'Cruz', 'Developer', 'Engineer', 'Software', 'Engineer'],
  applicationName: 'Giovanni Cruz',
  openGraph: {
    type: 'website',
    url: 'https://giovannicruz.dev/organic',
    title: 'Giovanni Cruz',
    description: 'Giovanni Cruz - Portfolio',
    images: [
      {
        url: 'https://giovannicruz.dev/art.jpeg',
        width: 1280,
        height: 1280,
        alt: 'Giovanni Cruz',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
