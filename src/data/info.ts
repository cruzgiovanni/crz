import { siteConfig } from './config'

export const hero = {
  badge: 'Software Engineer',
  name: 'Giovanni Cruz',
  intro: 'Writing code that reads like prose and performs like a machine. Precise. Intentional. Uncluttered.',
  description: 'I design systems with a strong sense of structure and restraint.',
  paragraph: 'Less noise. More intention.',
  cta: {
    keyword: 'await',
    object: 'portfolio',
    method: 'explore',
  },
  graphite: {
    crossedOutWord: 'Overengineered',
    graphitedWord: 'Essential',
    continuationText: 'logic',
  },
}

export const projectsSection = {
  title: 'Work',
  subtitle: '/ Professional experience and selected projects',
}

export const projects = [
  {
    number: '01',
    title: 'Piva Insurances',
    category: 'Insurance Management Platform',
    year: '11/2024 - 01/2026',
    tech: 'React • Pocketbase • Shadcn UI',
    direction: 'left' as const,
    repo: 'https://github.com/emiliobiasi/pivaseguros',
    type: 'experience' as const,
  },
  {
    number: '02',
    title: 'Solution Card',
    category: 'Digital Health Platform',
    year: '07/2025',
    tech: 'Next.js • Tailwind CSS • Framer Motion',
    direction: 'right' as const,
    demo: 'https://solucaocard.com.br/',
    type: 'project' as const,
  },
  {
    number: '03',
    title: 'Book SaaS',
    category: 'SaaS with Auth & Subscriptions',
    year: '02/2025',
    tech: 'Next.js • Prisma • Stripe • NextAuth',
    direction: 'left' as const,
    repo: 'https://github.com/cruzgiovanni/livroSaas',
    type: 'project' as const,
  },
  {
    number: '04',
    title: 'Delivery FSW',
    category: 'Real-time Delivery System',
    year: '02/2025',
    tech: 'Next.js • Prisma • NeonDB • Stripe',
    direction: 'right' as const,
    repo: 'https://github.com/cruzgiovanni/fsw-delivery',
    type: 'project' as const,
  },
]

export const skillCategories = [
  {
    title: 'Backend',
    description: 'Building scalable APIs and server-side systems',
    technologies: [
      'TypeScript',
      'Bun',
      'Node.js',
      'PostgreSQL',
      'MongoDB',
      'ORMs',
      'BaaS Platforms',
      'Express.js',
      'ElysiaJS',
    ],
    color: '#89b4fa',
    direction: 'top' as const,
  },
  {
    title: 'Frontend',
    description: 'Crafting intuitive interfaces and user experiences',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    color: '#94e2d5',
    direction: 'right' as const,
  },
  {
    title: 'Blockchain',
    description: 'Developing smart contracts and Web3 solutions',
    technologies: ['Solidity', 'Hardhat', 'Ethereum'],
    color: '#fab387',
    direction: 'left' as const,
  },
  {
    title: 'DevOps',
    description: 'Deploying and maintaining production systems',
    technologies: ['Docker', 'Github Actions', 'AWS', 'Linux', 'Git'],
    color: '#f5c2e7',
    direction: 'bottom' as const,
  },
]

export const techTags = [
  'TypeScript',
  'Bun',
  'Node.js',
  'PostgreSQL',
  'MongoDB',
  'Prisma',
  'Drizzle',
  'Supabase',
  'Firebase',
  'Express.js',
  'ElysiaJS',
  'React',
  'Next.js',
  'Tailwind CSS',
  'Solidity',
  'Hardhat',
  'Ethereum',
  'Docker',
  'AWS',
  'Linux',
  'Git',
]

export const aboutSection = {
  label: 'About me',
  paragraphs: [
    'I’m a Software Engineer drawn to systems and aesthetics that age well. ',
    'In code, that means structure, restraint, and clarity.',
    'Outside of it, the same principles apply.',
    'Software. Habits. Style.',
  ],
  signature: '// I code on faith and old blues from the 70s.',
  stats: [
    { value: `${new Date().getFullYear() - 2023}+`, label: 'in software development', accent: true },
    { value: 'Curious', label: 'by nature', accent: true },
  ],
}

export const contactSection = {
  title: "Let's talk",
  subtitle: '/ Get in touch',
  email: {
    label: 'Email',
    value: siteConfig.email,
  },
  location: {
    label: 'Location',
    value: siteConfig.location,
  },
  socials: ['LinkedIn', 'GitHub'],
}

export const navItems = ['Home', 'Terminal']
