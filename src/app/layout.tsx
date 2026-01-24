import type React from 'react'
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-display',
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
    description: 'Giovanni Cruz',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/4f2d23d2-08e8-42d1-9f70-a915dd9ff5ff.png?token=QvvhyqeSdO-cIyIvZBZSNIU7OFy1m9X7_NQr8mz5BdM&height=1080&width=1080&expires=33287917845',
        width: 1080,
        height: 1080,
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
    <html lang="en" className={playfair.variable}>
      <body className="font-sans antialiased">
        <Analytics />
        {children}
      </body>
    </html>
  )
}
