import type React from 'react'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
