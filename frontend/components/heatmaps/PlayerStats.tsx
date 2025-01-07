"use client"

interface Stats {
  distance: number
  sprints: number
  topSpeed: number
  possession: number
}

interface PlayerStatsProps {
  stats: Stats | null
}

export default function PlayerStats({ stats }: PlayerStatsProps) {
  if (!stats) return null

  const statItems = [
    {
      label: "Distance parcourue",
      value: `${stats.distance.toFixed(1)} km`,
      icon: "🏃‍♂️"
    },
    {
      label: "Nombre de sprints",
      value: stats.sprints,
      icon: "⚡"
    },
    {
      label: "Vitesse max",
      value: `${stats.topSpeed.toFixed(1)} km/h`,
      icon: "🏃"
    },
    {
      label: "Possession",
      value: `${stats.possession.toFixed(1)}%`,
      icon: "⚽"
    }
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded-lg bg-secondary flex items-center space-x-4"
        >
          <div className="text-2xl">{item.icon}</div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              {item.label}
            </div>
            <div className="text-2xl font-bold">
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
} 