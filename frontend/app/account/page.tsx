"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useUserPreferences } from "@/hooks/useUserPreferences"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function AccountPage() {
  const { preferences, loading, updatePreferences } = useUserPreferences()

  if (loading) {
    return <div className="p-6"><Skeleton className="h-[400px]" /></div>
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Default Views</h2>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <label>Favorite League</label>
                <Select
                  value={preferences?.defaultLeague}
                  onValueChange={(value) => 
                    updatePreferences({ defaultLeague: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select league" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ligue1">Ligue 1</SelectItem>
                    <SelectItem value="premierLeague">Premier League</SelectItem>
                    <SelectItem value="laLiga">La Liga</SelectItem>
                    <SelectItem value="serieA">Serie A</SelectItem>
                    <SelectItem value="bundesliga">Bundesliga</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label>Favorite Team</label>
                <Select
                  value={preferences?.defaultTeam}
                  onValueChange={(value) => 
                    updatePreferences({ defaultTeam: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Équipes dynamiques basées sur la ligue sélectionnée */}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label>Followed Players</label>
                <div className="space-y-2">
                  {preferences?.followedPlayers?.map((player) => (
                    <div key={player.id} className="flex items-center justify-between">
                      <span>{player.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newPlayers = preferences.followedPlayers.filter(
                            (p) => p.id !== player.id
                          )
                          updatePreferences({ followedPlayers: newPlayers })
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Display Settings</h2>
            {/* Autres préférences d'affichage */}
          </Card>
        </TabsContent>

        {/* Autres onglets */}
      </Tabs>
    </div>
  )
} 