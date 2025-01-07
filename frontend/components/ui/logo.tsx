import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <div className="relative group">
        <div className="relative flex flex-col items-center">
          <span className="font-['Dirtyline'] text-4xl tracking-wider text-primary">
            MIND
          </span>
        </div>
      </div>
    </Link>
  )
} 