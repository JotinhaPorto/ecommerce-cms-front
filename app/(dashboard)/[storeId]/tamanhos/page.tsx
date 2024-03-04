import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./_components/columns";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import SizeClientAddButton from "./_components/size-client-add-button";
import { cookies } from "next/headers";
import { getAllSizes } from "@/api/store";

const page = async ({ params }: { params: { storeId: string } }) => {
  const token = cookies().get("token");
  const sizes = await getAllSizes(
    params.storeId as string,
    token?.value as string
  );

  return (
    <div className="px-4">
      <div className="py-5 flex justify-between items-center">
        <div>
          <Heading
            title={`Tamanhos (${sizes.length})`}
            description="Gerencie os tamanhos dos produtos"
          />
        </div>
        <SizeClientAddButton />
      </div>
      <Separator className="mb-4" />
      <DataTable searchKey="name" columns={columns} data={sizes} />
    </div>
  );
};

export default page;
