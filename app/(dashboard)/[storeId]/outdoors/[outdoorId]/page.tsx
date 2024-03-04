import React from "react";
import { cookies } from "next/headers";
import { getBillboardById } from "@/api/store";
import OutdoorForm from "./_components/outdoor-form";

const page = async ({
    params,
}: {
    params: { storeId: string; outdoorId: string };
}) => {
    const token = cookies().get("token");

    const billboard = await getBillboardById(
        params.storeId as string,
        params.outdoorId as string,
        token?.value as string
    );
    console.log(billboard);
    return (
        <div>
            <OutdoorForm initialData={billboard} />
        </div>
    );
};

export default page;
