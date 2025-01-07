"use client"

import { useTeam } from "@/hooks/useTeam"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TeamPage() {
  const { getTeamStats, getAllPlayers } = useTeam()
  const teamStats = getTeamStats()
  const players = getAllPlayers()

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Effectif total</CardTitle>
            <CardDescription>Nombre total de joueurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Âge moyen</CardTitle>
            <CardDescription>Moyenne d'âge de l'équipe</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.averageAge} ans</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blessés</CardTitle>
            <CardDescription>Joueurs actuellement blessés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.injuredCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Valeur</CardTitle>
            <CardDescription>Valeur totale de l'effectif</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.totalValue}M€</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tous les joueurs</TabsTrigger>
            <TabsTrigger value="attackers">Attaquants</TabsTrigger>
            <TabsTrigger value="midfielders">Milieux</TabsTrigger>
            <TabsTrigger value="defenders">Défenseurs</TabsTrigger>
            <TabsTrigger value="goalkeepers">Gardiens</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Effectif complet</CardTitle>
                <CardDescription>Liste de tous les joueurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">{player.firstName} {player.lastName}</p>
                          <p className="text-sm text-gray-400">{player.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-400">#{player.number}</p>
                          <p className="text-sm">{player.age} ans</p>
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

          <TabsContent value="attackers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Attaquants</CardTitle>
                <CardDescription>Liste des attaquants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players
                    .filter(player => player.position === "Attaquant")
                    .map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{player.firstName} {player.lastName}</p>
                            <p className="text-sm text-gray-400">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">#{player.number}</p>
                            <p className="text-sm">{player.age} ans</p>
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

          <TabsContent value="midfielders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Milieux</CardTitle>
                <CardDescription>Liste des milieux</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players
                    .filter(player => player.position === "Milieu")
                    .map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{player.firstName} {player.lastName}</p>
                            <p className="text-sm text-gray-400">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">#{player.number}</p>
                            <p className="text-sm">{player.age} ans</p>
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

          <TabsContent value="defenders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Défenseurs</CardTitle>
                <CardDescription>Liste des défenseurs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players
                    .filter(player => player.position === "Défenseur")
                    .map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{player.firstName} {player.lastName}</p>
                            <p className="text-sm text-gray-400">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">#{player.number}</p>
                            <p className="text-sm">{player.age} ans</p>
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

          <TabsContent value="goalkeepers" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Gardiens</CardTitle>
                <CardDescription>Liste des gardiens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players
                    .filter(player => player.position === "Gardien")
                    .map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-medium">{player.firstName} {player.lastName}</p>
                            <p className="text-sm text-gray-400">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="text-sm text-gray-400">#{player.number}</p>
                            <p className="text-sm">{player.age} ans</p>
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
        </Tabs>
      </div>
    </div>
  )
} 