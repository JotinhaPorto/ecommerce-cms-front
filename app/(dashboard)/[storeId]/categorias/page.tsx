import { getAllBillboards, getAllCategories } from '@/api/store';
import { Heading } from '@/components/heading';
import { cookies } from 'next/headers';
import React from 'react'
import SizeClientAddButton from './_components/size-client-add-button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './_components/columns';

const page = async ({ params }: { params: { storeId: string } }) => {

    const token = cookies().get("token");
    const categories = await getAllCategories(
        params.storeId as string,
        token?.value as string
    );

    return (
        <div className="px-4">
            <div className="py-5 flex justify-between items-center">
                <div>
                    <Heading
                        title={`Categorias (${categories.length})`}
                        description="Gerencie as categorias da sua loja"
                    />
                </div>
                <SizeClientAddButton />
            </div>
            <Separator className="mb-4" />
            <DataTable searchKey="name" columns={columns} data={categories} />
        </div>
    )
}

export default page