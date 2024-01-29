'use server'

import { signIn } from "@/api/store";
import { TLoginSchema } from "@/app/types/Auth";
import { AxiosError } from "axios";
import { cookies } from 'next/headers'

export const signInAction = async (data: TLoginSchema) => {

    const x = await signIn(data)
    if (x instanceof AxiosError) {
        return x.response?.data
    }

    cookies().set("token", x.token)
    return x.user
}