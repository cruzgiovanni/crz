"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { Button } from "@/components/ui/button"
import { Calendar, X } from "lucide-react"
import { useLanguage } from "../../languageContext"
import calendly from "../../public/calendly.svg"

interface CalendlyModalProps {
  url: string
  triggerText?: string
  triggerClassName?: string
  children?: React.ReactNode
}

export default function CalendlyModal({
  url,
  triggerText = "Agendar Conversa",
  triggerClassName = "",
  children,
}: CalendlyModalProps) {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let scrollY = 0

    function preventScroll(e: Event) {
      e.preventDefault()
    }

    if (isOpen) {
      scrollY = window.scrollY
      document.body.classList.add("calendly-blur")
      document.body.style.position = "fixed"
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.overflow = "hidden"
      document.body.style.width = "100%"

      // Bloqueia scroll do mouse e touch
      window.addEventListener("wheel", preventScroll, { passive: false })
      window.addEventListener("touchmove", preventScroll, { passive: false })
    } else {
      const y = document.body.style.top
      document.body.classList.remove("calendly-blur")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      if (y) window.scrollTo(0, -parseInt(y || "0"))

      window.removeEventListener("wheel", preventScroll)
      window.removeEventListener("touchmove", preventScroll)
    }
    return () => {
      const y = document.body.style.top
      document.body.classList.remove("calendly-blur")
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.left = ""
      document.body.style.right = ""
      document.body.style.overflow = ""
      document.body.style.width = ""
      if (y) window.scrollTo(0, -parseInt(y || "0"))

      window.removeEventListener("wheel", preventScroll)
      window.removeEventListener("touchmove", preventScroll)
    }
  }, [isOpen])

  const handleOpen = () => {
    setIsOpen(true)
    setIframeLoaded(false)
  }

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-9 sm:px-0">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-zinc-900 rounded-2xl dark:shadow shadow-2xl w-full max-w-lg h-[80dvh] flex flex-col overflow-hidden z-10">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
          <div className="flex items-center space-x-3">
            <div className="bg-white shadow-md rounded-lg">
              <Image
                src={calendly}
                alt="Calendly"
                width={30}
                height={30}
                className="w-10 h-10"
              />
            </div>
            <div>
              <h2 className="text-md font-bold text-gray-900 dark:text-white flex items-center gap-2">
                {language === "pt"
                  ? "Agende uma Conversa com Calendly ®"
                  : "Schedule a Chat with Calendly ®"}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {language === "pt"
                  ? "Escolha o melhor horário para você"
                  : "Choose the best time for you"}
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex-1 relative">
          {!iframeLoaded && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 dark:bg-zinc-900/70">
              <span className="relative flex h-10 w-10">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gray-300 dark:bg-white opacity-30 blur-[2px]"></span>
                <span className="relative inline-flex rounded-full h-10 w-10 border-4 border-transparent border-t-gray-400 dark:border-t-white animate-spin"></span>
              </span>
            </div>
          )}
          <iframe
            src={url}
            width="100%"
            height="100%"
            frameBorder="0"
            className="rounded-b-2xl w-full h-full"
            style={{ height: "100%", background: "transparent" }}
            allow="camera; microphone; fullscreen"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>
      </div>
    </div>
  )

  return (
    <>
      <Button onClick={handleOpen} className={triggerClassName}>
        <Calendar className="w-5 h-5 mr-2" />
        {triggerText}
        {children}
      </Button>
      {mounted && isOpen && createPortal(modal, document.body)}
    </>
  )
}
