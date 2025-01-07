"use client"

import { useState } from "react"
import Link from "next/link"
import { AnchorLink } from "./anchor-link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Logo } from "@/components/ui/logo"

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

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  return (
    <>
      <header className="fixed w-full z-50 py-4 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Logo />
              <nav className="hidden md:flex items-center space-x-8">
                {navigation.map((category) => (
                  <div
                    key={category.name}
                    className="relative group"
                    onMouseEnter={() => setActiveMenu(category.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <button className="text-gray-300 hover:text-white transition-colors py-2">
                      {category.name}
                    </button>
                    
                    {activeMenu === category.name && (
                      <div className="absolute top-full left-0 w-64 pt-2">
                        <div className="relative group">
                          <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-primary/5 blur-xl rounded-xl transition-all duration-300 group-hover:from-primary/30 group-hover:to-primary/20" />
                          <Card className="relative p-2 bg-card/90 backdrop-blur-sm border-border">
                            <div className="space-y-1">
                              {category.items.map((item) => (
                                item.isAnchor ? (
                                  <AnchorLink
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-primary/20 rounded-md transition-colors"
                                  >
                                    {item.name}
                                  </AnchorLink>
                                ) : (
                                  <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-primary/20 rounded-md transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                )
                              ))}
                            </div>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                  <Button className="relative bg-gradient-to-r from-primary to-primary hover:from-primary/80 hover:to-primary/60">
                    Create Account
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Button - Only visible on mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          className="bg-[#1F2937]/80 border-gray-700"
          onClick={() => setActiveMenu(activeMenu ? null : 'mobile')}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {activeMenu === 'mobile' && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-[#020817]/95 backdrop-blur">
            <div className="p-4 pt-20">
              <Card className="bg-[#1F2937] border-gray-800 max-w-2xl mx-auto">
                <div className="p-4 space-y-6">
                  {navigation.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        {category.name}
                      </h3>
                      <div className="space-y-1">
                        {category.items.map((item) => (
                          item.isAnchor ? (
                            <AnchorLink
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-md"
                            >
                              {item.name}
                            </AnchorLink>
                          ) : (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-blue-500/10 rounded-md"
                            >
                              {item.name}
                            </Link>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 space-y-4">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <div className="relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary/30 to-primary/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                        <Button className="relative w-full bg-card/90 backdrop-blur-sm border-border hover:bg-card/70">
                          Create Account
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 