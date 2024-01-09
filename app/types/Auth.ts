import { z } from "zod"
import { loginSchema, registerSchema } from "../validation/Auth"

export type User = {
    id: string;
    email: string;
    name: string;
    hashedPassword?: string;
    image: string | null;
    createdAt: string;
    updatedAt: string;
} & { token?: string }


export type TuseLogin = {
    user: User | null;
    signIn: (data: TLoginSchema) => Promise<void>;
    signOut: () => void;
    getCurrentUser: () => Promise<void>;
    isAuthenticated: boolean
}

export type TLoginSchema = z.infer<typeof loginSchema>
export type TregisterSchema = z.infer<typeof registerSchema>