import { getStoreByStoreId } from '@/api/store'
import Settings from '@/components/settings'
import React from 'react'
import { cookies } from 'next/headers'
const page = async ({ params }: { params: { storeId: string } }) => {

    const token = cookies().get("token")
    const store = await getStoreByStoreId(params.storeId, token?.value as string)

    return (
        <div>
            <Settings initialData={store} />
        </div>
    )
}

export default page