'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { login } from '@/api/store'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
const registerSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(5, "Senha deve ter mais que 5 caracteres").max(10, "Senha não pode ter mais que 10 caracteres"),
})

export type TLoginSchema = z.infer<typeof registerSchema>

const Login = () => {

    const router = useRouter();
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: TLoginSchema) => {
        try {
            const res = await login(data);
            res.data;
            router.push('/')
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorData = err?.response?.data;
                form.setError(errorData.fieldError, {
                    message: errorData.message
                })
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='h-screen w-screen flex  flex-col  items-center justify-center gap-1 px-4'>
                <h1 className='text-3xl font-semibold pb-6'>Entre na sua conta</h1>
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem className='max-w-md w-full'>
                            <FormLabel>E-mail</FormLabel>
                            <FormControl>
                                <Input placeholder='Digite seu e-mail' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem className='max-w-md w-full'>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input placeholder='Digite sua senha' type='password' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='mt-4'>Entrar</Button>
            </form>
        </Form>
    )
}

export default Login