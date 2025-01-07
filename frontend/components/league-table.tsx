import { cn } from "@/lib/utils"

interface TeamStats {
  position: number
  team: string
  played: number
  points: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  form: string[]
}

interface LeagueTableProps {
  teams: TeamStats[]
  className?: string
}

export function LeagueTable({ teams, className }: LeagueTableProps) {
  return (
    <div className={cn("rounded-lg border bg-card", className)}>
      <div className="flex flex-col h-[calc(100vh-240px)]">
        <div className="overflow-x-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="bg-muted/50">
              <tr className="border-b transition-colors">
                <th className="h-12 px-4 text-left align-middle font-medium">Pos</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Équipe</th>
                <th className="h-12 px-4 text-left align-middle font-medium">MJ</th>
                <th className="h-12 px-4 text-left align-middle font-medium">G</th>
                <th className="h-12 px-4 text-left align-middle font-medium">N</th>
                <th className="h-12 px-4 text-left align-middle font-medium">P</th>
                <th className="h-12 px-4 text-left align-middle font-medium">BP</th>
                <th className="h-12 px-4 text-left align-middle font-medium">BC</th>
                <th className="h-12 px-4 text-left align-middle font-medium">DB</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Pts</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Forme</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {teams.map((team) => (
                <tr
                  key={team.position}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    team.position <= 3 ? "bg-green-50/10" : "",
                    team.position >= 17 ? "bg-red-50/10" : ""
                  )}
                >
                  <td className="p-4 align-middle">{team.position}</td>
                  <td className="p-4 align-middle font-medium">{team.team}</td>
                  <td className="p-4 align-middle">{team.played}</td>
                  <td className="p-4 align-middle">{team.won}</td>
                  <td className="p-4 align-middle">{team.drawn}</td>
                  <td className="p-4 align-middle">{team.lost}</td>
                  <td className="p-4 align-middle">{team.goalsFor}</td>
                  <td className="p-4 align-middle">{team.goalsAgainst}</td>
                  <td className="p-4 align-middle">{team.goalDifference}</td>
                  <td className="p-4 align-middle font-bold">{team.points}</td>
                  <td className="p-4 align-middle">
                    <div className="flex gap-1">
                      {team.form.map((result, index) => (
                        <div
                          key={index}
                          className={cn(
                            "w-6 h-6 flex items-center justify-center rounded-sm text-xs font-medium text-white",
                            result === "W" ? "bg-green-500" :
                            result === "D" ? "bg-yellow-500" :
                            "bg-red-500"
                          )}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 