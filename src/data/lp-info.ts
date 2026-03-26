const message = 'Olá, tudo bem? Tenho um projeto e queria conversar com você.'
const encodedMessage = encodeURIComponent(message)
const link = `https://wa.me/5519996391410?text=${encodedMessage}`

export const contactContent = {
  whatsapp: link,
}

export const navbarContent = {
  logo: {
    alt: 'Giovanni Cruz',
    text: 'giovannicruz.dev',
    href: '/start',
  },
  navLinks: [
    { label: 'Serviços', href: '#services' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: contactContent.whatsapp },
  ],
}

export const heroContent = {
  words: ['sites', 'sistemas', 'landing pages', 'presença digital', 'resultados'],
  mainTitle: {
    line1: 'Eu faço',
    line2: 'que trabalham por você.',
  },
  subtitle: 'Desenvolvimento sob medida. Suporte que não expira. Um parceiro fixo para o seu negócio crescer.',
}

export const problemsContent = {
  sectionLabel: 'O Problema',
  problems: [
    'A maioria dos desenvolvedores entrega um arquivo e some. Você fica com um site que ninguém mantém, ninguém melhora e ninguém atende quando algo para de funcionar.',
  ],
  transition: {
    title: 'Eu sou o oposto disso.',
    subtitle: 'Presença constante. Do primeiro dia em diante.',
  },
}

export const servicesContent = {
  sectionLabel: 'Serviços',
  title: 'Tudo que seu negócio precisa pra existir de verdade na internet.',
  services: [
    {
      id: '01',
      title: 'Websites',
      description:
        'Sites rápidos, responsivos e feitos do zero. Sem templates. Cada detalhe pensado para converter visitantes em clientes.',
    },
    {
      id: '02',
      title: 'Sistemas',
      description:
        'Painéis, dashboards e ferramentas internas sob medida. Automação real para o dia a dia do seu negócio.',
    },
    {
      id: '03',
      title: 'E-commerce',
      description:
        'Lojas virtuais com checkout otimizado, gestão de produtos e integração com meios de pagamento.',
    },
    {
      id: '04',
      title: 'Identidade Visual',
      description:
        'Logo, paleta de cores e linguagem visual consistente. Sua marca com cara profissional desde o primeiro contato.',
    },
  ],
}

export const aboutContent = {
  sectionLabel: 'Sobre',
  title: {
    line1: 'Sou Giovanni Cruz.',
    line2: 'Desenvolvedor de software.',
  },
  description: [
    'Trabalho com desenvolvimento de software desde 2021. Cada projeto é feito do zero, com código próprio e design pensado para o negócio do cliente.',
    'Você fala diretamente comigo. Eu executo, entrego e continuo do lado. O projeto não termina na entrega.',
  ],
  stats: [
    { value: 'Desde 2021', label: 'No mercado' },
    { value: 'Código próprio', label: 'Nada de template' },
    { value: '1:1', label: 'Direto comigo' },
  ],
}

export const ctaContent = {
  title: {
    line1: 'Seu negócio merece',
    line2: 'mais do que um site.',
  },
  buttonText: 'Falar no WhatsApp',
}

export const footerContent = {
  logoText: 'GVNNCRZ.',
  ctaText: 'Tem um projeto parado ou um site que você tem vergonha de mostrar? Me fala.',
  ctaLinkText: 'Fale Comigo',
  navLinks: [
    { label: 'Home', href: '/start' },
    { label: 'Serviços', href: '#services' },
    { label: 'Sobre', href: '#about' },
    { label: 'Contato', href: '#contact' },
  ],
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/giovannicruzdev' },
    { label: 'GitHub', href: 'https://github.com/cruzgiovanni' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eugiovannicruz/' },
  ],
  copyright: (year: number) => `© Giovanni Cruz ${year}. Todos os direitos reservados.`,
}
