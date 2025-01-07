"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelectedTeam } from "@/hooks/useSelectedTeam"

export const availableTeams = [
  "Paris Saint-Germain",
  "Olympique de Marseille",
  "Olympique Lyonnais",
  "AS Monaco",
  "LOSC Lille",
  "Stade Rennais"
]

export function TeamSelector() {
  const { selectedTeam, setSelectedTeam } = useSelectedTeam()

  return (
    <div className="w-[200px]">
      <Select value={selectedTeam} onValueChange={setSelectedTeam}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une équipe" />
        </SelectTrigger>
        <SelectContent>
          {availableTeams.map((team) => (
            <SelectItem key={team} value={team}>
              {team}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
} 