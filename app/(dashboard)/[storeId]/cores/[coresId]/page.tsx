import React from 'react'
import ColorForm from './_components/color-form'
import { cookies } from 'next/headers'
import { getColorById } from '@/api/store'

const page = async ({ params }: { params: { storeId: string, coresId: string } }) => {

    const token = cookies().get("token")

    const color = await getColorById(params.storeId as string, params.coresId as string, token?.value as string)

    return (
        <div>
            <ColorForm initialData={color} />
        </div>
    )
}

export default page