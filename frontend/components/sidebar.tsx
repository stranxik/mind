"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import {
  ChevronDown,
  BarChart3,
  Activity,
  Users,
} from "lucide-react"
import { UserNav } from "@/components/user-nav"

interface NavItem {
  title: string
  href?: string
  icon?: React.ReactNode
  submenu?: NavItem[]
  isPersonalized?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <BarChart3 className="h-5 w-5" />
  },
  {
    title: "Team",
    icon: <Users className="h-5 w-5" />,
    submenu: [
      {
        title: "Squad",
        href: "/dashboard/team"
      },
      {
        title: "Calendar",
        href: "/dashboard/calendar"
      },
      {
        title: "Matches",
        href: "/dashboard/matches"
      }
    ]
  },
  {
    title: "Performance",
    icon: <Activity className="h-5 w-5" />,
    submenu: [
      {
        title: "Physical",
        href: "/dashboard/physical",
        isPersonalized: true
      },
      {
        title: "Intensity",
        href: "/dashboard/intensity",
        isPersonalized: true
      },
      {
        title: "Medical",
        href: "/dashboard/medical",
        isPersonalized: true
      },
      {
        title: "Duels",
        href: "/dashboard/duels",
        isPersonalized: true
      },
      {
        title: "Heatmaps",
        href: "/dashboard/heatmaps",
        isPersonalized: true
      }
    ]
  }
]

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([])

  useEffect(() => {
    const allSections = navItems
      .filter(item => item.submenu)
      .map(item => item.title)
    setOpenSections(allSections)
  }, [])

  const toggleSection = (title: string) => {
    setOpenSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => pathname === href

  return (
    <div className={cn(
      "flex flex-col h-screen bg-[#020817] border-r border-gray-800 transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="h-16 flex items-center px-4 border-b border-gray-800">
        <Logo />
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((item, index) => (
          <div key={index} className="mb-2">
            {item.submenu ? (
              <div>
                <button
                  onClick={() => toggleSection(item.title)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2 text-sm font-medium transition-colors",
                    openSections.includes(item.title) 
                      ? "text-white" 
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <div className="flex items-center">
                    {item.icon}
                    {isOpen && <span className="ml-3">{item.title}</span>}
                  </div>
                  {isOpen && (
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openSections.includes(item.title) && "rotate-180"
                      )} 
                    />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {openSections.includes(item.title) && isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-1 px-4 py-2">
                        {item.submenu.map((subitem, subindex) => (
                          <Link
                            key={subindex}
                            href={subitem.href || "#"}
                            className={cn(
                              "flex h-10 items-center rounded-lg px-4 text-sm font-medium transition-colors",
                              isActive(subitem.href || "") 
                                ? "bg-[#1F2937] text-white" 
                                : "text-gray-400 hover:bg-[#1F2937] hover:text-white",
                              subitem.isPersonalized && "text-blue-500 hover:text-blue-400"
                            )}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={item.href || "#"}
                className={cn(
                  "flex h-10 items-center px-4 text-sm font-medium transition-colors",
                  isActive(item.href || "") 
                    ? "bg-[#1F2937] text-white" 
                    : "text-gray-400 hover:bg-[#1F2937] hover:text-white"
                )}
              >
                <div className="flex items-center">
                  {item.icon}
                  {isOpen && <span className="ml-3">{item.title}</span>}
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>

      <div className="border-t border-gray-800 p-4">
        <UserNav isOpen={isOpen} />
      </div>
    </div>
  )
} 