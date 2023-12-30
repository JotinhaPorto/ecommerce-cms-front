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

const registerSchema = z.object({
    email: z.string().email("E-mail inválido"),
    name: z.string().min(4, "Nome deve ter mais que 4 caracteres").max(15, "Nome deve ter menos que 15 caracteres"),
    password: z.string().min(5, "Senha deve ter mais que 5 caracteres").max(10, "Senha não pode ter mais que 10 caracteres"),
})

type TregisterSchema = z.infer<typeof registerSchema>

const Register = () => {

    const form = useForm<TregisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            name: "",
            password: ""
        }
    })

    const onSubmit = (data: TregisterSchema) => {
        console.log(data)
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
                                <Input placeholder='Digite seu nome' {...field} />
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
                                <Input placeholder='Digite sua senha' {...field} />
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