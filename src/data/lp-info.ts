export const contactContent = {
  whatsapp: 'https://wa.me/5500000000000',
}

export const navbarContent = {
  logo: {
    alt: 'Giovanni Cruz',
    text: 'giovannicruz.dev',
    href: '/start',
  },
  navLinks: [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: contactContent.whatsapp },
  ],
}

export const heroContent = {
  words: ['SITES', 'SISTEMAS', 'RESULTADOS'],
  mainTitle: {
    line1: 'EU FAÇO',
    line2: 'QUE TRABALHAM POR VOCÊ.',
  },
  subtitle: 'Parceiro de empresários que precisam de presença digital sólida. Sem sumiço, sem enrolação.',
}

export const problemsContent = {
  sectionLabel: 'O Problema',
  problems: [
    'Você já contratou alguém que sumiu no meio do projeto.',
    'Pagou caro por algo que nunca funcionou direito.',
    'Teve que explicar a mesma coisa mil vezes.',
    'E no final, ficou com um site que você tem vergonha de mostrar.',
  ],
  transition: {
    title: 'COMIGO NÃO.',
    subtitle: 'Entrega silenciosa. Qualidade que fala por si.',
  },
}

export const servicesContent = {
  sectionLabel: 'Serviços',
  services: [
    { id: '01', title: 'Websites' },
    { id: '02', title: 'Sistemas' },
    { id: '03', title: 'E-commerce' },
    { id: '04', title: 'Identidade Visual' },
  ],
}

export const aboutContent = {
  sectionLabel: 'Sobre',
  title: {
    line1: 'VOCÊ FALA COMIGO.',
    line2: 'NÃO COM UM ATENDENTE.',
  },
  description: [
    'Sou desenvolvedor e trabalho diretamente com cada cliente. Sem intermediários, sem ruído, sem aquele jogo de telefone sem fio que atrasa tudo.',
    'Meu trabalho é entregar soluções que funcionam — com clareza, prazo e qualidade. Simples assim.',
  ],
  stats: [
    { value: '4+', label: 'Anos' },
    { value: 'Direto', label: 'Sem intermediários' },
    { value: '1:1', label: 'Atendimento Exclusivo' },
  ],
}

export const ctaContent = {
  title: {
    line1: 'SEU PROJETO TEM',
    line2: 'QUEM RESOLVER.',
  },
  buttonText: 'Falar no WhatsApp',
}

export const footerContent = {
  logoText: 'GVNNCRZ.',
  ctaText: 'Tem um projeto parado ou um site que você tem vergonha de mostrar? Me fala.',
  ctaLinkText: 'Fale Comigo',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Contato', href: '#contato' },
  ],
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/giovannicruzdev' },
    { label: 'GitHub', href: 'https://github.com/cruzgiovanni' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eugiovannicruz/' },
  ],
  copyright: (year: number) => `© Giovanni Cruz ${year} all rights reserved`,
}
