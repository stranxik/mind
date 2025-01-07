import { Card } from "@/components/ui/card"

interface AuthFormProps {
  children: React.ReactNode
  title: string
  description: string
}

export function AuthForm({ children, title, description }: AuthFormProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-primary/5 to-background" />
        <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="relative group max-w-lg w-full">
        <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20" />
        <Card className="relative p-8 bg-card/90 backdrop-blur-sm border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {children}
        </Card>
      </div>
    </div>
  )
} 