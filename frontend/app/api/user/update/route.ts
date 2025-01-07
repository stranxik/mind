import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function PUT(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse("Non autorisé", { status: 401 })
    }

    const data = await request.json()
    const { email, name, currentPassword, newPassword } = data

    // Appel à l'API backend pour mettre à jour l'utilisateur
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${session.accessToken}`
      },
      body: JSON.stringify({
        email,
        name,
        current_password: currentPassword,
        new_password: newPassword
      })
    })

    if (!response.ok) {
      const error = await response.text()
      return new NextResponse(error, { status: response.status })
    }

    const updatedUser = await response.json()
    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("[USER_UPDATE]", error)
    return new NextResponse("Erreur interne", { status: 500 })
  }
} 