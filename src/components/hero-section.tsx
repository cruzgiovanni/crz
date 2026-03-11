import { Button } from '@/components/ui/button'
import RotatingText from './RotatingText'

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Play = () => (
  <svg
    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
)

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center px-4 py-20 relative">
      <div className="max-w-6xl mx-auto lg:mx-0 lg:ml-auto text-center lg:text-left relative z-10 animate-fade-in-hero">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
          <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
          Desenvolvimento Web · Brasil
        </div>

        {/* Main Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-balance mb-6 animate-fade-in-heading font-[family-name:var(--font-dm-serif)]">
          <span className="text-foreground">Seu negócio</span>
          <br />
          <span className="inline-flex items-center flex-wrap gap-2 mt-2 sm:mt-6 md:mt-2">
            <span className="text-foreground">merece um site que</span>
            <span className="inline-flex shrink-0">
              <RotatingText
                texts={['trabalha', 'converte', 'aparece', 'funciona', 'cresce']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 rounded-lg shadow-lg"
                staggerFrom={'last'}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '-120%' }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
                transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl md:text-2xl text-white text-balance max-w-sm sm:max-w-3xl mx-auto lg:mx-0 mb-8 sm:mb-12 leading-relaxed animate-fade-in-subheading font-light">
          Criação de sites e sistemas web com acompanhamento contínuo. Sem sumir depois de entregar. Sem template
          genérico.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            size="lg"
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer relative overflow-hidden"
          >
            Conversar no WhatsApp
            <ArrowRight />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-8 py-4 text-lg font-medium border-border hover:bg-accent transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <Play />
            Ver Portfólio
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="px-4 hidden lg:block overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6">Giovanni Cruz · São Paulo, SP · Brasil</p>
          <div className="relative overflow-hidden w-full max-w-4xl lg:max-w-none">
            <div className="flex items-center gap-8 opacity-60 hover:opacity-80 transition-all duration-500 animate-slide-left">
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">Site Institucional</div>
                <div className="text-base sm:text-lg font-semibold">Landing Page</div>
                <div className="text-base sm:text-lg font-semibold">Sistema Web</div>
                <div className="text-base sm:text-lg font-semibold">Redesign</div>
                <div className="text-base sm:text-lg font-semibold">Manutenção</div>
                <div className="text-base sm:text-lg font-semibold">Consultoria</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div className="text-base sm:text-lg font-semibold">Site Institucional</div>
                <div className="text-base sm:text-lg font-semibold">Landing Page</div>
                <div className="text-base sm:text-lg font-semibold">Sistema Web</div>
                <div className="text-base sm:text-lg font-semibold">Redesign</div>
                <div className="text-base sm:text-lg font-semibold">Manutenção</div>
                <div className="text-base sm:text-lg font-semibold">Consultoria</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="px-4 mb-8 lg:hidden overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6 text-center">Giovanni Cruz · São Paulo, SP · Brasil</p>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto">
            {/* Left blur fade */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right blur fade */}
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-6 opacity-60 animate-slide-left-mobile">
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-sm font-semibold">Site Institucional</div>
                <div className="text-sm font-semibold">Landing Page</div>
                <div className="text-sm font-semibold">Sistema Web</div>
                <div className="text-sm font-semibold">Redesign</div>
                <div className="text-sm font-semibold">Manutenção</div>
                <div className="text-sm font-semibold">Consultoria</div>
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-6 whitespace-nowrap">
                <div className="text-sm font-semibold">Site Institucional</div>
                <div className="text-sm font-semibold">Landing Page</div>
                <div className="text-sm font-semibold">Sistema Web</div>
                <div className="text-sm font-semibold">Redesign</div>
                <div className="text-sm font-semibold">Manutenção</div>
                <div className="text-sm font-semibold">Consultoria</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
