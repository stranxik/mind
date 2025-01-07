"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Lock, User, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { TeamSelect } from "@/components/ui/team-select"
import { teams } from "@/data/teams"
import { cn } from "@/lib/utils"
import { authenticate } from "@/lib/actions"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
    favoriteTeams: [] as string[],
    plan: "free"
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Si c'est un plan pro/influence et qu'on n'a pas encore choisi d'équipe
    if ((formData.plan === "pro" || formData.plan === "influence") && !showTeamSelector) {
      setShowTeamSelector(true)
      return
    }

    setLoading(true)
    setError("")

    try {
      // 1. Créer le compte
      const registerResponse = await fetch("http://localhost:8006/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname,
          favorite_teams: formData.favoriteTeams,
          plan: formData.plan
        }),
      })

      if (!registerResponse.ok) {
        const data = await registerResponse.json()
        throw new Error(data.detail || "Erreur lors de la création du compte")
      }

      // 2. Se connecter avec l'action serveur
      const formDataObj = new FormData()
      formDataObj.append('email', formData.email)
      formDataObj.append('password', formData.password)
      
      const result = await authenticate(formDataObj)
      
      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setLoading(false)
    }
  }

  const handleTeamSelect = (teamId: string) => {
    if (formData.plan === "free") {
      setFormData(prev => ({ ...prev, favoriteTeams: [teamId] }))
      return
    }

    setFormData(prev => {
      const teams = [...prev.favoriteTeams]
      if (teams.includes(teamId)) {
        return { ...prev, favoriteTeams: teams.filter(id => id !== teamId) }
      }
      if (formData.plan === "pro" && teams.length >= 5) {
        return prev
      }
      return { ...prev, favoriteTeams: [...teams, teamId] }
    })
  }

  const handleSelectAllTeams = () => {
    if (formData.plan === "influence") {
      setFormData(prev => ({
        ...prev,
        favoriteTeams: teams.map(team => team.id)
      }))
    }
  }

  if (showTeamSelector) {
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
                  <h2 className="text-2xl font-bold mb-6">Sélectionner vos équipes</h2>
                  <p className="text-muted-foreground mb-6">
                    {formData.plan === "pro" 
                      ? `Vous pouvez sélectionner jusqu'à 5 équipes (${formData.favoriteTeams.length}/5)`
                      : "Sélectionnez autant d'équipes que vous le souhaitez"}
                  </p>

                  <div className="space-y-4">
                    {formData.plan === "influence" && (
                      <Button
                        onClick={handleSelectAllTeams}
                        variant="outline"
                        className="w-full mb-4"
                        disabled={loading}
                      >
                        Tout sélectionner
                      </Button>
                    )}
                    
                    <TeamSelect
                      onChange={handleTeamSelect}
                      disabled={loading || (formData.plan === "pro" && formData.favoriteTeams.length >= 5)}
                    />

                    {formData.favoriteTeams.length > 0 && (
                      <div className="space-y-2">
                        {formData.plan === "influence" && formData.favoriteTeams.length === teams.length ? (
                          <div className="p-2 bg-muted rounded-lg text-center">
                            Toutes les équipes sont sélectionnées
                          </div>
                        ) : (
                          formData.favoriteTeams.map(teamId => {
                            const team = teams.find(t => t.id === teamId)
                            return (
                              <div key={teamId} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                                <span>{team?.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleTeamSelect(teamId)}
                                  className="h-8 w-8 p-0"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button 
                      onClick={() => setShowTeamSelector(false)}
                      variant="outline"
                      className="w-full"
                    >
                      Retour
                    </Button>
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                      <Button 
                        onClick={handleSubmit}
                        className="relative w-full bg-primary hover:bg-primary/90"
                        disabled={loading || formData.favoriteTeams.length === 0}
                      >
                        {loading ? "Création en cours..." : "Créer mon compte"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
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
                <h2 className="text-2xl font-bold mb-6">Créer un compte</h2>
                {error && (
                  <div className="mb-6 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                    {error}
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Plan</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'free', name: 'Gratuit', description: 'Pour débuter' },
                        { id: 'pro', name: 'Pro', description: 'Pour suivre plusieurs équipes' },
                        { id: 'influence', name: 'Influence', description: 'Pour les experts' }
                      ].map((plan) => (
                        <div
                          key={plan.id}
                          onClick={() => setFormData(prev => ({ ...prev, plan: plan.id, favoriteTeams: [] }))}
                          className={cn(
                            "relative p-4 rounded-lg border cursor-pointer transition-all duration-200",
                            "hover:border-primary/50 hover:bg-accent",
                            formData.plan === plan.id 
                              ? "border-primary bg-primary/10" 
                              : "border-border"
                          )}
                        >
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-xs text-muted-foreground">{plan.description}</div>
                          <Check
                            className={cn(
                              "absolute top-2 right-2 h-4 w-4",
                              formData.plan === plan.id ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {formData.plan === "free" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Équipe favorite</label>
                      <TeamSelect
                        onChange={handleTeamSelect}
                        disabled={loading}
                      />
                      {formData.favoriteTeams[0] && (
                        <div className="mt-2">
                          <Input
                            value={teams.find(team => team.id === formData.favoriteTeams[0])?.name || ""}
                            readOnly
                            className="bg-muted"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="nickname" className="text-sm font-medium">
                      Pseudo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="nickname"
                        type="text"
                        placeholder="Votre pseudo"
                        value={formData.nickname}
                        onChange={(e) => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="pl-10"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <Button 
                      type="submit" 
                      className="relative w-full bg-primary hover:bg-primary/90"
                      disabled={loading || (formData.plan === "free" && !formData.favoriteTeams[0])}
                    >
                      {loading ? (
                        "Création en cours..."
                      ) : formData.plan === "free" ? (
                        <>
                          Créer mon compte
                          <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </>
                      ) : (
                        <>
                          Suivant
                          <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      Se connecter
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