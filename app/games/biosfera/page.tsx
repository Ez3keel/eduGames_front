"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import SiteLogo from "@/components/site-logo"
import ThemeToggle from "@/components/theme-toggle"

export default function BiosferaGamePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary/50 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SiteLogo />
            <span className="text-xl font-bold text-primary dark:text-primary-dark">EduGames</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link href="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-dark">Biosfera</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Explore os diferentes ecossistemas e aprenda sobre a biodiversidade do planeta
          </p>
        </div>

        {/* Game Container */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-8 transition-colors duration-300">
            <div className="w-[1024px] h-[768px] overflow-hidden">
              <iframe
                src="https://ez3keel.github.io/Biosfera/"
                title="Biosfera"
                width="1024"
                height="768"
                className="border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="eager"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Game Instructions */}
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
          <h2 className="text-xl font-bold mb-4 text-primary dark:text-primary-dark">Como Jogar</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
            <li>Explore os diferentes biomas e ecossistemas apresentados no jogo</li>
            <li>Aprenda sobre as características de cada ambiente e sua biodiversidade</li>
            <li>Identifique as plantas e animais que habitam cada ecossistema</li>
            <li>Responda às perguntas sobre as relações ecológicas e adaptações dos seres vivos</li>
            <li>Complete os desafios para testar seu conhecimento sobre a biosfera</li>
          </ul>

          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-yellow-700 dark:text-yellow-400">Dica</h3>
            <p className="text-yellow-600 dark:text-yellow-300">
              Preste atenção às adaptações dos seres vivos em cada ambiente. Estas características são fundamentais para
              entender como as espécies sobrevivem em diferentes condições!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4 mt-8 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} EduGames - Plataforma de Jogos Educacionais
          </p>
        </div>
      </footer>
    </div>
  )
}
