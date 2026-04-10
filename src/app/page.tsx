import { Hero } from '@/components/start/sections/hero'
import { Navbar } from '@/components/start/sections/navbar'
import { Problems } from '@/components/start/sections/problems'
import { Services } from '@/components/start/sections/services'
import { About } from '@/components/start/sections/about'
import { CTA } from '@/components/start/sections/cta'
import { Footer } from '@/components/start/sections/footer'
import { WhatsAppButton } from '@/components/start/whatsapp-button'

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-bold ">
      <Navbar />
      <Hero />
      <Problems />
      <Services />
      <About />
      <CTA />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
