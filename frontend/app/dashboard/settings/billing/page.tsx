"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BillingPage() {
  return (
    <div className="p-8">
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>Your current subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="text-sm text-gray-400">Billed annually</p>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold">$99 <span className="text-sm font-normal text-gray-400">/month</span></p>
              <p className="mt-2 text-sm text-gray-400">Next renewal on April 15, 2024</p>
            </div>
            <div className="mt-6">
              <h4 className="font-medium mb-2">Included features:</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>✓ Unlimited statistics access</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Priority support</li>
                <li>✓ Custom exports</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-[#1F2937] rounded flex items-center justify-center">
                  <span className="text-xs font-medium">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-400">Expires 03/2025</p>
                </div>
              </div>
              <Badge>Default</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>Your recent invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "March 1, 2024", amount: "$99", status: "Paid" },
                { date: "February 1, 2024", amount: "$99", status: "Paid" },
                { date: "January 1, 2024", amount: "$99", status: "Paid" },
              ].map((invoice, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg">
                  <div>
                    <p className="font-medium">Invoice #{2024001 + index}</p>
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