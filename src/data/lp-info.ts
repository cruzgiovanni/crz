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
  words: ['sites', 'sistemas', 'landing pages', 'resultados', 'softwares'],
  mainTitle: {
    line1: 'Eu faço',
    line2: 'que trabalham por você.',
  },
  subtitle:
    'Parceiro de empresários que precisam de presença digital sólida. Sem sumiço, sem enrolação.',
}

export const problemsContent = {
  sectionLabel: 'O Problema',
  problems: [
    'Você já contratou alguém que sumiu no meio do projeto. Pagou caro por algo que nunca funcionou direito. Teve que explicar a mesma coisa mil vezes. E no final, ficou com um site que você tem vergonha de mostrar.',
  ],
  transition: {
    title: 'Comigo não.',
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
    line1: 'Você fala comigo.',
    line2: 'Não com uma IA.',
  },
  description: [
    'Sou desenvolvedor e trabalho diretamente com cada cliente. Sem intermediários, sem ruído, sem aquele jogo de telefone sem fio que atrasa tudo.',
    'Meu trabalho é entregar soluções que funcionam. Com clareza, prazo e qualidade. Simples assim.',
  ],
  stats: [
    { value: '4+', label: 'Anos de vivêncian na área' },
    { value: 'Direto', label: 'Sem intermediários' },
    { value: '1:1', label: 'Atendimento exclusivo' },
  ],
}

export const ctaContent = {
  title: {
    line1: 'Seu projeto tem',
    line2: 'quem resolver.',
  },
  buttonText: 'Falar no WhatsApp',
}

export const footerContent = {
  logoText: 'GVNNCRZ.',
  ctaText:
    'Tem um projeto parado ou um site que você tem vergonha de mostrar? Me fala.',
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
  copyright: (year: number) => `© Giovanni Cruz ${year} - All rights reserved.`,
}
