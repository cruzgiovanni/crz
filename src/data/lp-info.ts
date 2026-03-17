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
    line2: 'QUE PERFORMAM.',
  },
  subtitle: 'Parceiro de empresários que buscam solidez, excelência e resultados reais no digital.',
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
    title: 'AQUI É DIFERENTE.',
    subtitle: 'Entrega silenciosa. Qualidade que fala por si.',
  },
}

export const servicesContent = {
  sectionLabel: 'Serviços',
  services: [
    { id: '01', title: 'Websites' },
    { id: '02', title: 'Sistemas' },
    { id: '03', title: 'E-commerce' },
    { id: '04', title: 'Consultoria' },
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
    { value: '5+', label: 'Anos' },
    { value: '50+', label: 'Projetos' },
    { value: '100%', label: 'Entrega' },
  ],
}

export const ctaContent = {
  title: {
    line1: 'VAMOS CRIAR ALGO',
    line2: 'QUE FUNCIONA?',
  },
  buttonText: 'Conversar no WhatsApp',
}

export const footerContent = {
  logoText: 'GVNNCRZ.',
  ctaText: 'Pronto para elevar seu negócio? Entre em contato e vamos conversar sobre seu projeto.',
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
