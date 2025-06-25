"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import ThemeToggle from "@/components/theme-toggle"

export default function SettingsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  // Profile state
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [profileError, setProfileError] = useState("")
  const [profileSuccess, setProfileSuccess] = useState("")
  const [isProfileSubmitting, setIsProfileSubmitting] = useState(false)

  // Password state
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordSuccess, setPasswordSuccess] = useState("")
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    // Load user data from localStorage
    const storedUsername = localStorage.getItem("username") || "Administrador"
    const storedEmail = localStorage.getItem("email") || "admin@edugames.com"

    setUsername(storedUsername)
    setEmail(storedEmail)
    setIsLoading(false)
  }, [router])

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setProfileError("")
    setProfileSuccess("")
    setIsProfileSubmitting(true)

    // Validate username
    if (username.length < 3) {
      setProfileError("O nome de usuário deve ter pelo menos 3 caracteres.")
      setIsProfileSubmitting(false)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setProfileError("Por favor, insira um endereço de e-mail válido.")
      setIsProfileSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // Save to localStorage for demo purposes
      localStorage.setItem("username", username)
      localStorage.setItem("email", email)

      setProfileSuccess("Perfil atualizado com sucesso!")
      setIsProfileSubmitting(false)
    }, 1000)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError("")
    setPasswordSuccess("")
    setIsPasswordSubmitting(true)

    // Validate current password (for demo, we'll check against "adm123")
    if (currentPassword !== "adm123") {
      setPasswordError("Senha atual incorreta.")
      setIsPasswordSubmitting(false)
      return
    }

    // Validate new password
    if (newPassword.length < 6) {
      setPasswordError("A nova senha deve ter pelo menos 6 caracteres.")
      setIsPasswordSubmitting(false)
      return
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.")
      setIsPasswordSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the password in the backend
      // For demo, we'll just show success message
      setPasswordSuccess("Senha alterada com sucesso!")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setIsPasswordSubmitting(false)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary/50 transition-colors duration-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary dark:border-primary-dark mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-primary/10 dark:from-gray-900 dark:to-secondary/50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Button variant="outline" size="sm" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para a página inicial
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-dark">
              Configurações da Conta
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Gerencie suas informações pessoais e senha</p>
          </div>
          <ThemeToggle />
        </div>

        <div className="max-w-2xl mx-auto">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 dark:bg-gray-700">
              <TabsTrigger
                value="profile"
                className="dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white"
              >
                Perfil
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="dark:data-[state=active]:bg-gray-800 dark:data-[state=active]:text-white"
              >
                Senha
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="dark:text-white">Informações do Perfil</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Atualize suas informações pessoais aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profileError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{profileError}</AlertDescription>
                    </Alert>
                  )}
                  {profileSuccess && (
                    <Alert className="mb-4 border-green-500 text-green-700 dark:text-green-400 dark:border-green-700 dark:bg-green-900/30">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>{profileSuccess}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="dark:text-gray-200">
                        Nome de usuário
                      </Label>
                      <Input
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Seu nome de usuário"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="dark:text-gray-200">
                        E-mail
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@exemplo.com"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-gray-700 text-white dark:bg-secondary-dark"
                      disabled={isProfileSubmitting}
                    >
                      {isProfileSubmitting ? "Salvando..." : "Salvar alterações"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
                <CardHeader>
                  <CardTitle className="dark:text-white">Alterar Senha</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Atualize sua senha para manter sua conta segura.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {passwordError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{passwordError}</AlertDescription>
                    </Alert>
                  )}
                  {passwordSuccess && (
                    <Alert className="mb-4 border-green-500 text-green-700 dark:text-green-400 dark:border-green-700 dark:bg-green-900/30">
                      <CheckCircle2 className="h-4 w-4" />
                      <AlertDescription>{passwordSuccess}</AlertDescription>
                    </Alert>
                  )}
                  <form onSubmit={handlePasswordSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password" className="dark:text-gray-200">
                        Senha atual
                      </Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Digite sua senha atual"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="dark:text-gray-200">
                        Nova senha
                      </Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Digite sua nova senha"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="dark:text-gray-200">
                        Confirme a nova senha
                      </Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Digite novamente sua nova senha"
                        required
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-secondary hover:bg-gray-700 text-white dark:bg-secondary-dark"
                      disabled={isPasswordSubmitting}
                    >
                      {isPasswordSubmitting ? "Alterando..." : "Alterar senha"}
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center border-t dark:border-gray-700 pt-4">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Para teste, use a senha atual:{" "}
                    <code className="bg-muted dark:bg-gray-700 px-1 py-0.5 rounded">adm123</code>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
