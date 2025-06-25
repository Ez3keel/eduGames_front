"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Inicializa o tema com base na preferência salva ou preferência do sistema
  useEffect(() => {
    // Verifica se há uma preferência salva no localStorage
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    } else if (savedTheme === "light") {
      setIsDarkMode(false)
      document.documentElement.classList.remove("dark")
    } else {
      // Se não houver preferência salva, verifica a preferência do sistema
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setIsDarkMode(prefersDark)
      if (prefersDark) {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)

    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border border-input bg-background p-0 flex items-center justify-center overflow-hidden"
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
    >
      <span className="sr-only">{isDarkMode ? "Modo claro" : "Modo escuro"}</span>

      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 0 : 180 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {isDarkMode ? <Moon className="h-4 w-4 text-yellow-300" /> : <Sun className="h-4 w-4 text-yellow-500" />}
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDarkMode ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}
