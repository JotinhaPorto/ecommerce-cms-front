import Navbar from '@/components/navbar'
import React from 'react'
type Props = { params: { storeId: string }, children: React.ReactNode }
const page = ({ params, children }: Props) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default page
