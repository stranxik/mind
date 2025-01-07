"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

interface UserNavProps {
  isOpen?: boolean
}

function UserMenu({ name, email, initials, isOpen }: { 
  name?: string | null, 
  email?: string | null, 
  initials: string,
  isOpen: boolean 
}) {
  const handleSignOut = () => {
    signOut({
      callbackUrl: '/login'
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn(
          "flex items-center gap-2 p-2 rounded-lg hover:bg-[#1F2937] transition-colors w-full",
          !isOpen && "justify-center"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt={name || 'Avatar'} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          {isOpen && (
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {name || 'Utilisateur'}
              </span>
              {email && (
                <span className="text-xs text-gray-400">
                  {email}
                </span>
              )}
            </div>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name || 'Utilisateur'}</p>
            {email && (
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/account">
          <DropdownMenuItem>
            Mon compte
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/settings">
          <DropdownMenuItem>
            Paramètres
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/settings/billing">
          <DropdownMenuItem>
            Facturation
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-600 cursor-pointer" 
          onClick={handleSignOut}
        >
          Se déconnecter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function UserNav({ isOpen = true }: UserNavProps) {
  const { data: session } = useSession()
  const name = session?.user?.name
  const email = session?.user?.email
  const initials = name?.substring(0, 2).toUpperCase() || email?.substring(0, 2).toUpperCase() || '...'

  return <UserMenu name={name} email={email} initials={initials} isOpen={isOpen} />
} 