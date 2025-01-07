"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DuelStats {
  type: "aerial" | "ground" | "tackle"
  won: number
  total: number
  successRate: number
  trend: "improving" | "stable" | "declining"
}

interface DuelsData {
  overall: {
    won: number
    total: number
    successRate: number
  }
  stats: DuelStats[]
}

interface DuelsCardProps {
  data: DuelsData
}

export function DuelsCard({ data }: DuelsCardProps) {
  const getTrendColor = (trend: DuelStats["trend"]) => {
    switch (trend) {
      case "improving":
        return "text-green-500"
      case "declining":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getDuelTypeLabel = (type: DuelStats["type"]) => {
    switch (type) {
      case "aerial":
        return "Aerial Duels"
      case "ground":
        return "Ground Duels"
      case "tackle":
        return "Tackles"
      default:
        return type
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Overall Duels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold">{data.overall.successRate}%</p>
              </div>
              <Progress value={data.overall.successRate} className="h-2 mt-2" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Won</p>
                <p className="text-2xl font-bold">{data.overall.won}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{data.overall.total}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Duel Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.stats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{getDuelTypeLabel(stat.type)}</p>
                  <p className={cn("text-sm", getTrendColor(stat.trend))}>
                    {stat.successRate}%
                  </p>
                </div>
                <Progress value={stat.successRate} className="h-2 mt-2" />
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Won: {stat.won}</span>
                  <span>Total: {stat.total}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 