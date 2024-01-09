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
import { register } from '@/api/store'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { TregisterSchema } from '@/app/types/Auth'
import { registerSchema } from '@/app/validation/Auth'





const Register = () => {

    const router = useRouter();
    const form = useForm<TregisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })


    const onSubmit = async (data: TregisterSchema) => {
        try {
            const res = await register(data);
            res.data;
            router.push('/auth/login');
        } catch (err) {
            if (err instanceof AxiosError) {
                const errorData = err?.response?.data;
                form.setError(errorData.fieldError, {
                    message: errorData.message,
                });
            }
        }

    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='h-screen w-screen flex  flex-col  items-center justify-center gap-1 px-4'>
                <h1 className='text-3xl font-semibold pb-6'>Crie sua conta</h1>
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
                    name='name'
                    render={({ field }) => (
                        <FormItem className='max-w-md w-full'>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder='Digite seu nome'  {...field} />
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
                                <Input placeholder='Digite sua senha' type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='mt-4'>Cadastrar</Button>
            </form>
        </Form>
    )
}

export default Register