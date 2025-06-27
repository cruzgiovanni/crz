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
import { useLanguage } from "../../languageContext"

const BLUR_FADE_DELAY = 0.04

export default function Page() {
  const { theme } = useTheme()

  const { language } = useLanguage()
  const currentData = DATA[language]

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <Navbar />

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

          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

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
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {currentData.sections[5].text_1}{" "}
                <Link
                  href={DATA.contact.social.InstagramDM.url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </Link>{" "}
                {currentData.sections[5].text_2}{" "}
                <Link
                  href={DATA.contact.social.LinkedIn.url}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </Link>
                {""}, {currentData.sections[5].text_3}
              </p>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="footer" style={{ marginTop: "-10px" }}>
        <MarqueeDemo />
      </section>
    </main>
  )
}
