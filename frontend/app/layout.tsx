import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Permanent_Marker } from 'next/font/google'
import "./globals.css"
import { Providers } from "@/components/providers"
import { auth } from "@/auth"

const inter = Inter({ subsets: ["latin"] })
const permanentMarker = Permanent_Marker({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-permanent-marker',
})

export const metadata: Metadata = {
  title: "Soccermind - IA & Football",
  description: "Optimisez les performances de votre équipe avec l'IA",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  
  return (
    <html lang="fr" className={`${inter.className} ${permanentMarker.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
} 