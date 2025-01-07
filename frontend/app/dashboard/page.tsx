"use client"

import { useTeam } from "@/hooks/useTeam"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function DashboardPage() {
  const { getTeamStats, getAllPlayers } = useTeam()
  const teamStats = getTeamStats()
  const players = getAllPlayers()

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Effectif</CardTitle>
            <CardDescription>Nombre total de joueurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blessés</CardTitle>
            <CardDescription>Joueurs indisponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {players.filter(player => player.status === "injured").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochain match</CardTitle>
            <CardDescription>Dans 3 jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PSG vs OM</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forme</CardTitle>
            <CardDescription>État de forme général</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">85%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="players">Joueurs</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Performance de l'équipe</CardTitle>
                  <CardDescription>Statistiques générales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Victoires</span>
                      <span className="font-bold text-green-500">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Buts marqués</span>
                      <span className="font-bold">2.5 par match</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Buts encaissés</span>
                      <span className="font-bold">0.8 par match</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Possession moyenne</span>
                      <span className="font-bold">58%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>État physique</CardTitle>
                  <CardDescription>Statistiques de condition</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Fatigue moyenne</span>
                      <span className="font-bold text-yellow-500">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Risque de blessure</span>
                      <span className="font-bold text-green-500">Faible</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Temps de récupération</span>
                      <span className="font-bold">48h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Charge d'entraînement</span>
                      <span className="font-bold">Optimale</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Joueurs clés</CardTitle>
                <CardDescription>Performances individuelles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.slice(0, 5).map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{player.firstName} {player.lastName}</p>
                          <p className="text-sm text-gray-400">{player.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Note moyenne</p>
                          <p className="font-medium">8.5</p>
                        </div>
                        {player.status === "injured" && (
                          <Badge variant="destructive">Blessé</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Prochains matches</CardTitle>
                <CardDescription>Calendrier à venir</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { opponent: "PSG", date: "15 Mars", competition: "Ligue 1" },
                    { opponent: "Lyon", date: "22 Mars", competition: "Ligue 1" },
                    { opponent: "Lens", date: "29 Mars", competition: "Ligue 1" },
                  ].map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium">vs {match.opponent}</p>
                        <p className="text-sm text-gray-400">{match.competition}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">{match.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}