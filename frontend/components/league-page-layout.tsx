"use client"

import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PlayerAvatar } from "@/components/player-avatar"

interface LeagueStats {
  topScorer?: {
    name: string
    goals: number
    image?: string
  }
  recentMatches?: Array<{
    homeTeam: string
    awayTeam: string
    score: string
  }>
  upcomingMatches?: Array<{
    homeTeam: string
    awayTeam: string
  }>
  standings?: Array<{
    position: number
    team: string
    played: number
    won: number
    drawn: number
    lost: number
    gf: number
    ga: number
    gd: number
    points: number
  }>
}

interface LeaguePageLayoutProps {
  leagueId: string
  leagueName: string
  leagueShortName: string
  stats: LeagueStats
}

export function LeaguePageLayout({
  leagueId,
  leagueName,
  leagueShortName,
  stats
}: LeaguePageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage 
            src={`/images/leagues/${leagueId}.png`}
            alt={leagueName}
          />
          <AvatarFallback>{leagueShortName}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{leagueName}</h1>
          <p className="text-sm text-muted-foreground">2023/24 Season</p>
        </div>
      </div>

      <Tabs defaultValue="standings" className="w-full">
        <TabsList>
          <TabsTrigger value="standings">Standings</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
        </TabsList>

        <TabsContent value="standings">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pos</TableHead>
                  <TableHead>Club</TableHead>
                  <TableHead>P</TableHead>
                  <TableHead>W</TableHead>
                  <TableHead>D</TableHead>
                  <TableHead>L</TableHead>
                  <TableHead>GF</TableHead>
                  <TableHead>GA</TableHead>
                  <TableHead>GD</TableHead>
                  <TableHead>Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats?.standings && stats.standings.length > 0 ? (
                  stats.standings.map((team) => (
                    <TableRow key={team.team}>
                      <TableCell>{team.position}</TableCell>
                      <TableCell>{team.team}</TableCell>
                      <TableCell>{team.played}</TableCell>
                      <TableCell>{team.won}</TableCell>
                      <TableCell>{team.drawn}</TableCell>
                      <TableCell>{team.lost}</TableCell>
                      <TableCell>{team.gf}</TableCell>
                      <TableCell>{team.ga}</TableCell>
                      <TableCell>{team.gd}</TableCell>
                      <TableCell className="font-bold">{team.points}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center">
                      No standings data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="matches">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recent Results</h3>
              <div className="space-y-4">
                {stats?.recentMatches && stats.recentMatches.length > 0 ? (
                  stats.recentMatches.map((match, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{match.homeTeam}</span>
                      <span className="font-bold">{match.score}</span>
                      <span>{match.awayTeam}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No recent matches</p>
                )}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Upcoming Fixtures</h3>
              <div className="space-y-4">
                {stats?.upcomingMatches && stats.upcomingMatches.length > 0 ? (
                  stats.upcomingMatches.map((match, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{match.homeTeam}</span>
                      <span>vs</span>
                      <span>{match.awayTeam}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No upcoming matches</p>
                )}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 