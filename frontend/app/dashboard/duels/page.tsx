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
            <CardTitle>Aerial Duels</CardTitle>
            <CardDescription>Success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.aerial.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.aerial.won} won out of {teamStats?.aerial.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ground Duels</CardTitle>
            <CardDescription>Success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.ground.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.ground.won} won out of {teamStats?.ground.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tackles</CardTitle>
            <CardDescription>Success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.tackle.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.tackle.won} won out of {teamStats?.tackle.total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dribbles</CardTitle>
            <CardDescription>Success rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.dribble.success.toFixed(1)}%</div>
            <p className="text-sm text-gray-400">{teamStats?.dribble.won} won out of {teamStats?.dribble.total}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Duels</TabsTrigger>
            <TabsTrigger value="aerial">Aerial Duels</TabsTrigger>
            <TabsTrigger value="ground">Ground Duels</TabsTrigger>
            <TabsTrigger value="tackle">Tackles</TabsTrigger>
            <TabsTrigger value="dribble">Dribbles</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Player Statistics</CardTitle>
                <CardDescription>All types of duels combined</CardDescription>
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
                          won out of{" "}
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
                <CardTitle>Aerial Duels by Player</CardTitle>
                <CardDescription>Aerial duels statistics</CardDescription>
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
                          {player.duels.aerial.won} won out of {player.duels.aerial.total}
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
                <CardTitle>Ground Duels by Player</CardTitle>
                <CardDescription>Ground duels statistics</CardDescription>
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
                          {player.duels.ground.won} won out of {player.duels.ground.total}
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
                <CardTitle>Tackles by Player</CardTitle>
                <CardDescription>Tackles statistics</CardDescription>
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
                          {player.duels.tackle.won} won out of {player.duels.tackle.total}
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
                <CardTitle>Dribbles by Player</CardTitle>
                <CardDescription>Dribbles statistics</CardDescription>
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
                          {player.duels.dribble.won} won out of {player.duels.dribble.total}
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