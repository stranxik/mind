"use client"

import { useDuels } from "@/hooks/useDuels"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DuelsPage() {
  const { getTeamStats, getAllPlayers } = useDuels()
  const teamStats = getTeamStats()
  const players = getAllPlayers()

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Duels aériens</CardTitle>
            <CardDescription>Pourcentage de réussite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.aerial.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.aerial.won} gagnés sur {teamStats?.aerial.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Duels au sol</CardTitle>
            <CardDescription>Pourcentage de réussite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.ground.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.ground.won} gagnés sur {teamStats?.ground.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tacles</CardTitle>
            <CardDescription>Pourcentage de réussite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.tackle.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.tackle.won} gagnés sur {teamStats?.tackle.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dribbles</CardTitle>
            <CardDescription>Pourcentage de réussite</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.dribble.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.dribble.won} gagnés sur {teamStats?.dribble.total}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">Tous les duels</TabsTrigger>
            <TabsTrigger value="aerial">Duels aériens</TabsTrigger>
            <TabsTrigger value="ground">Duels au sol</TabsTrigger>
            <TabsTrigger value="tackle">Tacles</TabsTrigger>
            <TabsTrigger value="dribble">Dribbles</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques par joueur</CardTitle>
                <CardDescription>Tous types de duels confondus</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium">{player.firstName} {player.lastName}</p>
                        <p className="text-sm text-gray-400">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {(
                            (player.duels.aerial.won +
                              player.duels.ground.won +
                              player.duels.tackle.won +
                              player.duels.dribble.won) /
                            (player.duels.aerial.total +
                              player.duels.ground.total +
                              player.duels.tackle.total +
                              player.duels.dribble.total) *
                            100
                          ).toFixed(1)}%
                        </p>
                        <p className="text-sm text-gray-400">
                          {player.duels.aerial.won +
                            player.duels.ground.won +
                            player.duels.tackle.won +
                            player.duels.dribble.won}{" "}
                          gagnés sur{" "}
                          {player.duels.aerial.total +
                            player.duels.ground.total +
                            player.duels.tackle.total +
                            player.duels.dribble.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="aerial" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Duels aériens par joueur</CardTitle>
                <CardDescription>Statistiques des duels aériens</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium">{player.firstName} {player.lastName}</p>
                        <p className="text-sm text-gray-400">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{player.duels.aerial.success.toFixed(1)}%</p>
                        <p className="text-sm text-gray-400">
                          {player.duels.aerial.won} gagnés sur {player.duels.aerial.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ground" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Duels au sol par joueur</CardTitle>
                <CardDescription>Statistiques des duels au sol</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium">{player.firstName} {player.lastName}</p>
                        <p className="text-sm text-gray-400">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{player.duels.ground.success.toFixed(1)}%</p>
                        <p className="text-sm text-gray-400">
                          {player.duels.ground.won} gagnés sur {player.duels.ground.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tackle" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Tacles par joueur</CardTitle>
                <CardDescription>Statistiques des tacles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium">{player.firstName} {player.lastName}</p>
                        <p className="text-sm text-gray-400">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{player.duels.tackle.success.toFixed(1)}%</p>
                        <p className="text-sm text-gray-400">
                          {player.duels.tackle.won} gagnés sur {player.duels.tackle.total}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dribble" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Dribbles par joueur</CardTitle>
                <CardDescription>Statistiques des dribbles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {players.map((player, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div>
                        <p className="font-medium">{player.firstName} {player.lastName}</p>
                        <p className="text-sm text-gray-400">{player.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{player.duels.dribble.success.toFixed(1)}%</p>
                        <p className="text-sm text-gray-400">
                          {player.duels.dribble.won} gagnés sur {player.duels.dribble.total}
                        </p>
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