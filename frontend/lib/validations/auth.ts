import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email invalide",
  }),
  password: z.string().min(4, {
    message: "Le mot de passe doit contenir au moins 4 caractères",
  }),
})

export const registerSchema = z.object({
  email: z.string().email({
    message: "Email invalide",
  }),
  password: z.string().min(4, {
    message: "Le mot de passe doit contenir au moins 4 caractères",
  }),
  confirmPassword: z.string(),
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
}) 