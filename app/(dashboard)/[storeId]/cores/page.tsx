import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { columns } from "./_components/columns";
import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import ColorClientAddButton from "./_components/color-client-add-button";
import { cookies } from "next/headers";
import { getAllColors } from "@/api/store";

const page = async ({ params }: { params: { storeId: string } }) => {
  const token = cookies().get("token");
  const colors = await getAllColors(
    params.storeId as string,
    token?.value as string
  );
  return (
    <div className="px-4">
      <div className="py-5 flex justify-between items-center">
        <div>
          <Heading
            title={`Cores (${colors.length})`}
            description="Gerencie as cores dos produtos"
          />
        </div>
        <ColorClientAddButton />
      </div>
      <Separator className="mb-4" />
      <DataTable searchKey="name" columns={columns} data={colors} />
    </div>
  );
};

export default page;
