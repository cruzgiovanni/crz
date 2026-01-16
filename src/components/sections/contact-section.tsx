'use client'

import { Mail, MapPin } from 'lucide-react'
import { useReveal } from '@/hooks/use-reveal'
import { useState, type FormEvent } from 'react'
import { MagneticButton } from '@/components/magnetic-button'

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: '', email: '', message: '' })

    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-5 pt-24 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-4 transition-all duration-700 md:mb-12 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
              }`}
            >
              <h2 className="mb-2 font-sans text-3xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                Let's talk
              </h2>
              <p className="font-mono text-[10px] text-foreground/50 md:text-sm">/ Get in touch</p>
            </div>

            <div className="space-y-3 md:space-y-6">
              <a
                href="mailto:giovanni@crz.dev"
                className={`group block transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <div className="mb-0.5 flex items-center gap-2 md:mb-1">
                  <Mail className="h-3 w-3 text-foreground/50" />
                  <span className="font-mono text-[10px] text-foreground/50 md:text-xs">Email</span>
                </div>
                <p className="text-sm text-foreground transition-colors group-hover:text-foreground/70 md:text-xl">
                  giovanni@crz.dev
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                <div className="mb-0.5 flex items-center gap-2 md:mb-1">
                  <MapPin className="h-3 w-3 text-foreground/50" />
                  <span className="font-mono text-[10px] text-foreground/50 md:text-xs">Location</span>
                </div>
                <p className="text-sm text-foreground md:text-xl">São Paulo, Brazil</p>
              </div>

              <div
                className={`flex gap-3 pt-1 transition-all duration-700 md:pt-4 ${
                  isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                {['LinkedIn', 'GitHub'].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="font-mono text-[10px] text-foreground/50 transition-all hover:text-foreground md:text-xs"
                  >
                    {social}
                  </a>
                ))}
              </div>

              <div
                className={`pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                <p className="font-mono text-[10px] text-foreground/30 md:text-xs">© 2026</p>
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-6">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '200ms' }}
              >
                <label className="mb-1 block font-mono text-[10px] text-foreground/50 md:mb-2 md:text-xs">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b border-foreground/20 bg-transparent py-1.5 text-sm caret-primary placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none md:py-2 md:text-base"
                  style={{ color: '#cdd6f4' }}
                  placeholder="Your name"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '350ms' }}
              >
                <label className="mb-1 block font-mono text-[10px] text-foreground/50 md:mb-2 md:text-xs">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border-b border-foreground/20 bg-transparent py-1.5 text-sm caret-primary placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none md:py-2 md:text-base"
                  style={{ color: '#cdd6f4' }}
                  placeholder="your@email.com"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
                }`}
                style={{ transitionDelay: '500ms' }}
              >
                <label className="mb-1 block font-mono text-[10px] text-foreground/50 md:mb-2 md:text-xs">
                  Message
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full resize-none border-b border-foreground/20 bg-transparent py-1.5 text-sm caret-primary placeholder:text-foreground/30 focus:border-primary/50 focus:outline-none md:py-2 md:text-base"
                  style={{ color: '#cdd6f4' }}
                  placeholder="Tell me about your project..."
                />
              </div>

              <div
                className={`pt-2 transition-all duration-700 md:pt-0 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: '650ms' }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50"
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-2 text-center font-mono text-xs text-foreground/70 md:mt-3 md:text-sm">
                    Message sent successfully!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
