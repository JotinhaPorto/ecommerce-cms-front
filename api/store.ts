import { req } from '@/api/axios'
import { TregisterSchema } from '@/app/auth/register/page'
import { TLoginSchema } from '@/app/auth/login/page'

export const register = async (data: TregisterSchema) => {
    const response = await req.post('/auth/register', data)
    return response.data
}

export const login = async (data: TLoginSchema) => {
    const response = await req.post('/auth/login', data)
    return response.data
}