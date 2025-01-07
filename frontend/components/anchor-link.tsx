"use client"

import { useRouter, usePathname } from "next/navigation"

interface AnchorLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function AnchorLink({ href, children, className }: AnchorLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Si on n'est pas sur la page d'accueil, on y retourne d'abord
    if (pathname !== "/") {
      router.push("/")
      // On attend un peu que la page soit chargée avant de scroller
      setTimeout(() => {
        const element = document.querySelector(href)
        element?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      // Si on est déjà sur la page d'accueil, on scroll directement
      const element = document.querySelector(href)
      element?.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
} 