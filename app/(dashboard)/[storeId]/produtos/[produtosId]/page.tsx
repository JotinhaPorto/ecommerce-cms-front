import React from 'react'
import ProductForm from './_components/product-form'
import { getAllCategories, getAllColors, getAllSizes, getCategoryById, getProductById } from '@/api/store'
import { cookies } from 'next/headers';

const page = async ({
    params,
}: {
    params: { storeId: string; produtosId: string };
}) => {
    const token = cookies().get("token");
    const produto = await getProductById(params.storeId, params.produtosId, token?.value as string).catch(error => console.log(error))
    const cores = await getAllColors(params.storeId, token?.value as string)
    const tamanhos = await getAllSizes(params.storeId, token?.value as string)
    const categorias = await getAllCategories(params.storeId, token?.value as string)
    
    return (
        <div>
            <ProductForm initialData={produto} categories={categorias} colors={cores} sizes={tamanhos} />
        </div>
    )
}

export default page