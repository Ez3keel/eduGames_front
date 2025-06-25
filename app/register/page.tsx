"use client"

import type React from "react"

import api from '../services/api'
import { useRef } from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowLeft, CheckCircle2, User, Mail, Lock, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import SiteLogo from "@/components/site-logo"
import { motion } from "framer-motion"
import ThemeToggle from "@/components/theme-toggle"

interface UserData {
  name: string
  username: string
  email: string
  password: string
}

export default function RegisterPage() {

  // // CONFIRMA AUTENTICAÇÃO
  // const nameRef = useRef<HTMLInputElement | null>(null)
  // const emailRef = useRef<HTMLInputElement | null>(null)
  // const passwordRef = useRef<HTMLInputElement | null>(null)
  // const confirmPasswordRef = useRef<HTMLInputElement | null>(null)
  // const userRef = useRef<HTMLInputElement | null>(null)





  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  // Função para verificar se um usuário já existe
  const userExists = (username: string, email: string): boolean => {
    const usersJson = localStorage.getItem("users")
    if (!usersJson) return false

    const users: UserData[] = JSON.parse(usersJson)
    return users.some(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === email.toLowerCase(),
    )
  }

  // Função para salvar um novo usuário
  const saveUser = (userData: UserData): void => {
    const usersJson = localStorage.getItem("users")
    let users: UserData[] = []

    if (usersJson) {
      users = JSON.parse(usersJson)
    }

    users.push(userData)
    localStorage.setItem("users", JSON.stringify(users))
  }

  async function handleSubmit (e: React.FormEvent){
    e.preventDefault()

    try {
      await api.post("/cadastro", {
        name,
        email,
        password
      })
      alert("Usuário cadastrado com Sucesso!")
    } catch (err) {
      alert("Erro ao cadastrar usuário")
    }

    // try{
    //   await api.post('/cadastro', {
    //     name: nameRef.current.value,
    //     email: emailRef.current.value,
    //     password: passwordRef.current.value
    //   })
    //   alert('Usuário cadastrado com Sucesso!')
    // } catch(err){
    //   alert("Erro ao cadastrar usuário")
    // }
























    // ANTIGO
    // e.preventDefault()
    // setError("")
    // setIsSubmitting(true)

    // // Validações
    // if (!name || !username || !email || !password || !confirmPassword) {
    //   setError("Todos os campos são obrigatórios.")
    //   setIsSubmitting(false)
    //   return
    // }

    // if (name.length < 3) {
    //   setError("O nome deve ter pelo menos 3 caracteres.")
    //   setIsSubmitting(false)
    //   return
    // }

    // if (username.length < 3) {
    //   setError("O nome de usuário deve ter pelo menos 3 caracteres.")
    //   setIsSubmitting(false)
    //   return
    // }

    // // Validação de formato de e-mail
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // if (!emailRegex.test(email)) {
    //   setError("Por favor, insira um endereço de e-mail válido.")
    //   setIsSubmitting(false)
    //   return
    // }

    // // Validação de senha
    // if (password.length < 6) {
    //   setError("A senha deve ter pelo menos 6 caracteres.")
    //   setIsSubmitting(false)
    //   return
    // }

    // // Verificar se as senhas coincidem
    // if (password !== confirmPassword) {
    //   setError("As senhas não coincidem.")
    //   setIsSubmitting(false)
    //   return
    // }

    // // Verificar se o usuário já existe
    // if (userExists(username, email)) {
    //   setError("Nome de usuário ou e-mail já cadastrado.")
    //   setIsSubmitting(false)
    //   return
    // }

    // // Simular processamento
    // setTimeout(() => {
    //   // Salvar o usuário no localStorage
    //   const userData: UserData = {
    //     name,
    //     username,
    //     email,
    //     password,
    //   }

    //   saveUser(userData)
    //   setSuccess(true)
    //   setIsSubmitting(false)

    //   // Redirecionar para a página de login após 2 segundos
    //   setTimeout(() => {
    //     router.push("/login")
    //   }, 2000)
    // }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary/50 flex flex-col items-center justify-center p-4 transition-colors duration-300">
      {/* Botão de alternar tema */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
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
              <CardTitle className="text-2xl text-center dark:text-white">Criar Conta</CardTitle>
              <CardDescription className="text-center dark:text-gray-300">
                {!success ? "Preencha os campos abaixo para se cadastrar" : "Conta criada com sucesso!"}
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

              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-4"
                >
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 dark:text-white">Cadastro realizado!</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Sua conta foi criada com sucesso.
                    <br />
                    <span className="font-medium text-primary dark:text-primary-dark">
                      Redirecionando para o login...
                    </span>
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Nome completo */}
                  <motion.div
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Label htmlFor="name" className="dark:text-gray-200">
                      Nome completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        // ref = {nameRef}
                        id="name"
                        placeholder="Digite seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:scale-[1.01] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </motion.div>

                  {/* Nome de usuário */}
                  <motion.div
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Label htmlFor="username" className="dark:text-gray-200">
                      Nome de usuário
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        // ref = {userRef}
                        id="username"
                        placeholder="Digite seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:scale-[1.01] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </motion.div>

                  {/* E-mail */}
                  <motion.div
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Label htmlFor="email" className="dark:text-gray-200">
                      E-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        // ref = {emailRef}
                        id="email"
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:scale-[1.01] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </motion.div>

                  {/* Senha */}
                  <motion.div
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Label htmlFor="password" className="dark:text-gray-200">
                      Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        // ref = {passwordRef}
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
                    <p className="text-xs text-gray-500 dark:text-gray-400">A senha deve ter pelo menos 6 caracteres</p>
                  </motion.div>

                  {/* Confirmar Senha */}
                  <motion.div
                    className="space-y-2"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Label htmlFor="confirm-password" className="dark:text-gray-200">
                      Confirmar Senha
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        // ref = {confirmPasswordRef}
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark focus:scale-[1.01] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                        aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-gray-700 text-white dark:bg-secondary-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
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
                          Cadastrando...
                        </span>
                      ) : (
                        "Cadastrar"
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm">
                <Button variant="link" asChild className="text-primary dark:text-primary-dark p-0">
                  <Link href="/login" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Já tem uma conta? Faça login
                  </Link>
                </Button>
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
