"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Injury {
  type: string
  startDate: string
  endDate: string | null
  duration: number
  status: "active" | "recovered" | "rehabilitation"
}

interface MedicalData {
  injuries: Injury[]
  fitness: {
    level: number
    trend: "improving" | "stable" | "declining"
  }
  availability: {
    lastThreeMonths: number
    season: number
  }
}

interface MedicalCardProps {
  medical: MedicalData
}

export function MedicalCard({ medical }: MedicalCardProps) {
  const getStatusVariant = (status: Injury["status"]) => {
    switch (status) {
      case "active":
        return "destructive"
      case "rehabilitation":
        return "warning"
      case "recovered":
        return "success"
      default:
        return "secondary"
    }
  }

  const getTrendColor = (trend: MedicalData["fitness"]["trend"]) => {
    switch (trend) {
      case "improving":
        return "text-green-500"
      case "declining":
        return "text-red-500"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Fitness Level</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Current Level</p>
                <p className={cn("text-sm", getTrendColor(medical.fitness.trend))}>
                  {medical.fitness.trend}
                </p>
              </div>
              <p className="text-2xl font-bold">{medical.fitness.level}%</p>
              <Progress value={medical.fitness.level} className="h-2 mt-2" />
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">3-Month Availability</p>
                <p className="text-2xl font-bold">{medical.availability.lastThreeMonths}%</p>
              </div>
              <div>
                <p className="text-sm font-medium">Season Availability</p>
                <p className="text-2xl font-bold">{medical.availability.season}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium">Injury History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {medical.injuries.map((injury, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="font-medium">{injury.type}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(injury.startDate).toLocaleDateString()} - {injury.endDate ? new Date(injury.endDate).toLocaleDateString() : 'Ongoing'}
                  </p>
                  <p className="text-sm text-muted-foreground">Duration: {injury.duration} days</p>
                </div>
                <Badge variant={getStatusVariant(injury.status)}>
                  {injury.status}
                </Badge>
              </div>
            ))}
            {medical.injuries.length === 0 && (
              <p className="text-sm text-muted-foreground">No injury history</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}