"use client"

import { motion } from "framer-motion"
import { Brain, Zap, Trophy, Target, BarChart2, Users, Video, Activity, Heart, Shield, Smartphone, Bot, GitBranch, GitCommit, GitPullRequest } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"

const changelog = [
  {
    date: "21 Décembre 2024",
    type: "feature",
    title: "Nouvelle interface d'analyse",
    description: "Refonte complète du dashboard avec des graphiques interactifs"
  },
  {
    date: "20 Décembre 2024",
    type: "improvement",
    title: "Amélioration des prédictions",
    description: "Précision accrue de 15% sur les prévisions de blessures"
  },
  {
    date: "19 Décembre 2024",
    type: "fix",
    title: "Correction bug synchronisation",
    description: "Résolution du problème de synchronisation des données GPS"
  }
]

const roadmapItems = [
  {
    status: "En développement",
    items: [
      {
        icon: <Brain className="h-6 w-6" />,
        title: "IA Générative pour l'analyse tactique",
        description: "Génération automatique de rapports détaillés sur les performances tactiques avec suggestions d'amélioration personnalisées.",
        date: "Q1 2025"
      },
      {
        icon: <Video className="h-6 w-6" />,
        title: "Analyse vidéo temps réel",
        description: "Intégration de l'analyse vidéo en direct avec annotations automatiques des moments clés.",
        date: "Q1 2025"
      },
      {
        icon: <Activity className="h-6 w-6" />,
        title: "Monitoring avancé de la fatigue",
        description: "Système prédictif de détection de la fatigue basé sur de multiples paramètres physiologiques.",
        date: "Q1 2025"
      }
    ]
  },
  {
    status: "Planifié pour bientôt",
    items: [
      {
        icon: <Bot className="h-6 w-6" />,
        title: "Assistant IA personnel",
        description: "Un assistant virtuel spécialisé pour chaque membre du staff technique, capable de répondre aux questions spécifiques.",
        date: "Q2 2025"
      },
      {
        icon: <Users className="h-6 w-6" />,
        title: "Collaboration en temps réel",
        description: "Outils de collaboration avancés permettant aux équipes de travailler ensemble sur les analyses.",
        date: "Q2 2025"
      },
      {
        icon: <Shield className="h-6 w-6" />,
        title: "Prévention blessures 2.0",
        description: "Version améliorée de notre système de prévention des blessures avec apprentissage continu.",
        date: "Q2 2025"
      }
    ]
  },
  {
    status: "Vision future",
    items: [
      {
        icon: <BarChart2 className="h-6 w-6" />,
        title: "Analytics multi-dimensionnels",
        description: "Analyse croisée de toutes les données (physiques, tactiques, mentales) pour une vision globale.",
        date: "Q3 2025"
      },
      {
        icon: <Smartphone className="h-6 w-6" />,
        title: "Application mobile native",
        description: "Version mobile complète avec toutes les fonctionnalités de la plateforme web.",
        date: "Q3 2025"
      },
      {
        icon: <Heart className="h-6 w-6" />,
        title: "Suivi santé holistique",
        description: "Intégration du suivi du sommeil, de la nutrition et de la récupération.",
        date: "Q4 2025"
      }
    ]
  }
]

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-[80vh] bg-background overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-primary/5 to-background" />
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative px-4">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-base text-white mb-8"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Roadmap 2025
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="text-white">Shaping</span>{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                the future of football
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our vision is to revolutionize sports analytics by combining artificial 
              intelligence with human expertise. Discover the innovations that will 
              shape the future of performance.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                { label: "Features", value: "25+" },
                { label: "Updates", value: "150+" },
                { label: "Teams", value: "10" }
              ].map((stat, index) => (
                <div key={index} className="space-y-2">
                  <h4 className="text-4xl font-bold text-white">{stat.value}</h4>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Changelog Sidebar */}
        <motion.div 
          className="fixed right-8 top-32 w-80 z-10 hidden xl:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Changelog</h3>
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <GitBranch className="h-5 w-5" />
              </div>
            </div>
            <div className="space-y-6">
              {changelog.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="relative space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary">{item.date}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.type === 'feature' ? 'bg-green-500/20 text-green-500' :
                        item.type === 'improvement' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Roadmap Content */}
      <div className="container px-4 py-16">
        <div className="space-y-32">
          {roadmapItems.map((section, sectionIndex) => (
            <div key={section.status} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-3xl font-bold mb-4">{section.status}</h2>
                <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative group"
                  >
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <Card className="relative h-full p-6 bg-card/50 backdrop-blur-sm border-border transition-all duration-300 group-hover:border-primary/50">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 blur rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700" />
                            <div className="relative h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              {item.icon}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <span className="text-sm text-primary">{item.date}</span>
                          </div>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Decorative line connecting sections */}
              {sectionIndex < roadmapItems.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-16">
                  <div className="h-16 w-px bg-gradient-to-b from-primary/50 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="max-w-4xl mx-auto p-8 bg-card/50 backdrop-blur-sm border-border">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Restez informé</h2>
              <p className="text-muted-foreground">
                Abonnez-vous à notre newsletter pour suivre l'évolution de nos développements
                et être le premier à tester nos nouvelles fonctionnalités.
              </p>
              <div className="relative group inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <button className="relative bg-primary hover:bg-primary/90 text-background font-medium px-8 py-3 rounded-lg">
                  S'abonner
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
} 