"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { AlertModal } from "@/components/modal/alert-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Billboard, Category, CategoryFormValues } from '@/app/types/Store';
import { CategoryFormSchema } from '@/app/validation/Store';
import { createCategory, deleteCategory, updateCategory } from '@/api/store';
import { AxiosError } from 'axios';

type CategoryProps = {
    initialData: Category | null;
    billboards: Billboard[]
}
const CategoryForm = ({ initialData, billboards }: CategoryProps) => {

    const { toast } = useToast()

    const params = useParams();
    const router = useRouter();

    const title = initialData ? "Atualizar categoria" : "Criar categoria";
    const description = initialData
        ? "Atualize a categoria"
        : "Crie uma nova categoria";
    const toastMessage = initialData
        ? "Categoria atualizada com sucesso!"
        : "Categoria criada com sucesso!";
    const action = initialData ? "Atualizar" : "Criar";


    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(CategoryFormSchema),
        defaultValues: initialData || {
            name: "",
            billboardId: "",
        },
    });

    const onSubmit = async (data: CategoryFormValues) => {
        console.log(data)

        try {
            if (initialData) {
                await updateCategory(data, params.storeId as string, params.categoriasId as string)
            } else {
                await createCategory(data, params.storeId as string)
            }
            toast({
                className: cn(
                    "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
                ),
                description: toastMessage,
            });
            router.refresh();
            router.push(`/${params.storeId}/categorias`);
        }
        catch (error) {
            console.log(error);
        }

    }
    const onDelete = async () => {
        try {
            await deleteCategory(params.storeId as string, params.categoriasId as string);
            toast({
                className: cn(
                    "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
                ),
                description: "Categoria deletada com sucesso!",
            });
            router.refresh();
            router.push(`/${params.storeId}/categorias`);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast({
                    className: cn(
                        "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
                    ),
                    description: `${error.response!.data.message}`,
                });
            }
        }
    }
    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={false}
            />
            <div className="px-4">
                <div className="py-5 flex justify-between items-center">
                    <div>
                        <Heading title={title} description={description} />
                    </div>
                    {initialData && (
                        <Button variant="destructive" onClick={() => setOpen(true)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    )}
                </div>
                <Separator />
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 pt-3 max-w-sm"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="billboardId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue defaultValue={field.value} placeholder="Selecione um outdoor" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {billboards.map((billboard) => (
                                                <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                        <FormMessage />
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">{action}</Button>
                    </form>
                </Form>
            </div >
        </>
    )
}

export default CategoryForm