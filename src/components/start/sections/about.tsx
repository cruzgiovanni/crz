'use client'

import Image from 'next/image'
import { aboutContent } from '@/data/lp-info'

const { sectionLabel, title, description, stats } = aboutContent

export function About() {
  return (
    <section
      id="about"
      className="text-muted-foreground relative bg-background py-12 md:py-20 tracking-tight "
    >
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-6">
          <span className="text-[1.5rem] text-[#757575]">{sectionLabel}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - Avatar */}
          <div>
            <div className="relative aspect-square max-w-xs">
              <Image
                src="me.jpeg"
                alt="Giovanni Cruz"
                width={300}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="flex flex-col justify-center tracking-tight">
            <h2 className="font-sans font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight leading-[0.98]">
              {title.line1}
              <br />
              <span className="">{title.line2}</span>
            </h2>

            <div className="mt-6 space-y-3 text-xs md:text-sm max-w-lg">
              {description.map((paragraph, index) => (
                <p
                  className="text-[0.9rem] md:text-xl tracking-tight"
                  key={index}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-10 pt-6 border-t border-border grid grid-cols-3 gap-6 tracking-tight">
              {stats.map((stat, index) => (
                <div key={index}>
                  <span className="font-sans font-bold text-2xl md:text-3xl ">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-[0.625rem]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
