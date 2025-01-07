"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, BarChart2, Brain, Activity, Shield, Users, Bell, Zap, Trophy, Target, Smartphone, Menu, Video, Stethoscope, CalendarDays, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Header } from "@/components/header"
import { RagAnimation, LearningAnimation, InterfaceAnimation } from "@/components/home/tech-animations"

const navigation = [
  {
    name: "Product",
    items: [
      { name: "Features", href: "#features", isAnchor: true },
      { name: "Technology", href: "#technology", isAnchor: true },
      { name: "Pricing", href: "#pricing", isAnchor: true },
      { name: "Roadmap", href: "/roadmap", isAnchor: false }
    ]
  },
  {
    name: "Resources",
    items: [
      { name: "Blog", href: "/blog", isAnchor: false },
      { name: "Support", href: "/support", isAnchor: false }
    ]
  }
]

const features = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Predictive AI",
    description: "Accurate predictions of performance and results based on millions of data points"
  },
  {
    icon: <Activity className="h-8 w-8" />,
    title: "Real-time Tracking",
    description: "Monitor form, statistics and news of your favorite players in real time"
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Physical Condition",
    description: "Detailed analysis of players' physical condition and injury risks"
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Custom Alerts",
    description: "Tailored notifications for matches, transfers, injuries and team news"
  },
  {
    icon: <BarChart2 className="h-8 w-8" />,
    title: "Advanced Statistics",
    description: "Detailed visualizations of individual and team performances"
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Tactical Analysis",
    description: "Deep understanding of game systems and tactical performances"
  }
]

const techFeatures = [
  {
    icon: <Target className="h-12 w-12 text-white" />,
    title: "RAG (Retrieval augmented generation)",
    description: "Our AI system uses the latest advances in RAG to provide accurate contextual analysis based on historical and real-time data.",
    video: "football1.mp4"
  },
  {
    icon: <Brain className="h-12 w-12 text-white" />,
    title: "Continuous Learning",
    description: "The AI continuously improves by learning from your team's data, creating an increasingly accurate and personalized system.",
    video: "football2.mp4"
  },
  {
    icon: <Smartphone className="h-12 w-12 text-white" />,
    title: "Adaptive Interface",
    description: "A unique user experience that adapts to the specific needs of each technical staff member.",
    video: "football3.mp4"
  }
]

const plans = [
  {
    name: "Fan",
    price: "$0",
    period: "/month",
    description: "To follow your team",
    features: [
      "1 favorite team",
      "Basic player stats",
      "Team news",
      "Match predictions",
      "Community forum"
    ]
  },
  {
    name: "Supporter",
    price: "$9.99",
    period: "/month",
    description: "For passionate fans",
    features: [
      "3 favorite teams",
      "Detailed player stats",
      "Performance analysis",
      "Advanced predictions",
      "Custom alerts",
      "Complete history"
    ]
  },
  {
    name: "Ultra",
    price: "$19.99",
    period: "/month",
    description: "For experts",
    features: [
      "Unlimited teams",
      "Real-time stats",
      "In-depth AI analysis",
      "Precise predictions",
      "Player physical data",
      "Access to historical data"
    ]
  }
]

const testimonials = [
  {
    quote: "I never miss any information about my favorite team. The predictions are amazing!",
    author: "Thomas Martin",
    role: "Passionate Supporter",
    team: "Olympique Lyonnais"
  },
  {
    quote: "Performance analysis helps me better understand my team's game.",
    author: "Sarah Dubois",
    role: "Dedicated Fan",
    team: "PSG"
  },
  {
    quote: "Real-time statistics and alerts are essential for following my teams.",
    author: "Lucas Bernard",
    role: "Ultra Supporter",
    team: "AS Monaco"
  }
]

export default function HomePage() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] bg-background overflow-hidden flex items-center">
        {/* Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-primary/5 to-background" />
          <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        <div className="container relative px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[calc(100vh-8rem)]">
            {/* Left Content */}
            <div className="space-y-12">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-base text-white">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Artificial Intelligence & Football
              </div>
              
              <div>
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="text-white">AI</span> to track{" "}
                  <span className="text-white"><br></br>your teams</span>
                </motion.h1>
                <motion.p 
                  className="mt-8 text-xl text-muted-foreground max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  First platform that combines artificial intelligence and sports analytics 
                  to track your favorite teams.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link href="/register">
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <Button size="lg" className="relative bg-gradient-to-r from-primary to-primary hover:from-primary/80 hover:to-primary/60 w-full sm:w-auto text-lg h-16 px-8">
                      Create Account
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </Button>
                  </div>
                </Link>
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <Button size="lg" variant="outline" className="relative w-full sm:w-auto text-lg h-16 px-8 group">
                    <span>Watch Demo</span>
                    <motion.span
                      className="ml-2 inline-block"
                      initial={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      ↗
                    </motion.span>
                  </Button>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-2 gap-8 pt-12 border-t border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {[
                  { value: "15", label: "Teams tracked" },
                  { value: "98%", label: "Prediction accuracy" },
                ].map((stat, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="text-4xl font-bold text-white">{stat.value}</h3>
                    <p className="text-lg text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Content - Preview */}
            <motion.div
              className="relative lg:block"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                {/* Background decorative elements */}
                <div className="absolute -right-32 -top-32 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -right-16 -top-16 h-[500px] w-[500px] rounded-full bg-primary/10 blur-2xl" />
                
                {/* Preview Cards */}
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/40 to-purple-500/40 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-8 shadow-2xl">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-semibold">Performance Overview</h3>
                        <Button variant="outline" size="lg">
                          <BarChart2 className="h-5 w-5 mr-2" />
                          Analytics
                        </Button>
                      </div>
                      
                      {/* Sample Chart or Stats */}
                      <div className="grid grid-cols-3 gap-6">
                        {[
                          { label: "Speed", value: "9.0 m/s", trend: "+2.5%" },
                          { label: "Distance", value: "12.8 km", trend: "+1.2%" },
                          { label: "Intensity", value: "85%", trend: "+4.8%" }
                        ].map((metric, index) => (
                          <div key={index} className="bg-background/50 rounded-lg p-4">
                            <p className="text-base text-muted-foreground">{metric.label}</p>
                            <p className="text-2xl font-semibold mt-2">{metric.value}</p>
                            <p className="text-sm text-white/80 mt-1">{metric.trend}</p>
                          </div>
                        ))}
                      </div>

                      {/* Sample Activity Feed */}
                      <div className="space-y-4 mt-8">
                        {[
                          { icon: <Bell className="h-5 w-5" />, text: "Fatigue risk detected" },
                          { icon: <Activity className="h-5 w-5" />, text: "Optimal performance" },
                          { icon: <Shield className="h-5 w-5" />, text: "Active prevention" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 text-base">
                            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                              {item.icon}
                            </div>
                            <span>{item.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -right-8 -bottom-8 group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-4" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-medium">Predictive AI</p>
                        <p className="text-base text-muted-foreground">Real-time analysis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <section id="technology" className="min-h-screen flex items-center justify-center bg-background/50">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Cutting-edge Technologies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform uses the latest advances in artificial intelligence 
              to offer you a new way to experience football.
            </p>
          </motion.div>

          <div className="space-y-32">
            {/* RAG Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-5" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl transition-all duration-300 group-hover:border-primary/50">
                    <h3 className="text-2xl font-bold mb-4">Contextual Analysis</h3>
                    <p className="text-muted-foreground">Our AI system deeply analyzes historical data and current context to provide relevant information about your favorite teams.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-square bg-card/50 rounded-xl overflow-hidden">
                  <RagAnimation />
                </div>
              </div>
            </div>

            {/* Learning Section */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-5" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl transition-all duration-300 group-hover:border-primary/50">
                    <h3 className="text-2xl font-bold mb-4">Game Understanding</h3>
                    <p className="text-muted-foreground">The AI continuously learns from matches and performances to provide an increasingly accurate and personalized view of the game.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-square bg-card/50 rounded-xl overflow-hidden">
                  <LearningAnimation />
                </div>
              </div>
            </div>

            {/* Interface Section */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-5" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border p-8 rounded-xl transition-all duration-300 group-hover:border-primary/50">
                    <h3 className="text-2xl font-bold mb-4">Personalized Experience</h3>
                    <p className="text-muted-foreground">An intuitive interface that adapts to your way of following football and highlights what matters most to you.</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-square bg-card/50 rounded-xl overflow-hidden">
                  <InterfaceAnimation />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        </div>

        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl font-bold mb-4">How it works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A new way to experience football
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Data Collection",
                description: "Connect your tracking devices and import your historical data",
                icon: <Activity className="h-8 w-8" />,
                color: "from-blue-500/20 to-purple-500/20"
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI analyzes performance in real-time and detects patterns",
                icon: <Brain className="h-8 w-8" />,
                color: "from-purple-500/20 to-pink-500/20"
              },
              {
                step: "03",
                title: "Predictions",
                description: "Receive preventive alerts and personalized recommendations",
                icon: <Bell className="h-8 w-8" />,
                color: "from-pink-500/20 to-orange-500/20"
              },
              {
                step: "04",
                title: "Optimization",
                description: "Adjust your strategies based on concrete data",
                icon: <Target className="h-8 w-8" />,
                color: "from-orange-500/20 to-blue-500/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className={`absolute -inset-2 bg-gradient-to-r ${item.color} blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 transition-all duration-300 group-hover:border-primary/50">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-primary/30 blur rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <div className="relative h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center">
                          {item.icon}
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-sm font-bold text-primary">STEP</span>
                        <p className="text-2xl font-bold">{item.step}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <motion.h3 
                        className="text-2xl font-bold"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                      >
                        {item.title}
                      </motion.h3>
                      <motion.p 
                        className="text-muted-foreground"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      >
                        {item.description}
                      </motion.p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen flex items-center justify-center bg-background/50">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">A Complete Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All the tools you need to stay up to date with your favorite teams
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature principale */}
            <div className="lg:col-span-2 lg:row-span-2">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-4" />
                <Card className="relative h-full p-8 bg-card border-border transition-all duration-300 group-hover:border-primary/50">
                  <div className="h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">Advanced Artificial Intelligence</h3>
                    </div>
                    <p className="text-muted-foreground mb-8">
                      Our AI continuously analyzes your players' performance, detects patterns,
                      and generates accurate predictions to optimize your strategies.
                    </p>
                    <div className="mt-auto grid grid-cols-2 gap-4">
                      <div className="p-4 bg-background/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Predictive Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Anticipate risks and optimize performance
                        </p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg">
                        <h4 className="font-semibold mb-2">Continuous Learning</h4>
                        <p className="text-sm text-muted-foreground">
                          AI improves with each new data point
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Autres features */}
            {features.slice(1).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group relative h-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-4" />
                  <Card className="relative h-full p-6 bg-card border-border transition-all duration-300 group-hover:border-primary/50">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
              <h2 className="text-3xl font-bold mb-4">They live football differently</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how our users experience their passion for football
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="group relative h-full">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20 group-hover:-inset-4" />
                  <Card className="relative h-full p-6 bg-card/50 backdrop-blur border-border transition-all duration-300 group-hover:border-primary/50">
                    <div className="mb-6">
                      <svg className="h-8 w-8 text-primary/50" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                      </svg>
                    </div>
                    <p className="text-lg mb-6">{testimonial.quote}</p>
                    <div className="mt-auto">
                      <p className="font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm text-primary">{testimonial.team}</p>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="min-h-[50vh] flex items-center justify-center bg-background/50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.02]" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        </div>

        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Football AI integrates with your favorite tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Football AI integrates seamlessly with your favorite tools
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "GPS Tracking",
                icon: <Activity className="h-10 w-10" />
              },
              {
                name: "Video Analysis",
                icon: <Video className="h-10 w-10" />
              },
              {
                name: "Medical Software",
                icon: <Heart className="h-10 w-10" />
              },
              {
                name: "Performance Data",
                icon: <BarChart2 className="h-10 w-10" />
              }
            ].map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8 h-[180px] transition-all duration-300 group-hover:border-primary/50 flex flex-col items-center justify-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-primary/30 blur rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    <div className="relative h-20 w-20 rounded-xl bg-primary/10 flex items-center justify-center">
                      {integration.icon}
                    </div>
                  </div>
                  <p className="font-medium text-base text-center">{integration.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="min-h-screen flex items-center justify-center bg-background/50">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Flexible Pricing</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible solutions to meet every organization's needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="w-full"
              >
                <div className="group relative h-full">
                  <div className={`absolute -inset-2 bg-gradient-to-r ${
                    index === 0 ? "from-blue-500/20 to-purple-500/20" :
                    index === 1 ? "from-purple-500/20 to-pink-500/20" :
                    "from-pink-500/20 to-orange-500/20"
                  } blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                  <Card className={`relative h-full p-8 bg-card/50 backdrop-blur-sm border-border transition-all duration-300 group-hover:border-primary/50 ${
                    index === 1 ? "scale-105 border-primary" : ""
                  }`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="relative group">
                      <div className={`absolute -inset-2 bg-gradient-to-r ${
                        index === 0 ? "from-purple-500/20 to-pink-500/20" :
                        index === 1 ? "from-pink-500/20 to-orange-500/20" :
                        "from-orange-500/20 to-blue-500/20"
                      } blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                      <Button className="relative w-full bg-primary hover:bg-primary/90">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </Button>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center w-full max-w-5xl"
          >
            <Card className="mx-auto p-12 bg-card border-border">
              <h2 className="text-3xl font-bold mb-4">Ready to transform your team?</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
                Join the clubs already using Football AI to optimize their performance 
                and reduce injuries
              </p>
              <Link href="/register">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <Button size="lg" className="relative bg-gradient-to-r from-primary to-primary hover:from-primary/80 hover:to-primary/60 w-64 h-14 text-lg">
                    Create Account
                    <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </Button>
                </div>
              </Link>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="max-w-4xl mx-auto p-8 bg-card/50 backdrop-blur-sm border-border">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-white">Stay Informed</h2>
              <p className="text-muted-foreground">
                Subscribe to our newsletter to follow our development progress
                and be the first to test our new features.
              </p>
              <div className="relative group inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                <button className="relative bg-primary hover:bg-primary/90 text-background font-medium px-8 py-3 rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-background/50 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
            {/* Column 1 - About */}
            <div className="space-y-6">
              <div className="relative">
                <div className="relative flex flex-col items-center">
                  <span className="font-['Dirtyline'] text-3xl tracking-wider text-primary">
                    MIND
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground">
                First predictive analysis platform for professional football, 
                powered by artificial intelligence.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Column 2 - Product */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Product</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="#features" className="text-muted-foreground hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#technology" className="text-muted-foreground hover:text-white transition-colors">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-muted-foreground hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/roadmap" className="text-muted-foreground hover:text-white transition-colors">
                    Roadmap
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 - Resources */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-white transition-colors">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Legal */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Legal</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-white transition-colors">
                    Terms of Use
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/gdpr" className="text-muted-foreground hover:text-white transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2024 Football AI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 