'use client'
import React, { useState } from 'react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Trash } from 'lucide-react'
import { Heading } from './heading'
import { SettingsFormValues, Store } from '@/app/types/Store'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form'
import { StoreFormSchema } from '@/app/validation/Store'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertModal } from './modal/alert-modal'
import { useParams, useRouter } from 'next/navigation'
import { deleteStore, editStore } from '@/api/store'
import { destroyCookie, parseCookies } from 'nookies'
import { useToast } from './ui/use-toast'
import { cn } from '@/lib/utils'
import { AxiosError } from 'axios'
import { logout } from '@/actions/logout'
type SettingsProps = {
    initialData?: Store
}


const Settings = ({ initialData }: SettingsProps) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const params = useParams()
    const { token } = parseCookies()
    const onSubmit = async (data: SettingsFormValues) => {
        try {
            await editStore(data, params.storeId as string, token as string)
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: 'Loja editada com sucesso!'
            })
            router.refresh();
        }
        catch (error) {
            if (error instanceof AxiosError) {
                const errorData = error?.response?.data
                form.setError(errorData.fieldError, {
                    message: errorData.message
                })
            }
        }
    }


    const form = useForm<SettingsFormValues>({
        resolver: zodResolver(StoreFormSchema),
        defaultValues: initialData
    })


    const onDelete = async () => {
        try {
            setLoading(true)
            await deleteStore(params.storeId as string, token as string)
            toast({
                className: cn(
                    'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4'
                ),
                description: "Loja excluída com sucesso!",
            })
            router.push("/");
        }
        catch (error) {
            if (error instanceof AxiosError) {
                const errorData = error?.response?.data
                form.setError(errorData.fieldError, {
                    message: errorData.message
                })
            }
        }
        finally {
            setLoading(false);
            setOpen(false);
        }
    }

    const { toast } = useToast()



    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className='px-4'>
                <div className='py-5 flex justify-between items-center'>
                    <div>
                        <Heading title='Configurações da loja' description='Gerencie o nome da loja' />
                    </div>
                    <Button variant='destructive' onClick={() => setOpen(true)}>
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full pt-4">
                        <div className="grid grid-cols-3 gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Store name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="ml-auto" type="submit">
                            Salvar alterações
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default Settings