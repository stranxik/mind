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
            <CardTitle>Squad</CardTitle>
            <CardDescription>Total number of players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{players.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Injured</CardTitle>
            <CardDescription>Unavailable players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {players.filter(player => player.status === "injured").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Match</CardTitle>
            <CardDescription>In 3 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PSG vs OM</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form</CardTitle>
            <CardDescription>General form status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">85%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Team Performance</CardTitle>
                  <CardDescription>General Statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Wins</span>
                      <span className="font-bold text-green-500">75%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Goals Scored</span>
                      <span className="font-bold">2.5 per match</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Goals Conceded</span>
                      <span className="font-bold">0.8 per match</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Possession</span>
                      <span className="font-bold">58%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Condition</CardTitle>
                  <CardDescription>Condition Statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Fatigue</span>
                      <span className="font-bold text-yellow-500">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Injury Risk</span>
                      <span className="font-bold text-green-500">Low</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Recovery Time</span>
                      <span className="font-bold">48h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Training Load</span>
                      <span className="font-bold">Optimal</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="players" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Players</CardTitle>
                <CardDescription>Individual Performances</CardDescription>
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
                          <p className="text-sm text-gray-400">Average Rating</p>
                          <p className="font-medium">8.5</p>
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

          <TabsContent value="matches" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>Upcoming Schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { opponent: "PSG", date: "March 15", competition: "Ligue 1" },
                    { opponent: "Lyon", date: "March 22", competition: "Ligue 1" },
                    { opponent: "Lens", date: "March 29", competition: "Ligue 1" },
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