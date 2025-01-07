"use client"

import { useHeatmaps } from "@/hooks/useHeatmaps"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import HeatmapVisualization from "@/components/heatmaps/HeatmapVisualization"
import ZoneStats from "@/components/heatmaps/ZoneStats"
import PlayerStats from "@/components/heatmaps/PlayerStats"

export default function HeatmapsPage() {
  const {
    loading,
    error,
    getAllHeatmaps,
    getHeatmapById,
    getZoneStats,
    getPlayerStats
  } = useHeatmaps()

  const heatmaps = getAllHeatmaps()
  const selectedHeatmap = heatmaps[0]
  const zoneStats = selectedHeatmap ? getZoneStats(selectedHeatmap.id) : null
  const playerStats = selectedHeatmap ? getPlayerStats(selectedHeatmap.id) : null

  if (loading) {
    return (
      <div className="space-y-4 p-8">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (!selectedHeatmap) {
    return (
      <Alert className="m-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Aucune donnée</AlertTitle>
        <AlertDescription>
          Aucune donnée de heatmap n'est disponible pour le moment.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">
          Heatmap: {selectedHeatmap.firstName} {selectedHeatmap.lastName}
        </h2>
        <div className="text-sm text-muted-foreground">
          Match contre {selectedHeatmap.opponent} - {selectedHeatmap.date}
        </div>
      </div>

      <Tabs defaultValue="heatmap" className="space-y-4">
        <TabsList>
          <TabsTrigger value="heatmap">Heatmap</TabsTrigger>
          <TabsTrigger value="zones">Zones</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="heatmap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Carte de chaleur</CardTitle>
            </CardHeader>
            <CardContent>
              <HeatmapVisualization positions={selectedHeatmap.positions} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques par zone</CardTitle>
            </CardHeader>
            <CardContent>
              <ZoneStats zones={zoneStats} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques du joueur</CardTitle>
            </CardHeader>
            <CardContent>
              <PlayerStats stats={playerStats} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}