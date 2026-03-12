import { Hero } from '@/components/sections/hero'
import { Problems } from '@/components/sections/problems'
import { Services } from '@/components/sections/services'
import { About } from '@/components/sections/about'
import { CTA } from '@/components/sections/cta'
import { Footer } from '@/components/sections/footer'
import { WhatsAppButton } from '@/components/whatsapp-button'

export default function Start() {
  return (
    <main className="min-h-screen bg-background">
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
