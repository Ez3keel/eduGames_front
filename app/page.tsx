"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"
import GameCard from "@/components/game-card"
import SiteLogo from "@/components/site-logo"
import GameBenefits from "@/components/game-benefits"
import ThemeToggle from "@/components/theme-toggle"

export default function HomePage() {
  const schoolName = "Colégio Bom Jesus"
  const username = "Administrador"
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/login")
  }

  const games = [
    { id: 1, name: "Sinônimos", icon: "book", url: "/games/sinonimos", internal: true },
    { id: 2, name: "DonoG", icon: "brain", url: "/games/donog", internal: true },
    { id: 3, name: "Dono R_RR", icon: "puzzle", url: "/games/donor-rr", internal: true },
    { id: 4, name: "Sequência", icon: "list-ordered", url: "/games/sequencia", internal: true },
    { id: 5, name: "O Suspeito", icon: "search", url: "/games/o-suspeito", internal: true },
    { id: 6, name: "Ritmos", icon: "music", url: "/games/ritmos", internal: true },
    { id: 7, name: "Jogo da Memória", icon: "grid", url: "/games/jogo-da-memoria", internal: true },
    { id: 8, name: "Solo", icon: "mountain", url: "/games/solo", internal: true },
    { id: 9, name: "Comparando Mapas", icon: "map", url: "/games/comparando-mapas", internal: true },
    { id: 10, name: "Sirikito", icon: "zap", url: "/games/sirikito", internal: true },
    { id: 11, name: "Biosfera", icon: "leaf", url: "/games/biosfera", internal: true },
    { id: 12, name: "Corrida", icon: "flag", url: "/games/corrida", internal: true },
    { id: 13, name: "Movimento do Corpo", icon: "activity", url: "/games/movimento-do-corpo", internal: true },
    { id: 14, name: "Guerra dos Polígonos", icon: "triangle", url: "/games/guerra-dos-poligonos", internal: true },
    { id: 15, name: "Twister", icon: "move", url: "/games/twister", internal: true },
  ]

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
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary/50">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md p-4 transition-colors duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <SiteLogo />
            <span className="text-xl font-bold text-primary dark:text-primary-dark">EduGames</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm md:text-base">
              <span className="font-medium dark:text-gray-200">{username}</span>
              <span className="mx-2 text-gray-400 dark:text-gray-500">|</span>
              <span className="text-primary dark:text-primary-dark">{schoolName}</span>
            </div>
            <div className="flex gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm" asChild className="w-9 p-0 flex items-center justify-center">
                <Link href="/settings" aria-label="Configurações">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* School Name Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-dark">{schoolName}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Jogos Educacionais</p>
        </div>

        {/* Benefits Section */}
        <div className="mb-10">
          <GameBenefits />
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              icon={game.icon}
              id={game.id}
              url={game.url}
              internal={game.internal}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-secondary to-secondary/90 dark:from-gray-900 dark:to-gray-800 text-white py-8 shadow-inner mt-auto transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Games Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Sobre Nossos Jogos</h3>
              <p className="text-white/90">
                Nossa plataforma oferece jogos educacionais divertidos que desenvolvem habilidades cognitivas,
                criatividade e conhecimento em diversas áreas. Cada jogo foi cuidadosamente desenvolvido por
                especialistas em educação.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Categorias</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    Matemática
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Ciências
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Linguagem
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Geografia
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Memória e Lógica
                  </a>
                </li>
              </ul>
            </div>

            {/* Fun Facts */}
            <div>
              <h3 className="text-lg font-bold mb-4">Você Sabia?</h3>
              <div className="bg-white/20 dark:bg-white/10 p-4 rounded-lg">
                <p className="italic text-white/90">
                  "Jogos educacionais podem aumentar a retenção de conhecimento em até 90% comparado com métodos
                  tradicionais de ensino."
                </p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" aria-label="Facebook" className="text-white hover:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-facebook"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Instagram" className="text-white hover:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-instagram"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" aria-label="Twitter" className="text-white hover:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-twitter"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                  <a href="#" aria-label="YouTube" className="text-white hover:text-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-youtube"
                    >
                      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                      <path d="m10 15 5-3-5-3z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm">
            <p>© {new Date().getFullYear()} EduGames - Plataforma de Jogos Educacionais</p>
            <p className="mt-2">Aprendendo com diversão, crescendo com conhecimento!</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
