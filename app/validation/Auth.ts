import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(5, "Senha deve ter mais que 5 caracteres").max(10, "Senha não pode ter mais que 10 caracteres"),
})

export const registerSchema = z.object({
    email: z.string().email("E-mail inválido"),
    name: z.string().min(4, "Nome deve ter mais que 4 caracteres").max(15, "Nome deve ter menos que 15 caracteres"),
    password: z.string().min(5, "Senha deve ter mais que 5 caracteres").max(10, "Senha não pode ter mais que 10 caracteres"),
})