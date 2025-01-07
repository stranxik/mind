"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { teams } from "@/data/teams"

interface TeamSelectProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function TeamSelect({ value, onChange, disabled }: TeamSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Grouper et filtrer les équipes
  const groupedTeams = React.useMemo(() => {
    const teamsToShow = searchQuery
      ? teams.filter(team => 
          team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          team.aliases.some(alias => 
            alias.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      : teams

    return teamsToShow.reduce((acc, team) => {
      if (!acc[team.country]) {
        acc[team.country] = []
      }
      acc[team.country].push(team)
      return acc
    }, {} as Record<string, typeof teams>)
  }, [searchQuery])

  const handleSelect = React.useCallback((teamId: string) => {
    onChange(teamId)
    setOpen(false)
    setSearchQuery("")
  }, [onChange])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between pl-3 text-left font-normal"
          disabled={disabled}
        >
          {value
            ? teams.find((team) => team.id === value)?.name
            : "Sélectionner une équipe..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div className="mb-2">
          <Input
            placeholder="Rechercher une équipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="max-h-[300px] overflow-y-auto">
          {Object.entries(groupedTeams).map(([country, countryTeams]) => (
            <div key={country}>
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
                {country}
              </div>
              {countryTeams.map((team) => (
                <div
                  key={team.id}
                  onClick={() => handleSelect(team.id)}
                  className={cn(
                    "flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer",
                    "hover:bg-accent hover:text-accent-foreground",
                    value === team.id && "bg-accent"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === team.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-grow">{team.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {team.league}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {Object.keys(groupedTeams).length === 0 && (
            <div className="px-2 py-4 text-sm text-center text-muted-foreground">
              Aucune équipe trouvée.
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
} 