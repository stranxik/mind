import { usePathname } from "next/navigation"

const pageTitles: Record<string, string> = {
  "/dashboard": "Vue d'ensemble",
  "/dashboard/team": "Effectif",
  "/dashboard/calendar": "Calendrier",
  "/dashboard/matches": "Matchs",
  "/dashboard/physical": "Physique",
  "/dashboard/intensity": "Intensité",
  "/dashboard/medical": "Médical",
  "/dashboard/duels": "Duels",
  "/dashboard/heatmaps": "Heatmaps",
  "/dashboard/settings": "Paramètres",
  "/dashboard/settings/billing": "Facturation"
}

export function PageHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Vue d'ensemble"

  return (
    <div className="h-16 flex items-center border-b border-gray-800 px-8">
      <h1 className="text-2xl font-semibold text-white">{title}</h1>
    </div>
  )
} 