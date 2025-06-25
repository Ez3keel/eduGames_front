"use client"

import type React from "react"

import api from '../services/api'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Moon, Sun, User, Lock, Eye, EyeOff } from "lucide-react"
import SiteLogo from "@/components/site-logo"
import { motion } from "framer-motion"
import Link from "next/link"

interface UserData {
  name: string
  username: string
  email: string
  password: string
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ x: number; y: number; size: number; color: string; speed: number }>
  >([])
  const router = useRouter()

  useEffect(() => {
    // Verificar preferência de tema
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }

    // Gerar partículas aleatórias para o fundo
    const generateParticles = () => {
      const colors = ["#86BB79", "#1E3319", "#FF9966"]
      const newParticles = []

      for (let i = 0; i < 50; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 10 + 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 0.5 + 0.1,
        })
      }

      setParticles(newParticles)
    }

    generateParticles()
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

  async function handleSubmit(e: React.FormEvent){
    
    e.preventDefault()
  setIsLoading(true)
  setError("")

  try {
    const response = await api.post("/login", {
      email,
      password
    })

    const token = response.data

    // Salva o token no localStorage
    localStorage.setItem("token", token)

    // Aqui você pode decodificar o token se quiser pegar o nome, email, etc
    // Exemplo: const payload = JSON.parse(atob(token.split('.')[1]))

    localStorage.setItem("isLoggedIn", "true")

    // Redireciona
    router.push("/")
  } catch (err: any) {
    console.error(err)
    setError("Usuário ou senha inválidos.")
    setIsLoading(false)
  }
    
    
    // e.preventDefault()


    //  try {
    //   const data = await api.post("/login", {
    //     email: email,
    //     password: password
    //   })
    //   console.log(data)
    //   // alert("Login OK")
    //   router.push("/")
    // } catch (err) {
    //   alert("Erro ao logar usuário")
    // }









    // setIsLoading(true)
    // setError("")

    // setTimeout(() => {
    //   // Verificar se é o usuário admin padrão
    //   if (email === "adm" && password === "adm123") {
    //     localStorage.setItem("isLoggedIn", "true")
    //     localStorage.setItem("username", "Administrador")
    //     localStorage.setItem("email", "admin@edugames.com")
    //     router.push("/")
    //     return
    //   }

    //   // Verificar usuários cadastrados no localStorage
    //   const usersJson = localStorage.getItem("users")
    //   if (usersJson) {
    //     const users: UserData[] = JSON.parse(usersJson)

    //     // Procurar por usuário com o nome de usuário ou e-mail fornecido
    //     const user = users.find(
    //       (u) =>
    //         u.username.toLowerCase() === email.toLowerCase() ||
    //         u.email.toLowerCase() === email.toLowerCase(),
    //     )

    //     if (user && user.password === password) {
    //       // Login bem-sucedido
    //       localStorage.setItem("isLoggedIn", "true")
    //       localStorage.setItem("username", user.username)
    //       localStorage.setItem("email", user.email)
    //       router.push("/")
    //       return
    //     }
    //   }

    //   // Se chegou aqui, as credenciais são inválidas
    //   setError("Usuário ou senha inválidos. Tente novamente.")
    //   setIsLoading(false)
    // }, 1000) // Simular tempo de processamento


  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary/50 flex flex-col items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
      {/* Botão de alternar tema */}
      <motion.button
        onClick={toggleTheme}
        className="absolute top-4 right-4 h-9 w-9 rounded-md border border-input bg-background dark:bg-gray-800 dark:border-gray-700 p-0 flex items-center justify-center overflow-hidden z-20"
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

      {/* Partículas animadas no fundo */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full opacity-20"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: ["0%", "100%"],
            x: [`${particle.x}%`, `${particle.x + (Math.random() * 10 - 5)}%`],
          }}
          transition={{
            duration: 20 / particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="w-full max-w-md z-10">
        <motion.div
          className="flex justify-center mb-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <SiteLogo />
            <span className="text-2xl font-bold text-primary dark:text-primary-dark">EduGames</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="w-full backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 dark:border-gray-700 transition-colors duration-300">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center dark:text-white">Bem-vindo(a)</CardTitle>
              <CardDescription className="text-center dark:text-gray-300">
                Entre com suas credenciais para acessar a plataforma
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <Label htmlFor="email" className="dark:text-gray-200">
                    Nome de usuário ou e-mail
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="email"
                      placeholder="Digite seu nome de usuário ou e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:scale-[1.01] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </motion.div>
                <motion.div
                  className="space-y-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="dark:text-gray-200">
                      Senha
                    </Label>
                    <Button variant="link" asChild className="p-0 h-auto text-sm text-primary dark:text-primary-dark">
                      <Link href="/forgot-password">Esqueceu a senha?</Link>
                    </Button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:scale-[1.01] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-gray-700 text-white dark:bg-secondary-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Entrando...
                      </span>
                    ) : (
                      "Entrar"
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground dark:text-gray-400">
               
              </div>
              <div className="text-center text-sm dark:text-gray-300">
                Não tem uma conta?{" "}
                <Link href="/register" className="text-primary dark:text-primary-dark hover:underline">
                  Cadastre-se
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.p
          className="text-center mt-8 text-sm text-muted-foreground dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          © {new Date().getFullYear()} EduGames - Plataforma de Jogos Educacionais
        </motion.p>
      </div>
    </div>
  )
}
