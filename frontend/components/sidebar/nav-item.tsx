import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavItemProps {
  title: string
  href: string
  active?: boolean
  isOpen?: boolean
  icon?: React.ReactNode
}

export function NavItem({ title, href, active, isOpen = true, icon }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        !isOpen && "justify-center w-full",
        active ? "bg-[#1F2937] text-white" : "text-gray-400 hover:bg-[#1F2937] hover:text-white",
      )}
    >
      <div className="flex items-center justify-center w-5 h-5 flex-shrink-0 flex-grow-0">
        {icon}
      </div>
      {isOpen && (
        <span className="ml-3 flex-shrink-0">{title}</span>
      )}
    </Link>
  )
} 