'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
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
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TLoginSchema } from '@/app/types/Auth'
import { loginSchema } from '@/app/validation/Auth'
import { useLogin } from '@/app/hooks/authentication/useLogin'

const Login = () => {

    const { signIn, isAuthenticated, user } = useLogin()
    const router = useRouter();
    const form = useForm<TLoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: TLoginSchema) => {
        try {
            await signIn(data)
            router.push('/')
        }
        catch (error) {
            if (error instanceof AxiosError) {
                const errorData = error?.response?.data;
                form.setError(errorData.fieldError, {
                    message: errorData.message,
                });
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