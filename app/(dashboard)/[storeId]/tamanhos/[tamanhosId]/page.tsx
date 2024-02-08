import React from "react";
import SizeForm from "./_components/size-form";
import { cookies } from "next/headers";
import { getSizeById } from "@/api/store";

const page = async ({
  params,
}: {
  params: { storeId: string; tamanhosId: string };
}) => {
  const token = cookies().get("token");

  const size = await getSizeById(
    params.storeId as string,
    params.tamanhosId as string,
    token?.value as string
  );

  return (
    <div>
      <SizeForm initialData={size} />
    </div>
  );
};

export default page;
