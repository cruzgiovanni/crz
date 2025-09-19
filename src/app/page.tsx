"use client"

import Navbar from "@/components/navbar"
import { DATA } from "@/data/resume"
import { HackathonCard } from "@/components/hackathon-card"
import BlurFade from "@/components/magicui/blur-fade"
import BlurFadeText from "@/components/magicui/blur-fade-text"
import { ProjectCard } from "@/components/project-card"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Markdown from "react-markdown"
import IconCloud from "@/components/ui/icon-cloud"
import { MarqueeDemo } from "@/components/marquee-demo"
import { useTheme } from "next-themes"
import { useState } from "react"
import { useLanguage } from "../../languageContext"
import CalendlyModal from "@/components/calendly-modal"
import { BorderBeam } from "@/components/magicui/border-beam"
import { ResumeCard } from "@/components/resume-card"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
// import { useEffect } from "react"
// import Lenis from "lenis"

const BLUR_FADE_DELAY = 0.04

export default function Page() {
  const { theme } = useTheme()
  const [copiedEmail, setCopiedEmail] = useState(false)

  const { language } = useLanguage()
  const currentData = DATA[language]

  // useEffect(() => {
  //   const lenis = new Lenis()

  //   function raf(time: any) {
  //     lenis.raf(time)
  //     requestAnimationFrame(raf)
  //   }

  //   requestAnimationFrame(raf)
  // }, [])

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Navbar />

      {/* Hero Section */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`${currentData.welcome} ${DATA.name.split(" ")[0]} 👋`}
              />

              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={currentData.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                {theme === "light" ? (
                  <AvatarImage
                    alt={DATA.name}
                    src={currentData.avatarUrl}
                    title={DATA.name}
                  />
                ) : (
                  <AvatarImage
                    alt={DATA.name}
                    src={currentData.avatarUrlDark}
                    title={DATA.name}
                  />
                )}
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">{currentData.sections[0]}</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {currentData.summary}
          </Markdown>
        </BlurFade>
      </section>

      {/* Partners Feedbacks */}
      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">
              {language === "pt"
                ? "Alguns de nossos parceiros que confiam em nós"
                : "Some of our partners that trust us"}
            </h2>{" "}
          </BlurFade>
          {currentData.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                // logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}

      {/* Skills Section */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">
              {currentData.sections[2].text}
            </h2>
          </BlurFade>

          <div className="relative pb-8">
            <IconCloud
              iconSlugs={DATA.skills_cloud.map((skill: string) =>
                skill.toLowerCase()
              )}
            />
          </div>

          <div className="flex flex-wrap gap-1 justify-center">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {currentData.sections[3].section}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {currentData.sections[3].tittle}
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {currentData.sections[3].text}
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {currentData.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                  hideImage
                  icon={(() => {
                    // Prefer explicit domain icon if provided
                    const type = (project as any).iconType as
                      | "health"
                      | "book"
                      | "delivery"
                      | "shield"
                      | "store"
                      | undefined
                    if (type && Icons[type])
                      return Icons[type]({ className: "size-10" })

                    // Fallback: infer by title/description keywords
                    const title = project.title.toLowerCase()
                    const desc = (project.description || "").toLowerCase()
                    if (title.includes("card") || desc.includes("health"))
                      return <Icons.health className="size-10" />
                    if (title.includes("book") || desc.includes("book"))
                      return <Icons.book className="size-10" />
                    if (title.includes("delivery") || desc.includes("delivery"))
                      return <Icons.delivery className="size-10" />
                    if (
                      title.includes("seguro") ||
                      title.includes("insurance") ||
                      desc.includes("insurance")
                    )
                      return <Icons.shield className="size-10" />

                    // Last resort: tech-based
                    const tech = (project.technologies || []).map((t) =>
                      t.toLowerCase()
                    )
                    if (tech.some((t) => t.includes("next")))
                      return <Icons.nextjs className="size-10" />
                    if (tech.some((t) => t.includes("react")))
                      return <Icons.react className="size-10" />
                    if (
                      tech.some(
                        (t) => t.includes("typescript") || t.includes("ts")
                      )
                    )
                      return <Icons.typescript className="size-10" />
                    if (tech.some((t) => t.includes("tailwind")))
                      return <Icons.tailwindcss className="size-10" />
                    if (tech.some((t) => t.includes("framer")))
                      return <Icons.framermotion className="size-10" />
                    return <Icons.globe className="size-10" />
                  })()}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      <section id="developer">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  {currentData.sections[4].section}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {currentData.sections[4].text}
                </h2>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4">
              {" "}
              {currentData.developer.map((dev, id) => (
                <BlurFade
                  key={dev.title + dev.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={dev.title}
                    description={dev.description}
                    location={dev.location}
                    dates={dev.dates}
                    image={dev.image}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{ marginTop: "-20px" }}>
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                {currentData.sections[5].section}
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl pb-2">
                {currentData.sections[5].tittle}
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground text-xs flex items-center justify-center gap-2">
                {language === "pt"
                  ? "Também disponível via "
                  : "Also available via "}
                <Link
                  href={DATA.contact.social.InstagramDM.url}
                  className="underline hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>
                {" · "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="underline hover:text-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
                {" · "}
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="underline hover:text-foreground"
                >
                  Email
                </a>
                <span className="text-muted-foreground">·</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7"
                        aria-label={
                          language === "pt" ? "Copiar email" : "Copy email"
                        }
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              DATA.contact.email
                            )
                            setCopiedEmail(true)
                            setTimeout(() => setCopiedEmail(false), 1500)
                          } catch (e) {
                            // no-op fallback
                          }
                        }}
                      >
                        {copiedEmail ? (
                          // Check icon via unicode to avoid adding new icon
                          <span className="text-green-500" aria-hidden>
                            ✓
                          </span>
                        ) : (
                          // Clipboard icon look using simple SVG
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {copiedEmail
                        ? language === "pt"
                          ? "Copiado"
                          : "Copied"
                        : language === "pt"
                        ? "Copiar email"
                        : "Copy email"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </p>
            </div>
          </BlurFade>

          {/* Calendly Widget */}
          <BlurFade delay={BLUR_FADE_DELAY * 17}>
            <div className="flex justify-center mt-8">
              <CalendlyModal
                url={language === "pt" ? DATA.calendly.pt : DATA.calendly.en}
                triggerText={
                  language === "pt"
                    ? "Marcar uma conversa"
                    : "Schedule a meeting"
                }
                triggerClassName="relative overflow-hidden bg-background text-foreground border border-neutral-800 hover:border-zinc-700 hover:bg-accent hover:text-accent-foreground font-medium px-5 py-2 rounded-md text-sm transition-all duration-300"
              >
                <BorderBeam
                  size={60}
                  initialOffset={0}
                  duration={2}
                  colorFrom="#fbbf24"
                  colorTo="#f59e0b"
                  borderWidth={2}
                  className="from-yellow-400 via-yellow-500 to-orange-500 z-0"
                  transition={{
                    type: "spring",
                    stiffness: 40,
                    damping: 10,
                  }}
                />
              </CalendlyModal>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="footer" style={{ marginTop: "-10px" }}>
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <MarqueeDemo />
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 19}>
          <div className="flex flex-col items-center justify-center space-y-2 py-8">
            <p className="text-sm text-muted-foreground italic">
              Ad Majorem Dei Gloriam
            </p>
          </div>
        </BlurFade>
      </section>
    </main>
  )
}
