"use client"

import { useCalendar } from "@/hooks/useCalendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function CalendarPage() {
  const { getAllEvents } = useCalendar()
  const events = getAllEvents()

  return (
    <div className="p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Prochain match</CardTitle>
            <CardDescription>Prochain événement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PSG vs OM</div>
            <p className="text-sm text-gray-400">15 Mars 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Entraînements</CardTitle>
            <CardDescription>Cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-sm text-gray-400">sessions prévues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Récupération</CardTitle>
            <CardDescription>Jours de repos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-sm text-gray-400">jours programmés</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Événements</CardTitle>
            <CardDescription>Cette semaine</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-sm text-gray-400">au total</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Planning de la semaine</CardTitle>
            <CardDescription>Tous les événements à venir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-gray-400">
                        {format(new Date(event.startDate), 'EEEE dd MMMM - HH:mm', { locale: fr })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge
                      variant={
                        event.type === "match"
                          ? "default"
                          : event.type === "training"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {event.type === "match"
                        ? "Match"
                        : event.type === "training"
                        ? "Entraînement"
                        : "Autre"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 