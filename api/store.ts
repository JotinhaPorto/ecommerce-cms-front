import { req } from '@/api/axios'
import { TLoginSchema, TregisterSchema, User } from '@/app/types/Auth'

export const register = async (data: TregisterSchema) => {
    const response = await req.post('/auth/register', data)
    return response.data
}

export const signIn = async (data: TLoginSchema) => {
    const response = await req.post('/auth/login', data)
    return response.data
}

export const validateToken = async (userToken: string) => {
    const response = await req.get('/auth/profile', {headers: {Authorization: `Bearer ${userToken}`}})
    return response.data.loggedUser
}