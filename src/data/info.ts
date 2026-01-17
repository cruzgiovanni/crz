import { siteConfig } from "./config"

export const hero = {
  badge: "Software Engineer",
  name: "Giovanni Cruz",
  description:
    "I turn mass of JSON into systems that scale, and mass of chaos into clean APIs. Backend-focused, full-stack capable.",
  cta: {
    keyword: "await",
    object: "portfolio",
    method: "explore",
  },
  scrollHint: "Scroll to explore",
  graphite: {
    crossedOutWord: "Googling",
    graphitedWord: "Engineering",
    continuationText: "solutions",
  },
}

export const projectsSection = {
  title: "Work",
  subtitle: "/ Professional experience and selected projects",
}

export const projects = [
  {
    number: "01",
    title: "Piva Insurances",
    category: "Insurance Management Platform",
    year: "11/2024 - 12/2025",
    tech: "React • Pocketbase • Shadcn UI",
    direction: "left" as const,
    repo: "https://github.com/emiliobiasi/pivaseguros",
    type: "experience" as const,
  },
  {
    number: "02",
    title: "Solution Card",
    category: "Digital Health Platform",
    year: "07/2025",
    tech: "Next.js • Tailwind CSS • Framer Motion",
    direction: "right" as const,
    demo: "https://solucaocard.com.br/",
    type: "project" as const,
  },
  {
    number: "03",
    title: "Book SaaS",
    category: "SaaS with Auth & Subscriptions",
    year: "02/2025",
    tech: "Next.js • Prisma • Stripe • NextAuth",
    direction: "left" as const,
    repo: "https://github.com/cruzgiovanni/livroSaas",
    type: "project" as const,
  },
  {
    number: "04",
    title: "Delivery FSW",
    category: "Real-time Delivery System",
    year: "02/2025",
    tech: "Next.js • Prisma • NeonDB • Stripe",
    direction: "right" as const,
    repo: "https://github.com/cruzgiovanni/fsw-delivery",
    type: "project" as const,
  },
]

export const skillsSection = {
  title: "Core Skills",
  subtitle: "/ Technologies I work with",
}

export const skillCategories = [
  {
    title: "Backend",
    description:
      "TypeScript, Bun, Node.js, ORMs, PostgreSQL, MongoDB, BaaS Platforms",
    direction: "top" as const,
  },
  {
    title: "Frontend",
    description: "React, Next.js, Tailwind CSS",
    direction: "right" as const,
  },
  {
    title: "Blockchain",
    description: "Solidity, Hardhat, Ethereum",
    direction: "left" as const,
  },
  {
    title: "DevOps",
    description: "Docker, Github Actions, AWS, Linux",
    direction: "bottom" as const,
  },
]

export const techTags = [
  "TypeScript",
  "Bun",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Prisma",
  "Drizzle",
  "Supabase",
  "Firebase",
  "Express.js",
  "ElysiaJS",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Solidity",
  "Hardhat",
  "Ethereum",
  "Docker",
  "AWS",
  "Linux",
  "Git",
]

export const aboutSection = {
  label: "About me",
  title: {
    line1: "Architecting",
    line2: "robust",
    line3: "solutions",
  },
  paragraphs: [
    "Software Engineer with a degree in Analysis and Systems Development from FIAP. I bring experience solving real problems through technology. Not just shipping code, but addressing pain points and delivering measurable results.",
    "I code on faith and old blues from the 70s.",
  ],
  stats: [
    { value: "3+", label: "Years in tech", accent: true },
    { value: "Curious", label: "by nature", accent: false },
  ],
}

export const contactSection = {
  title: "Let's talk",
  subtitle: "/ Get in touch",
  email: {
    label: "Email",
    value: siteConfig.email,
  },
  location: {
    label: "Location",
    value: siteConfig.location,
  },
  socials: ["LinkedIn", "GitHub"],
  copyright: "© 2025",
  form: {
    name: {
      label: "Name",
      placeholder: "Your name",
    },
    email: {
      label: "Email",
      placeholder: "your@email.com",
    },
    message: {
      label: "Message",
      placeholder: "What can I help you with?",
    },
    submitButton: "Send Message",
    submittingButton: "Sending...",
    successMessage: "Message sent successfully!",
  },
}

export const navItems = ["Home", "Work", "Skills", "About", "Contact"]
