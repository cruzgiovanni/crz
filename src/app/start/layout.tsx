import '@/app/start/start.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Giovanni Cruz',
  description: 'Websites & Softwares que impressionam.',
  openGraph: {
    type: 'website',
    url: 'https://giovannicruz.dev/start',
    title: 'Giovanni Cruz',
    description: 'Websites & Softwares que impressionam.',
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

export default function StartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${GeistSans.variable} font-sans`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </div>
  )
}
