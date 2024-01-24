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

export const getProfile = async (userToken: string) => {
    const response = await req.get('/auth/profile', { headers: { Authorization: `Bearer ${userToken}` } })
    console.log(response)
    console.log(response.data)
    return response.data.loggedUser
}

export const getStore = async (userToken: string) => {
    const response = await req.get("/store", { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}

export const getAllStores = async (userToken: string) => {
    const response = await req.get("/store/all", { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}

export const createStore = async (data: any, userToken: string) => {
    const response = await req.post("/store/create", data, { headers: { Authorization: `Bearer ${userToken}` } })
    console.log(response.data)
    return response.data
}

