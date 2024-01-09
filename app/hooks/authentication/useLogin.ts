import { signIn, validateToken } from "@/api/store";
import { TuseLogin } from "@/app/types/Auth";
import { create } from "zustand";


export const useLogin = create<TuseLogin>((set) => ({
    user: null,
    signIn: async (data) => {
        const { token, user } = await signIn(data)
        console.log(user)
        set({ user, isAuthenticated: true })
        localStorage.setItem('token', token)
    },
    signOut: () => {
        set({ user: null, isAuthenticated: false })
        localStorage.removeItem('token')
    },
    getCurrentUser: async () => {
        const token = localStorage.getItem('token')

        if (!token) {
            set({ user: null, isAuthenticated: false })
        }
        const loggedUser = await validateToken(token as string)
        set({ user: loggedUser, isAuthenticated: true })
    },
    isAuthenticated: false
}))

