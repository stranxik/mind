"use client"

import { useMatches } from "@/hooks/useMatches"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"

export default function MatchesPage() {
  const { getAllMatches } = useMatches()
  const matches = getAllMatches()

  // Statistics calculation
  const totalMatches = matches.length
  const wins = matches.filter(match => match.result === "win").length
  const draws = matches.filter(match => match.result === "draw").length
  const losses = matches.filter(match => match.result === "loss").length
  const goalsScored = matches.reduce((acc, match) => acc + match.goalsScored, 0)
  const goalsConceded = matches.reduce((acc, match) => acc + match.goalsConceded, 0)
  const cleanSheets = matches.filter(match => match.goalsConceded === 0).length

  // Unbeaten streak calculation
  let unbeatenStreak = 0
  for (let i = matches.length - 1; i >= 0; i--) {
    if (matches[i].result === "win" || matches[i].result === "draw") {
      unbeatenStreak++
    } else {
      break
    }
  }

  // Averages calculation
  const averageGoalsScored = (goalsScored / totalMatches).toFixed(2)
  const averageGoalsConceded = (goalsConceded / totalMatches).toFixed(2)
  const averagePoints = ((wins * 3 + draws) / totalMatches).toFixed(2)
  const winRate = ((wins / totalMatches) * 100).toFixed(1)

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Matches</CardTitle>
            <CardDescription>Number of matches played</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMatches}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wins</CardTitle>
            <CardDescription>Number of wins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{wins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Draws</CardTitle>
            <CardDescription>Number of draws</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{draws}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Losses</CardTitle>
            <CardDescription>Number of losses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{losses}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals Scored</CardTitle>
            <CardDescription>Total and average per match</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalsScored}</div>
            <p className="text-sm text-gray-500">Average: {averageGoalsScored}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Goals Conceded</CardTitle>
            <CardDescription>Total and average per match</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalsConceded}</div>
            <p className="text-sm text-gray-500">Average: {averageGoalsConceded}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clean Sheets</CardTitle>
            <CardDescription>Matches without conceding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cleanSheets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unbeaten Streak</CardTitle>
            <CardDescription>Matches without defeat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unbeatenStreak}</div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Matches</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete History</CardTitle>
                <CardDescription>All matches of the season</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-400">
                          {format(new Date(match.date), 'dd MMM yyyy', { locale: enUS })}
                        </div>
                        <div>
                          {match.homeTeam} vs {match.awayTeam}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="font-semibold">
                          {match.goalsScored} - {match.goalsConceded}
                        </div>
                        <Badge
                          variant={
                            match.result === "win"
                              ? "success"
                              : match.result === "draw"
                              ? "warning"
                              : "destructive"
                          }
                        >
                          {match.result === "win"
                            ? "Win"
                            : match.result === "draw"
                            ? "Draw"
                            : "Loss"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Matches</CardTitle>
                <CardDescription>Future matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches
                    .filter(match => new Date(match.date) > new Date())
                    .map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-400">
                            {format(new Date(match.date), 'dd MMM yyyy', { locale: enUS })}
                          </div>
                          <div>
                            {match.homeTeam} vs {match.awayTeam}
                          </div>
                        </div>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recent" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Results</CardTitle>
                <CardDescription>Last 5 matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matches
                    .filter(match => new Date(match.date) <= new Date())
                    .slice(-5)
                    .map((match, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="text-sm text-gray-400">
                            {format(new Date(match.date), 'dd MMM yyyy', { locale: enUS })}
                          </div>
                          <div>
                            {match.homeTeam} vs {match.awayTeam}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="font-semibold">
                            {match.goalsScored} - {match.goalsConceded}
                          </div>
                          <Badge
                            variant={
                              match.result === "win"
                                ? "success"
                                : match.result === "draw"
                                ? "warning"
                                : "destructive"
                            }
                          >
                            {match.result === "win"
                              ? "Win"
                              : match.result === "draw"
                              ? "Draw"
                              : "Loss"}
                          </Badge>
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