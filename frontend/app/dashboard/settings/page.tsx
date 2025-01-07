"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data
const availableTeams = [
  "Paris Saint-Germain",
  "Olympique de Marseille",
  "Olympique Lyonnais",
  "AS Monaco",
  "LOSC Lille",
  "Stade Rennais"
]

const teamPlayers = {
  "Paris Saint-Germain": [
    { id: 1, name: "Kylian Mbappé", position: "Forward" },
    { id: 2, name: "Ousmane Dembélé", position: "Winger" },
    { id: 3, name: "Warren Zaïre-Emery", position: "Midfielder" },
    { id: 4, name: "Marquinhos", position: "Defender" },
    { id: 5, name: "Gianluigi Donnarumma", position: "Goalkeeper" }
  ],
  "Olympique de Marseille": [
    { id: 6, name: "Pierre-Emerick Aubameyang", position: "Forward" },
    { id: 7, name: "Joaquin Correa", position: "Forward" },
    { id: 8, name: "Geoffrey Kondogbia", position: "Midfielder" },
    { id: 9, name: "Chancel Mbemba", position: "Defender" },
    { id: 10, name: "Pau Lopez", position: "Goalkeeper" }
  ]
}

export default function SettingsPage() {
  const [selectedTeam, setSelectedTeam] = useState("Paris Saint-Germain")

  return (
    <div className="p-8">
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="personalization">Personalization</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Preferences</CardTitle>
                <CardDescription>
                  Configure your application's general settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Language</h3>
                      <p className="text-sm text-gray-400">
                        Choose the interface language
                      </p>
                    </div>
                    <select className="bg-[#1F2937] border border-gray-800 rounded-lg px-3 py-2">
                      <option value="fr">French</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Time Zone</h3>
                      <p className="text-sm text-gray-400">
                        Set your time zone
                      </p>
                    </div>
                    <select className="bg-[#1F2937] border border-gray-800 rounded-lg px-3 py-2">
                      <option value="Europe/Paris">Europe/Paris</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Theme</h3>
                      <p className="text-sm text-gray-400">
                        Choose the interface theme
                      </p>
                    </div>
                    <select className="bg-[#1F2937] border border-gray-800 rounded-lg px-3 py-2">
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                      <option value="system">System</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personalization">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Team</CardTitle>
                <CardDescription>
                  Select your favorite team and follow its players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Team</label>
                    <select 
                      className="w-full bg-[#1F2937] border border-gray-800 rounded-lg px-3 py-2"
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                    >
                      {availableTeams.map((team) => (
                        <option key={team} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Followed Players</label>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                        Auto-follow
                      </Badge>
                    </div>
                    <div className="space-y-2 max-h-[300px] overflow-y-auto rounded-lg border border-gray-800 p-2">
                      {teamPlayers[selectedTeam as keyof typeof teamPlayers]?.map((player) => (
                        <div key={player.id} className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                          <div>
                            <p className="font-medium">{player.name}</p>
                            <p className="text-sm text-gray-400">{player.position}</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                            {selectedTeam}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferred Statistics</CardTitle>
                <CardDescription>
                  Choose which statistics to highlight
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "goals", name: "Goals", checked: true },
                    { id: "assists", name: "Assists", checked: true },
                    { id: "possession", name: "Possession", checked: true },
                    { id: "shots", name: "Shots", checked: false },
                    { id: "passes", name: "Passes", checked: false },
                    { id: "tackles", name: "Tackles", checked: false }
                  ].map((stat) => (
                    <div key={stat.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{stat.name}</h3>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={stat.checked}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Email Notifications",
                    description: "Receive updates via email",
                    checked: true
                  },
                  {
                    title: "Push Notifications",
                    description: "Receive push notifications in the app",
                    checked: true
                  },
                  {
                    title: "Match Notifications",
                    description: "Be informed about new matches",
                    checked: true
                  },
                  {
                    title: "Weekly Reports",
                    description: "Receive a weekly summary",
                    checked: false
                  }
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-gray-400">
                        {notification.description}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={notification.checked}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 