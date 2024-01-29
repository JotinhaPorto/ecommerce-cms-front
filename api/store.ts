import { req } from '@/api/axios'
import { TLoginSchema, TregisterSchema } from '@/app/types/Auth'
import { AxiosError } from 'axios'

export const register = async (data: TregisterSchema) => {
    const response = await req.post('/auth/register', data)
    return response.data
}

export const signIn = async (data: TLoginSchema) => {
    try {
        const response = await req.post('/auth/login', data)
        return response.data
    }
    catch (error) {
        return error
    }
}

export const getProfile = async (userToken: string) => {
    const response = await req.get('/auth/profile', { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data.loggedUser
}

export const getStore = async (userToken: string) => {
    const response = await req.get("/store", { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}
export const getStoreByStoreId = async (storeId: string, userToken: string) => {
    const response = await req.get(`/store/${storeId}`, { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}

export const getAllStores = async (userToken: string) => {
    const response = await req.get("/store/all", { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}

export const createStore = async (data: any, userToken: string) => {
    const response = await req.post("/store/create", data, { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}

export const editStore = async (data: any, idStore: string, userToken: string) => {
    const response = await req.patch(`/store/${idStore}`, data, { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}
export const deleteStore = async (idStore: string, userToken: string) => {
    const response = await req.delete(`/store/${idStore}`, { headers: { Authorization: `Bearer ${userToken}` } })
    return response.data
}
