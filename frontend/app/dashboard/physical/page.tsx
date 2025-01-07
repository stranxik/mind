"use client"

import { usePhysical } from "@/hooks/usePhysical"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PhysicalPage() {
  const { getTeamAverages, getAllPlayers } = usePhysical()
  const teamStats = getTeamAverages()
  const players = getAllPlayers()

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Average Distance</CardTitle>
            <CardDescription>Average distance per match</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.distance.total.toFixed(1)} km</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maximum Speed</CardTitle>
            <CardDescription>Maximum speed reached</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.speed.max.toFixed(1)} km/h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sprints</CardTitle>
            <CardDescription>Sprint distance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.distance.sprint.toFixed(1)} km</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intensity</CardTitle>
            <CardDescription>Recovery score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamStats?.recovery.score}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="distance">
          <TabsList>
            <TabsTrigger value="distance">Distance</TabsTrigger>
            <TabsTrigger value="speed">Speed</TabsTrigger>
            <TabsTrigger value="intensity">Intensity</TabsTrigger>
          </TabsList>

          <TabsContent value="distance" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Distance per Player</CardTitle>
                <CardDescription>Distance covered per match</CardDescription>
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
                        <p className="font-medium">{player.stats.distance.total.toFixed(1)} km</p>
                        <p className="text-sm text-gray-400">per match</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="speed" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Speed per Player</CardTitle>
                <CardDescription>Maximum speed reached</CardDescription>
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
                        <p className="font-medium">{player.stats.speed.max.toFixed(1)} km/h</p>
                        <p className="text-sm text-gray-400">max speed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="intensity" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Intensity per Player</CardTitle>
                <CardDescription>Recovery score</CardDescription>
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
                        <p className="font-medium">{player.stats.recovery.score}%</p>
                        <p className="text-sm text-gray-400">recovery score</p>
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