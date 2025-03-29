"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"

type LanguageContextType = {
  language: "en" | "pt"
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<"en" | "pt">("en")

  useEffect(() => {
    if (typeof window !== "undefined") {
      const browserLanguage = navigator.language.split("-")[0]
      if (browserLanguage !== "pt" && browserLanguage !== "en") {
        console.warn(`Idioma desconhecido por CRZ: ${browserLanguage}`)
      }
      setLanguage(
        browserLanguage === "pt" || browserLanguage === "en"
          ? (browserLanguage as "pt" | "en")
          : "en"
      )
    }
  }, [])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"))
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage deve ser usado dentro de LanguageProvider")
  }
  return context
}
