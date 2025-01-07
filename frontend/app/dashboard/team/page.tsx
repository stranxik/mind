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
            <CardTitle>Total Squad</CardTitle>
            <CardDescription>Total number of players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Age</CardTitle>
            <CardDescription>Team average age</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.averageAge} years</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Injured</CardTitle>
            <CardDescription>Currently injured players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.injuredCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Value</CardTitle>
            <CardDescription>Total squad value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.totalValue}M€</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Players</TabsTrigger>
            <TabsTrigger value="attackers">Forwards</TabsTrigger>
            <TabsTrigger value="midfielders">Midfielders</TabsTrigger>
            <TabsTrigger value="defenders">Defenders</TabsTrigger>
            <TabsTrigger value="goalkeepers">Goalkeepers</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Squad</CardTitle>
                <CardDescription>List of all players</CardDescription>
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
                          <Badge variant="destructive">Injured</Badge>
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
                <CardTitle>Forwards</CardTitle>
                <CardDescription>List of forwards</CardDescription>
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
                            <Badge variant="destructive">Injured</Badge>
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
                <CardTitle>Midfielders</CardTitle>
                <CardDescription>List of midfielders</CardDescription>
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
                            <Badge variant="destructive">Injured</Badge>
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
                <CardTitle>Defenders</CardTitle>
                <CardDescription>List of defenders</CardDescription>
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
                            <Badge variant="destructive">Injured</Badge>
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
                <CardTitle>Goalkeepers</CardTitle>
                <CardDescription>List of goalkeepers</CardDescription>
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
                            <Badge variant="destructive">Injured</Badge>
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