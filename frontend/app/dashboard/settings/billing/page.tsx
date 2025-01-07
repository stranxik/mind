"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BillingPage() {
  return (
    <div className="p-8">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Plan actuel</CardTitle>
            <CardDescription>Votre abonnement actuel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-sm text-gray-400">Facturé annuellement</p>
              </div>
              <Badge variant="secondary">Actif</Badge>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">99€ <span className="text-sm font-normal text-gray-400">/mois</span></p>
              <p className="mt-2 text-sm text-gray-400">Prochain renouvellement le 15 avril 2024</p>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Fonctionnalités incluses :</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Accès illimité aux statistiques</li>
                <li>✓ Analyses avancées</li>
                <li>✓ Support prioritaire</li>
                <li>✓ Exports personnalisés</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Moyen de paiement</CardTitle>
            <CardDescription>Gérez vos informations de paiement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-[#1F2937] rounded flex items-center justify-center">
                  <span className="text-xs font-medium">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-400">Expire en 03/2025</p>
                </div>
              </div>
              <Badge>Par défaut</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historique de facturation</CardTitle>
            <CardDescription>Vos dernières factures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "1 mars 2024", amount: "99€", status: "Payé" },
                { date: "1 février 2024", amount: "99€", status: "Payé" },
                { date: "1 janvier 2024", amount: "99€", status: "Payé" },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                  <div>
                    <p className="font-medium">Facture #{2024001 + index}</p>
                    <p className="text-sm text-gray-400">{invoice.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-medium">{invoice.amount}</p>
                    <Badge variant="outline">{invoice.status}</Badge>
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