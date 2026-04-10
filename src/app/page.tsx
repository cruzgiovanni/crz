import { Hero } from '@/components/lp/sections/hero'
import { Navbar } from '@/components/lp/sections/navbar'
import { Problems } from '@/components/lp/sections/problems'
import { Services } from '@/components/lp/sections/services'
import { About } from '@/components/lp/sections/about'
import { CTA } from '@/components/lp/sections/cta'
import { Footer } from '@/components/lp/sections/footer'
import { WhatsAppButton } from '@/components/lp/whatsapp-button'

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
