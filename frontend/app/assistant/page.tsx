'use client'

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"

export default function AssistantPage() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: query }),
      })
      
      if (!res.ok) {
        throw new Error('Erreur réseau')
      }
      
      const data = await res.json()
      setResponse(data.response)
    } catch (error) {
      console.error(error)
      setResponse("Une erreur est survenue lors de la requête")
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSearch()
    }
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-4 py-8">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Assistant Football IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="Pose ta question sur le football..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={loading}
              />
              <Button 
                onClick={handleSearch} 
                disabled={loading || !query.trim()}
                className="min-w-[100px]"
              >
                {loading ? "..." : "Rechercher"}
              </Button>
            </div>
            {response && (
              <div className="mt-4 p-4 bg-secondary rounded-lg">
                <p className="whitespace-pre-wrap">{response}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 