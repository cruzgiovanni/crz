"use client"

import { cn } from "@/lib/utils"
import Marquee from "@/components/ui/marquee"
import { DATA } from "@/data/resume"

const firstRow = DATA.reviews.slice(0, DATA.reviews.length / 2)
const secondRow = DATA.reviews.slice(DATA.reviews.length / 2)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.08] dark:bg-gray-50/[.01] dark:hover:bg-gray-50/[.15]",
        // mobile styles
        "mobile:opacity-0 mobile:transition-opacity mobile:duration-500 mobile:ease-in-out mobile:transform mobile:translate-y-4"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function MarqueeDemo() {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden md:shadow-xl mb-12 md:mb-4">
      <Marquee pauseOnHover className="[--duration:18s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:18s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile\\:opacity-0 {
            opacity: 0;
          }
          .mobile\\:transition-opacity {
            transition: opacity 0.5s ease-in-out;
          }
          .mobile\\:duration-500 {
            transition-duration: 500ms;
          }
          .mobile\\:ease-in-out {
            transition-timing-function: ease-in-out;
          }
          .mobile\\:transform {
            transform: translateY(4px);
          }
        }
      `}</style>
    </div>
  )
}
