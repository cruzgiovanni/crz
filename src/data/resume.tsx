import { Icons } from "@/components/icons"
import { HomeIcon } from "lucide-react"

export const DATA = {
  name: "CRZ",
  initials: "CRZ",
  url: "https://crzweb.vercel.app/",
  location: "Brazil",
  description: "Here, we transform ideas into personalized web solutions.",
  summary:
    "At CRZ, we create custom websites and software to help businesses grow. We combine modern technology and functional design to deliver impressive results. Let's make digital your company's greatest ally?",
  avatarUrl: "/crz-light.png",
  avatarUrlDark: "/crz.png",

  skills: [
    "Next.js",
    "Typescript",
    "Node.Js",
    "Pocketbase",
    "Prisma",
    "MongoDB",
    "Firebase",
  ],

  skills_cloud: [
    "React",
    "nextdotjs",
    "typescript",
    "nodedotjs",
    "Pocketbase",
    "Pockethost",
    "python",
    "Java",
    "JavaScript",
    "git",
    "github",
    "figma",
    "visualstudiocode",
    "vscode",
    "html5",
    "css3",
    "tailwindcss",
    "vercel",
    "bootstrap",
    "mongodb",
    "postgresql",
    "mysql",
    "sqlite",
    "firebase",
    "aws",
    "oracle",
    "prisma",
    "firebase",
    "supabase",
  ],

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  contact: {
    email: "",
    social: {
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/crz.web",
        icon: Icons.instagram,
        navbar: true,
      },
      InstagramDM: {
        name: "Instagram",
        url: "https://www.instagram.com/direct/t/17842722137904976",
        icon: Icons.instagram,
        navbar: false,
      },
      WhatsApp: {
        name: "Whatsapp",
        url: "https://wa.me/",
        icon: Icons.phone,
        navbar: false,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/eugiovannicruz/",
        icon: Icons.linkedin,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/euCRUZ",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "",
        icon: Icons.email,
        navbar: false,
      },
    },
  },

  work: [
    {
      company: "Piva Seguros",
      href: "https://atomic.finance",
      badges: [],
      location: "Remote",
      title: "Insurance Broker",
      logoUrl: "/piva.png",
      start: "",
      end: "",
      description:
        'Creation of insurance management and registration software. "The switch to CRZ software improved our productivity, agility, and usability by 100% compared to the old system we used." - Marcel Andréa, Co-owner of Piva Seguros.',
    },
    {
      company: "Loja Mikonos",
      href: "",
      badges: [],
      location: "Remote",
      title: "Clothing E-commerce",
      logoUrl: "/mikonos.jpg",
      start: "",
      end: "",
      description:
        "Website redesign, making its look more attractive and modern.",
    },
    {
      company: "Facchini Advogados",
      href: "",
      badges: [],
      location: "Remote",
      title: "Law Firm",
      logoUrl: "/facchini.svg",
      start: "",
      end: "",
      description:
        "Creation of the company's website, focusing on SEO and mobile optimization.",
    },
  ],

  education: [
    {
      school: "FIAP",
      href: "https://www.fiap.com.br/",
      degree: "Bachelor's Degree of Computer Science",
      logoUrl: "/fiap.jpg",
      start: "2023",
      end: "2025",
    },
  ],

  projects: [
    {
      title: "Piva Seguros",
      href: "https://github.com/emiliobiasi/pivaseguros",
      dates: "11/2024",
      active: true,
      description:
        "Development of a complete platform where clients register data for desired insurance, and through private management, the company can view and manage their clients' insurance, analyzing graphs and generating reports.",
      technologies: [
        // "Next.js",
        "Typescript",
        "Pocketbase",
        // "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        // "Magic UI",
        "React",
        // "Cloudflare Workers",
      ],
      links: [
        {
          type: "GitHub",
          href: "https://github.com/emiliobiasi/pivaseguros",
          icon: <Icons.github className="size-3" />,
        },
        // {
        //   type: "Source",
        //   href: "https://github.com/dillionverma/llm.report",
        //   icon: <Icons.github className="size-3" />,
        // },
      ],
      image: "/pivascreen.png",
      video: "",
    },
    {
      title: "Facchinni Advogados",
      href: "https://facchiniadvogados.com.br/",
      dates: "02/2024",
      active: true,
      description:
        "Development of a modern and responsive landing page for the law firm Facchini Advogados.",
      technologies: ["HTML", "CSS", "JavaScript", "SEO"],
      links: [
        {
          type: "Website",
          href: "https://facchiniadvogados.com.br/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/advscreen.png",
      video: "",
    },
  ],

  developer: [
    {
      title: "Giovanni Cruz",
      dates: "",
      location: "São Paulo, Brazil",
      description:
        "Co-founder of CRZ, specialized in web development, social media, paid traffic, and design. Active in the technology market since 2021, focusing on website and software development.",
      image: "/me.jpeg",
    },
  ],

  reviews: [
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
      img: "https://crzweb.vercel.app/crz.png",
    },
  ],
} as const
