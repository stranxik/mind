import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/team": "Squad",
  "/dashboard/calendar": "Calendar",
  "/dashboard/matches": "Matches",
  "/dashboard/physical": "Physical",
  "/dashboard/intensity": "Intensity",
  "/dashboard/medical": "Medical",
  "/dashboard/duels": "Duels",
  "/dashboard/heatmaps": "Heatmaps",
  "/dashboard/settings": "Settings",
  "/dashboard/settings/billing": "Billing"
}

export function PageHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Overview"

  return (
    <div className="h-16 flex items-center border-b border-gray-800 px-8">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
    </div>
  )
} 