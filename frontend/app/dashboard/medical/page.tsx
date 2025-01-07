"use client"

import { useMedical } from "@/hooks/useMedical"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"

export default function MedicalPage() {
  const { loading, error, getCurrentInjuries, getTeamStats } = useMedical()
  const currentInjuries = getCurrentInjuries()
  const teamStats = getTeamStats()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Erreur: {error}
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Blessures actuelles</CardTitle>
            <CardDescription>Nombre de joueurs blessés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.currentlyInjured}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Durée moyenne</CardTitle>
            <CardDescription>Durée moyenne des blessures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {teamStats?.averageInjuryDuration} jours
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Types de blessures</CardTitle>
            <CardDescription>Répartition par type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(teamStats?.injuriesByType || {}).map(([type, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{type}</span>
                  <span className="text-sm text-gray-400">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribution des risques</CardTitle>
            <CardDescription>Niveau de risque par joueur</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Object.entries(teamStats?.riskDistribution || {}).map(([level, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{level}</span>
                  <span className="text-sm text-gray-400">{count} joueurs</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Blessures actuelles</CardTitle>
            <CardDescription>Liste des joueurs actuellement blessés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentInjuries.map((injury, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{injury.type}</p>
                      <p className="text-sm text-gray-400">{injury.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-400">
                        Depuis le {format(new Date(injury.startDate), 'dd MMM yyyy', { locale: fr })}
                      </p>
                      {injury.expectedReturn && (
                        <p className="text-sm">
                          Retour prévu: {format(new Date(injury.expectedReturn), 'dd MMM yyyy', { locale: fr })}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        injury.severity === "high"
                          ? "destructive"
                          : injury.severity === "medium"
                          ? "warning"
                          : "default"
                      }
                    >
                      {injury.severity === "high"
                        ? "Grave"
                        : injury.severity === "medium"
                        ? "Modérée"
                        : "Légère"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 