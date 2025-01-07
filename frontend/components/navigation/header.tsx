'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Football Intelligence Assistant
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/stats"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/stats' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Statistics
            </Link>
            <Link
              href="/assistant"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/assistant' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              AI Assistant
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
} 