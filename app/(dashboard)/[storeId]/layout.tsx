import React from 'react'
type Props = { params: { storeId: string }, children: React.ReactNode }
const page = ({ params, children }: Props) => {
    return (
        <div>page of STORE - {params.storeId}
            {children}
        </div>
    )
}

export default page
