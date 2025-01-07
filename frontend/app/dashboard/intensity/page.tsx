"use client"

import { useIntensity } from "@/hooks/useIntensity"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function IntensityPage() {
  const { getTeamAverages, getAllPlayers } = useIntensity()
  const teamStats = getTeamAverages()
  const players = getAllPlayers()

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Charge hebdomadaire</CardTitle>
            <CardDescription>Charge actuelle vs cible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.weeklyLoad.current.toFixed(0)}</div>
            <p className="text-sm text-gray-400">Cible: {teamStats?.weeklyLoad.target.toFixed(0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variation</CardTitle>
            <CardDescription>Par rapport à la semaine précédente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              teamStats?.weeklyLoad?.variation !== undefined 
                ? teamStats.weeklyLoad.variation > 0 
                  ? 'text-green-500' 
                  : 'text-red-500'
                : ''
            }`}>
              {teamStats?.weeklyLoad?.variation !== undefined && (
                <>
                  {teamStats.weeklyLoad.variation > 0 ? '+' : ''}
                  {teamStats.weeklyLoad.variation}%
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>Entraînements cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.weeklyTraining.sessions}</div>
            <p className="text-sm text-gray-400">{teamStats?.weeklyTraining.totalDuration}h au total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intensité moyenne</CardTitle>
            <CardDescription>Cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.weeklyTraining.averageIntensity}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par joueur</CardTitle>
            <CardDescription>Charge et intensité individuelles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {players.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                  <div>
                    <p className="font-medium">{player.firstName} {player.lastName}</p>
                    <p className="text-sm text-gray-400">{player.position}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-medium">Charge: {player.weeklyStats.load.current.toFixed(0)}</p>
                      <p className="text-sm text-gray-400">
                        {player.weeklyStats.load.variation > 0 ? '+' : ''}{player.weeklyStats.load.variation}% vs sem. précédente
                      </p>
                    </div>
                    <Badge
                      variant={
                        player.weeklyStats.load.variation > 15
                          ? "destructive"
                          : player.weeklyStats.load.variation > 5
                          ? "warning"
                          : "success"
                      }
                    >
                      {player.weeklyStats.load.variation > 15
                        ? "Élevée"
                        : player.weeklyStats.load.variation > 5
                        ? "Modérée"
                        : "Optimale"}
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