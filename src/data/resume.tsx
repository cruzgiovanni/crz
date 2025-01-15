import { Icons } from "@/components/icons"
import { HomeIcon } from "lucide-react"

export const DATA = {
  name: "CRZ",
  initials: "CRZ",
  url: "https://crzweb.vercel.app/",
  location: "Brasil",
  description: "Aqui, transformamos ideias em soluções web personalizadas.",
  summary:
    "Na CRZ, criamos sites e softwares sob medida para ajudar negócios a crescer. Combinamos tecnologia moderna e design funcional para entregar resultados que impressionam. Vamos transformar o digital no maior aliado da sua empresa?",
  avatarUrl: "/crz.png",

  skills: [
    "Typescript",
    "Node.Js",
    "React",
    "Next.js",
    "Pocketbase",
    "Pockethost",
    "JavaScript",
    "Python",
    "Java",
    "MongoDB",
    "SQL",
  ],

  skills_cloud: [
    "React",
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
      title: "Corretora de seguros",
      logoUrl: "/piva.png",
      start: "",
      end: "",
      description:
        'Criação de um software de gestão e cadastro de seguros. "A mudança para o software da CRZ melhorou em 100% a nossa produtividade, agilidade e usabilidade em relação ao sistema antigo que usavamos." - Marcel Andréa, Sócio Proprietário da Piva Seguros.',
    },
    {
      company: "Loja Mikonos",
      href: "",
      badges: [],
      location: "Remote",
      title: "E-commerce de roupas",
      logoUrl: "/mikonos.jpg",
      start: "",
      end: "",
      description:
        "Remodelação do site, deixando seu visual mais atrativo e moderno.",
    },
    {
      company: "Facchini Advogados",
      href: "",
      badges: [],
      location: "Remote",
      title: "Escritório de advocacia",
      logoUrl: "/facchini.svg",
      start: "",
      end: "",
      description:
        "Criação do site da empresa, com foco em SEO e otimização para dispositivos móveis.",
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
      title: "Piva Orçamentos",
      href: "https://pivasolucoes.com.br/formulario",
      dates: "11/2024",
      active: true,
      description:
        "Desenvolvimento de uma plataforma completa, no qual os clientes cadastram os dados para os seguros desejados, e, através de um gerenciamento privativo, a empresa consegue visualizar e gerenciar os seguros de seus clientes, analisando gráficos e gerando relatórios.",
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
          type: "Website",
          href: "https://pivasolucoes.com.br/formulario",
          icon: <Icons.globe className="size-3" />,
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
        "Desenvolvimento de uma landig page moderna e responsiva para o escritório de advocacia Facchini Advogados.",
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
      location: "São Paulo, Brasil",
      description:
        "Co-founder da CRZ, especializado em desenvolvimento web, mídias sociais, tráfego pago e design. Atua no mercado de tecnologia desde 2021, com foco em desenvolvimento de sites e softwares.",
      image: "/me.jpeg",
    },
  ],

  reviews: [
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
    {
      name: "CRZ",
      username: "@crz.web",
      body: "@ 2025 - Feito com ❤️ e fé.",
      img: "https://crzweb.vercel.app/crz.png",
    },
  ],
  
} as const
