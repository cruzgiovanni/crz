import { Icons } from "@/components/icons"
import { HomeIcon } from "lucide-react"

export const DATA = {
  en: {
    languageVersion: "en",
    location: "Brazil",
    welcome: "Welcome to",
    description: "Here, we transform ideas into personalized web solutions.",

    sections: [
      "About",
      "Some of our partners",
      {
        section: "skills",
        text: "At CRZ, we use the most advanced technologies to deliver innovation, efficiency, and exceptional results.",
      },
      {
        section: "Projects",
        tittle: "Check out our latest projects",
        text: "From simple solutions to sophisticated web systems, we create digital experiences that meet each client's needs, always with quality and innovation.",
      },
      {
        section: "Developer",
        text: "About the developer",
      },
      {
        section: "Contact",
        tittle: "Let's talk?",
        text_1:
          "Whether you're a recruiter looking for talent or a client seeking innovative digital solutions, I'd love to hear from you! Reach out to me on",
        text_2: "or on",
        text_3:
          "and I'll respond quickly. Let's discuss opportunities and build something amazing together!",
        text_4:
          "Or schedule a meeting directly below to discuss your project or opportunity:",
      },
    ],

    summary:
      "We create custom websites and software to help businesses grow. We combine modern technology and functional design to deliver impressive results. Let's make digital your company's greatest ally?",
    avatarUrl: "/crz-light.avif",
    avatarUrlDark: "/crz.avif",

    work: [
      {
        company: "Piva Insurances",
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
        company: "Mikonos Store",
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
        company: "Facchini Lawers",
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
        title: "Livro SaaS",
        href: "https://github.com/euCRUZ/livroSaas",
        dates: "02/2025",
        active: true,
        description:
          "SaaS system with authentication (NextAuth), Prisma DB, and Stripe subscriptions. Only logged-in users with active plans can access protected routes.",
        technologies: [
          "Typescript",
          "Prisma ORM",
          "NeonDB",
          "TailwindCSS",
          "Shadcn UI",
          "React",
          "Next.js",
          "NextAuth",
          "Stripe",
        ],
        links: [
          {
            type: "GitHub",
            href: "https://github.com/euCRUZ/livroSaas",
            icon: <Icons.github className="size-3" />,
          },
          {
            type: "Website",
            href: "https://livro-saas.vercel.app/",
            icon: <Icons.globe className="size-3" />,
          },
        ],
        image: "/livrosaas.avif",
        video: "",
      },
      {
        title: "FSW Delivery",
        href: "https://github.com/euCRUZ/fsw-delivery",
        dates: "02/2025",
        active: true,
        description:
          "Delivery system where users select products, add to cart, and track order status in real time.",
        technologies: [
          "Typescript",
          "Prisma ORM",
          "NeonDB",
          "TailwindCSS",
          "Shadcn UI",
          "React",
          "Next.js",
          "Stripe",
        ],
        links: [
          {
            type: "GitHub",
            href: "https://github.com/euCRUZ/fsw-delivery",
            icon: <Icons.github className="size-3" />,
          },
          {
            type: "Website",
            href: "https://fsw-delivery.vercel.app",
            icon: <Icons.globe className="size-3" />,
          },
        ],
        image: "/fsw.svg",
        video: "",
      },
      {
        title: "Piva Insurances",
        href: "https://github.com/emiliobiasi/pivaseguros",
        dates: "11/2024",
        active: true,
        description:
          "Development of a complete platform where clients register data for desired insurance, and through private management, the company can view and manage their clients' insurance, analyzing graphs and generating reports.",
        technologies: [
          "Typescript",
          "Pocketbase",
          "TailwindCSS",
          "Shadcn UI",
          "React",
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
        image: "/pivascreen.avif",
        video: "",
      },
      {
        title: "Facchinni Lawers",
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
        image: "/advscreen.avif",
        video: "",
      },
    ],

    developer: [
      {
        title: "Giovanni Cruz",
        dates: "",
        location: "São Paulo, Brazil",
        description:
          "Founder of CRZ, graduated in Systems Analysis and Development from FIAP, specialized in web development, social media, paid traffic, and design. Active in the technology market since 2021, focusing on website and software development.",
        image: "/me.avif",
      },
    ],

    reviews: [
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Made with ❤️ and faith.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
    ],
  },
  pt: {
    languageVersion: "pt",
    location: "Brasil",
    welcome: "Bem-vindo à",
    description: "Aqui, transformamos ideias em soluções web personalizadas.",

    sections: [
      "Sobre",
      "Alguns de nossos parceiros",
      {
        section: "habilidades",
        text: "Na CRZ, usamos as tecnologias mais avançadas para entregar inovação, eficiência e resultados excepcionais.",
      },
      {
        section: "Projetos",
        tittle: "Confira nossos últimos projetos",
        text: "De soluções simples a sistemas web sofisticados, criamos experiências digitais que atendem às necessidades de cada cliente, sempre com qualidade e inovação.",
      },
      {
        section: "Desenvolvedor",
        text: "Sobre o desenvolvedor",
      },
      {
        section: "Contato",
        tittle: "Vamos conversar?",
        text_1:
          "Seja você um recrutador em busca de talentos ou um cliente procurando soluções digitais inovadoras, adoraria ouvir de você! Entre em contato comigo pelo",
        text_2: "ou no",
        text_3:
          "e responderei rapidamente. Vamos discutir oportunidades e construir algo incrível juntos!",
        text_4:
          "Ou agende uma reunião diretamente abaixo para discutir seu projeto ou oportunidade:",
      },
    ],

    summary:
      "Criamos sites e softwares personalizados para ajudar empresas a crescerem. Combinamos tecnologia moderna e design funcional para entregar resultados impressionantes. Vamos fazer do digital o maior aliado da sua empresa?",
    avatarUrl: "/crz-light.avif",
    avatarUrlDark: "/crz.avif",

    work: [
      {
        company: "Piva Seguros",
        href: "https://atomic.finance",
        badges: [],
        location: "Remoto",
        title: "Corretor de Seguros",
        logoUrl: "/piva.png",
        start: "",
        end: "",
        description:
          'Criação de software de gerenciamento e registro de seguros. "A mudança para o software CRZ melhorou nossa produtividade, agilidade e usabilidade em 100% em comparação com o sistema antigo que usávamos." - Marcel Andréa, Co-proprietário da Piva Seguros.',
      },
      {
        company: "Loja Mikonos",
        href: "",
        badges: [],
        location: "Remoto",
        title: "E-commerce de Roupas",
        logoUrl: "/mikonos.jpg",
        start: "",
        end: "",
        description:
          "Redesign do site, tornando sua aparência mais atraente e moderna.",
      },
      {
        company: "Facchini Advogados",
        href: "",
        badges: [],
        location: "Remoto",
        title: "Escritório de Advocacia",
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
        degree: "Análise e Desenvolvimento de Sistemas",
        logoUrl: "/fiap.jpg",
        start: "2023",
        end: "2025",
      },
    ],

    projects: [
      {
        title: "Livro SaaS",
        href: "https://github.com/euCRUZ/livroSaas",
        dates: "02/2025",
        active: true,
        description:
          "Sistema SaaS com autenticação via NextAuth, banco de dados com Prisma e pagamentos recorrentes usando Stripe. Apenas usuários logados e assinantes ativos têm acesso às rotas protegidas (Assinaturas fictícias para testes).",
        technologies: [
          "Typescript",
          "Prisma ORM",
          "NeonDB",
          "TailwindCSS",
          "Shadcn UI",
          "React",
          "Next.js",
          "NextAuth",
          "Stripe",
        ],
        links: [
          {
            type: "GitHub",
            href: "https://github.com/euCRUZ/livroSaas",
            icon: <Icons.github className="size-3" />,
          },
          {
            type: "Website",
            href: "https://livro-saas.vercel.app/",
            icon: <Icons.globe className="size-3" />,
          },
        ],
        image: "/livrosaas.avif",
        video: "",
      },
      {
        title: "FSW Delivery",
        href: "https://github.com/euCRUZ/fsw-delivery",
        dates: "02/2025",
        active: true,
        description:
          "Sistema de delivery onde o usuário escolhe produtos, adiciona à sacola e acompanha o status do pedido em tempo real.",
        technologies: [
          "Typescript",
          "Prisma ORM",
          "NeonDB",
          "TailwindCSS",
          "Shadcn UI",
          "React",
          "Next.js",
          "Stripe",
        ],
        links: [
          {
            type: "GitHub",
            href: "https://github.com/euCRUZ/fsw-delivery",
            icon: <Icons.github className="size-3" />,
          },
          {
            type: "Website",
            href: "https://fsw-delivery.vercel.app",
            icon: <Icons.globe className="size-3" />,
          },
        ],
        image: "/fsw.svg",
        video: "",
      },
      {
        title: "Piva Seguros",
        href: "https://github.com/emiliobiasi/pivaseguros",
        dates: "11/2024",
        active: true,
        description:
          "Desenvolvimento de uma plataforma completa onde os clientes cadastram dados para o seguro desejado e, por meio de um gerenciamento privado, a empresa pode visualizar e administrar os seguros de seus clientes, analisando gráficos e gerando relatórios.",
        technologies: [
          "Typescript",
          "Pocketbase",
          "TailwindCSS",
          "Shadcn UI",
          "React",
        ],
        links: [
          {
            type: "GitHub",
            href: "https://github.com/emiliobiasi/pivaseguros",
            icon: <Icons.github className="size-3" />,
          },
        ],
        image: "/pivascreen.avif",
        video: "",
      },

      {
        title: "Facchini Advogados",
        href: "https://facchiniadvogados.com.br/",
        dates: "02/2024",
        active: true,
        description:
          "Desenvolvimento de uma landing page moderna e responsiva para o escritório de advocacia Facchini Advogados.",
        technologies: ["HTML", "CSS", "JavaScript", "SEO"],
        links: [
          {
            type: "Website",
            href: "https://facchiniadvogados.com.br/",
            icon: <Icons.globe className="size-3" />,
          },
        ],
        image: "/advscreen.avif",
        video: "",
      },
    ],

    developer: [
      {
        title: "Giovanni Cruz",
        dates: "",
        location: "São Paulo, Brasil",
        description:
          "Fundador da CRZ, formado em Análise e Desenvolvimento de Sistemas pela FIAP, especializado em desenvolvimento web, redes sociais, tráfego pago e design. Atua no mercado de tecnologia desde 2021, com foco em desenvolvimento de sites e softwares.",
        image: "/me.avif",
      },
    ],

    reviews: [
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
      {
        name: "CRZ",
        username: "@crz.web",
        body: `@ ${new Date().getFullYear()} - Feito com ❤️ e fé.`,
        img: "https://crzweb.vercel.app/crz.avif",
      },
    ],
  },

  name: "CRZ",
  initials: "CRZ",
  url: "https://crzweb.vercel.app/",

  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    // { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],

  flagIcons: [
    {
      usa: "/usa-flag.svg",
      br: "/brazil-flag.svg",
    },
  ],

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
} as const
