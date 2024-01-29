
import { getStore } from "@/api/store"
import { cookies } from 'next/headers'
import { redirect } from "next/navigation"
type LayoutProps = {
    children: React.ReactNode
}


const layout = async ({ children }: LayoutProps) => {


    const cookie = cookies().get("token")

    if (!cookie) {
        redirect("/auth/login")
    }

    const store = await getStore(cookie?.value as string)

    if (store) {
        redirect(`/${store.id}`)
    }





    return (
        <>
            {children}
        </>
    )
}

export default layout

