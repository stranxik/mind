import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const session = await auth()
    
    // Appel au backend pour invalider le token
    if (session?.accessToken) {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${session.accessToken}`
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SIGNOUT_ERROR]", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
} 