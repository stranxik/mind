"use client"

interface ZoneData {
  zone: string
  percentage: number
  actions: number
}

interface Zones {
  attack: ZoneData[]
  midfield: ZoneData[]
  defense: ZoneData[]
}

interface ZoneStatsProps {
  zones: Zones | null
}

export default function ZoneStats({ zones }: ZoneStatsProps) {
  if (!zones) return null

  const renderZoneSection = (title: string, data: ZoneData[]) => (
    <div className="space-y-2">
      <h3 className="font-semibold text-lg">{title}</h3>
      <div className="grid grid-cols-3 gap-4">
        {data.map((zone, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-secondary"
          >
            <div className="text-sm font-medium">{zone.zone}</div>
            <div className="mt-1">
              <div className="text-2xl font-bold">{zone.percentage}%</div>
              <div className="text-sm text-muted-foreground">
                {zone.actions} actions
              </div>
            </div>
            <div className="mt-2 h-2 bg-secondary-foreground/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${zone.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {renderZoneSection("Attaque", zones.attack)}
      {renderZoneSection("Milieu", zones.midfield)}
      {renderZoneSection("Défense", zones.defense)}
    </div>
  )
} 