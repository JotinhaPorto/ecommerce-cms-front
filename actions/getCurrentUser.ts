import { getProfile } from "@/api/store"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getCurrentUser = async () => {
    const cookie = cookies().get("token")

    if (!cookie) {
        redirect("/auth/login")
    }
    const user = await getProfile(cookie?.value as string)

    return user
}

