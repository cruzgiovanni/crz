import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { DATA } from "@/data/resume"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { LanguageProvider } from "../../languageContext"
import { ReactLenis } from "@/lib/lenis"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.pt.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.pt.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/4f2d23d2-08e8-42d1-9f70-a915dd9ff5ff.png?token=QvvhyqeSdO-cIyIvZBZSNIU7OFy1m9X7_NQr8mz5BdM&height=1080&width=1080&expires=33287917845",
        width: 1080,
        height: 1080,
        alt: `${DATA.name} - Desenvolvimento Web e Software`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
    images: [
      "https://opengraph.b-cdn.net/production/images/4f2d23d2-08e8-42d1-9f70-a915dd9ff5ff.png?token=QvvhyqeSdO-cIyIvZBZSNIU7OFy1m9X7_NQr8mz5BdM&height=1080&width=1080&expires=33287917845",
    ],
  },
  verification: {
    google: "",
    yandex: "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt_BR" suppressHydrationWarning>
      <ReactLenis root>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <LanguageProvider>
              <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
            </LanguageProvider>
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  )
}
