import '@/app/start/start.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Giovanni Cruz',
  description: 'Desenvolvimento web sob medida — sites, landing pages e sistemas para o seu negócio.',
  openGraph: {
    type: 'website',
    url: 'https://giovannicruz.dev/start',
    title: 'Giovanni Cruz',
    description: 'Desenvolvimento web sob medida — sites, landing pages e sistemas para o seu negócio.',
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
