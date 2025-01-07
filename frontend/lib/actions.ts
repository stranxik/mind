'use server'

import { signIn } from "@/auth"

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      username: formData.get('identifier'),
      password: formData.get('password'),
      redirect: false,
    })
  } catch (error) {
    if (error) {
      return { error: 'Invalid credentials' }
    }
    throw error
  }
} 