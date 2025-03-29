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
  const [language, setLanguage] = useState<"en" | "pt">(() => {
    const browserLanguage = navigator.language.split("-")[0]
    return browserLanguage === "pt" || browserLanguage === "en"
      ? (browserLanguage as "pt" | "en")
      : "en"
  })

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt" : "en"))
  }

  useEffect(() => {}, [language])

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used in LanguageProvider")
  }
  return context
}
