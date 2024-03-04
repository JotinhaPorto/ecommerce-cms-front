import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./_components/columns";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import SizeClientAddButton from "./_components/size-client-add-button";
import { cookies } from "next/headers";
import { getAllProducts } from "@/api/store";
import { ProductColumn } from "@/app/types/Store";
import { formatarData, formatarMoeda } from "@/lib/utils";

const page = async ({ params }: { params: { storeId: string } }) => {
    const token = cookies().get("token");
    const produtos = await getAllProducts(
        params.storeId as string,
        token?.value as string
    )
    console.log(produtos)
    const produtosFormatados: ProductColumn[] = produtos.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isAvailable: item.isAvailable,
        price: formatarMoeda(item.price),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt: formatarData(item.createdAt)
    }));
    return (
        <div className="px-4">
            <div className="py-5 flex justify-between items-center">
                <div>
                    <Heading
                        title={`Produtos (${produtos?.length})`}
                        description="Gerencie os produtos"
                    />
                </div>
                <SizeClientAddButton />
            </div>
            <Separator className="mb-4" />
            <DataTable searchKey="name" columns={columns} data={produtosFormatados} />
        </div>
    );
};

export default page;
