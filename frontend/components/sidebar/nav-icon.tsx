import { LucideIcon } from "lucide-react"

interface NavIconProps {
  Icon: LucideIcon
}

export function NavIcon({ Icon }: NavIconProps) {
  return (
    <div className="w-[20px] h-[20px] shrink-0 flex items-center justify-center">
      <Icon strokeWidth={1.5} className="w-full h-full" />
    </div>
  )
} 