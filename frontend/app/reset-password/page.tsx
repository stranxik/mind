"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi de l'email")
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la réinitialisation du mot de passe")
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login?reset=true')
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-background">
      <Header />
      
      <div className="h-[calc(100vh-4rem)] flex flex-col items-center justify-center relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-primary/5 to-background" />
          <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="relative w-full max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-orange-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-border transition-all duration-300 group-hover:border-primary/50">
                {!token ? (
                  <>
                    <h2 className="text-2xl font-bold mb-2">Mot de passe oublié ?</h2>
                    <p className="text-muted-foreground mb-6">
                      Entrez votre adresse email pour recevoir un lien de réinitialisation
                    </p>
                    {error && (
                      <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                        {error}
                      </div>
                    )}
                    {success ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center"
                      >
                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 mb-6">
                          Si un compte existe avec cette adresse email, vous recevrez un lien de réinitialisation dans quelques minutes.
                        </div>
                        <Link href="/login">
                          <Button variant="outline" className="w-full">
                            Retour à la connexion
                          </Button>
                        </Link>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleEmailSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input
                              id="email"
                              type="email"
                              placeholder="vous@exemple.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="pl-10"
                              required
                              disabled={loading}
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                          <Button 
                            type="submit" 
                            className="relative w-full bg-primary hover:bg-primary/90"
                            disabled={loading}
                          >
                            {loading ? (
                              "Envoi en cours..."
                            ) : (
                              <>
                                Envoyer les instructions
                                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    )}
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6">Réinitialiser le mot de passe</h2>
                    {error && (
                      <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                        {error}
                      </div>
                    )}
                    {success && (
                      <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
                        Votre mot de passe a été réinitialisé avec succès. Redirection...
                      </div>
                    )}
                    <form onSubmit={handleResetSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">
                          Nouveau mot de passe
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="pl-10"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">
                          Confirmer le mot de passe
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="pl-10"
                            required
                            disabled={loading}
                          />
                        </div>
                      </div>

                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-blue-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <Button 
                          type="submit" 
                          className="relative w-full bg-primary hover:bg-primary/90"
                          disabled={loading}
                        >
                          {loading ? (
                            "Réinitialisation en cours..."
                          ) : (
                            <>
                              Réinitialiser le mot de passe
                              <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </>
                )}

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Retourner à la{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      page de connexion
                    </Link>
                  </p>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 