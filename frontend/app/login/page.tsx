"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { authenticate } from "@/lib/actions"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append('identifier', identifier)
      formData.append('password', password)
      
      const result = await authenticate(formData)

      if (result?.error) {
        throw new Error(result.error)
      }

      // Redirection vers la page demandée ou le dashboard par défaut
      const from = searchParams.get('from')
      router.push(from || '/dashboard')
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
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <Card className="relative p-8 bg-card/50 backdrop-blur-sm border-border transition-all duration-300 group-hover:border-primary/50 w-[500px]">
                <h2 className="text-2xl font-bold mb-6">Connexion</h2>
                {error && (
                  <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="identifier" className="text-sm font-medium">
                      Email ou Nom d'utilisateur
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="identifier"
                        type="text"
                        placeholder="email@exemple.com ou nom d'utilisateur"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm text-muted-foreground">Se souvenir de moi</span>
                    </label>
                    <Link href="/reset-password" className="text-sm text-primary hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <Button 
                      type="submit" 
                      className="relative w-full bg-primary hover:bg-primary/90"
                      disabled={loading}
                    >
                      {loading ? (
                        "Connexion en cours..."
                      ) : (
                        <>
                          Se connecter
                          <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Pas encore de compte ?{" "}
                    <Link href="/register" className="text-primary hover:underline">
                      S'inscrire
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