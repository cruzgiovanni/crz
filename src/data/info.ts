import { siteConfig } from './config'

export const hero = {
  badge: 'Software Engineer',
  name: 'Giovanni Cruz',
  description:
    'I turn mass of JSON into systems that scale, and mass of chaos into clean APIs. Backend-focused, full-stack capable.',
  cta: {
    keyword: 'await',
    object: 'portfolio',
    method: 'explore',
  },
  scrollHint: 'Scroll to explore',
  graphite: {
    crossedOutWord: 'Googling',
    graphitedWord: 'Engineering',
    continuationText: 'solutions',
  },
}

export const projectsSection = {
  title: 'Projects',
  subtitle: '/ Check out my latest work',
}

export const projects = [
  {
    number: '01',
    title: 'Solution Card',
    category: 'Digital Health Platform',
    year: '07/2025',
    tech: 'Next.js • Tailwind CSS • Framer Motion',
    direction: 'left' as const,
  },
  {
    number: '02',
    title: 'Book SaaS',
    category: 'SaaS with Auth & Subscriptions',
    year: '02/2025',
    tech: 'Next.js • Prisma • Stripe • NextAuth',
    direction: 'right' as const,
  },
  {
    number: '03',
    title: 'Delivery FSW',
    category: 'Real-time Delivery System',
    year: '02/2025',
    tech: 'Next.js • Prisma • NeonDB • Stripe',
    direction: 'left' as const,
  },
  {
    number: '04',
    title: 'Piva Insurances',
    category: 'Insurance Management Platform',
    year: '11/2024',
    tech: 'React • Pocketbase • Shadcn UI',
    direction: 'right' as const,
  },
]

export const skillsSection = {
  title: 'Core Skills',
  subtitle: '/ Technologies I work with',
}

export const skillCategories = [
  {
    title: 'Backend',
    description: 'TypeScript, Bun, Node.js, ORMs, PostgreSQL, MongoDB, BaaS Platforms',
    direction: 'top' as const,
  },
  {
    title: 'Frontend',
    description: 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion',
    direction: 'right' as const,
  },
  {
    title: 'Blockchain',
    description: 'Solidity, Hardhat, Ethereum',
    direction: 'left' as const,
  },
  {
    title: 'DevOps',
    description: 'Docker, CI/CD, AWS, Vercel, Linux',
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
  'React',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'Solidity',
  'Hardhat',
  'Ethereum',
  'Docker',
  'AWS',
  'Vercel',
  'Linux',
  'Git',
]

export const aboutSection = {
  label: 'About me',
  title: {
    line1: 'Crafting',
    line2: 'digital',
    line3: 'experiences',
  },
  location: 'São Paulo, Brazil',
  paragraphs: [
    'Software Engineer with a degree in Systems Analysis from FIAP, specialized in web development and backend systems.',
    'Working in the tech industry since 2021, focused on building custom software solutions and scalable applications.',
  ],
  stats: [
    { value: '4+', label: 'Years in tech', accent: true },
    { value: '10+', label: 'Projects delivered', accent: false },
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
  copyright: '© 2025',
  form: {
    name: {
      label: 'Name',
      placeholder: 'Your name',
    },
    email: {
      label: 'Email',
      placeholder: 'your@email.com',
    },
    message: {
      label: 'Message',
      placeholder: 'What can I help you with?',
    },
    submitButton: 'Send Message',
    submittingButton: 'Sending...',
    successMessage: 'Message sent successfully!',
  },
}

export const navItems = ['Home', 'Work', 'Skills', 'About', 'Contact']
