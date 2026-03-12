import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display, Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-display',
})

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Giovanni Cruz',
  description: 'Giovanni Cruz - Portfolio',
  generator: 'Next.js',
  keywords: ['Giovanni', 'Cruz', 'Developer', 'Engineer', 'Software', 'Engineer'],
  applicationName: 'Giovanni Cruz',
  openGraph: {
    type: 'website',
    url: 'https://giovannicruz.dev',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${playfair.variable}`} suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
