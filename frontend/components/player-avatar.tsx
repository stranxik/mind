import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { User } from "lucide-react"

interface PlayerAvatarProps {
  src?: string
  name: string
  className?: string
}

export function PlayerAvatar({ src, name, className }: PlayerAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()

  return (
    <Avatar className={className || "h-10 w-10"}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="bg-primary text-primary-foreground">
        {src ? <User className="h-6 w-6" /> : initials}
      </AvatarFallback>
    </Avatar>
  )
} 