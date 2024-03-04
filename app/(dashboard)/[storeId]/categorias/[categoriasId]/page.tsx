import { getAllBillboards, getCategoryById } from '@/api/store';
import { cookies } from 'next/headers';
import React from 'react'
import CategoryForm from './_components/categoryForm';

const page = async ({
    params,
}: {
    params: { storeId: string; categoriasId: string };
}) => {
    const token = cookies().get("token");
    const category = await getCategoryById(
        params.storeId,
        params.categoriasId,
        token?.value as string
    )
    const billboards = await getAllBillboards(
        params.storeId as string,
        token?.value as string
    );
    return (
        <div>
            <CategoryForm initialData={category} billboards={billboards} />
        </div>
    )
}

export default page