import Image from 'next/image'
import { aboutContent } from '@/data/lp-info'

const { sectionLabel, title, description, stats } = aboutContent

export function About() {
  return (
    <section
      id="about"
      className="text-muted-foreground relative bg-background py-12 md:py-20 tracking-tight"
    >
      <div className="px-2 md:px-4">
        {/* Section label */}
        <div className="mb-6">
          <span className="text-[1.5rem] text-[#757575] tracking-tight ml-[15vw]">{sectionLabel}</span>
        </div>

        {/* Desktop layout: text left (wide) + image right */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_340px] lg:gap-12 xl:gap-20">
          {/* Left - Content */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-sans font-bold text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-[0.98]">
                {title.line1}
                <br />
                {title.line2}
              </h2>

              <div className="mt-8 space-y-4">
                {description.map((paragraph, index) => (
                  <p
                    className="text-[0.9rem] lg:text-lg xl:text-xl tracking-tight"
                    key={index}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-border grid grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index}>
                  <span className="font-sans font-bold text-2xl lg:text-3xl tracking-tight">
                    {stat.value}
                  </span>
                  <p className="mt-1 text-[0.625rem] lg:text-xs text-[#757575]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="border border-border p-3">
            <Image
              src="/me.jpeg"
              alt="Giovanni Cruz"
              width={340}
              height={460}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Mobile / Tablet layout */}
        <div className="lg:hidden">
          <div className="border border-border p-2 w-fit">
            <Image
              src="/me.jpeg"
              alt="Giovanni Cruz"
              width={300}
              height={300}
              className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-cover"
            />
          </div>

          <h2 className="mt-8 font-sans font-bold text-3xl md:text-4xl tracking-tight leading-[0.98]">
            {title.line1}
            <br />
            {title.line2}
          </h2>

          <div className="mt-6 space-y-3">
            {description.map((paragraph, index) => (
              <p
                className="text-[0.9rem] md:text-xl tracking-tight"
                key={index}
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-6 border-t border-border grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index}>
                <span className="font-sans font-bold text-2xl md:text-3xl">
                  {stat.value}
                </span>
                <p className="mt-1 text-[0.625rem]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
