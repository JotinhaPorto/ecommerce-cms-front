import React from 'react'
import { StoreSwitcher } from './store-switcher'
import { cookies } from 'next/headers'
import { getAllStores } from '@/api/store'
import { Store } from '@/app/types/Store'
import MainNav from './mainnav'
import UserNav from './user-nav'
import { getCurrentUser } from '@/actions/getCurrentUser'

const Navbar = async () => {

    const token = cookies().get("token")

    const stores: Store[] = await getAllStores(token?.value as string)
    const user = await getCurrentUser()


    return (
        <div className='border-b shadow-md px-4 h-14 flex items-center'>
            <StoreSwitcher items={stores} />
            <MainNav className='mx-4' />
            <div className='ml-auto flex items-center'>
                <UserNav user={user} />
            </div>
        </div>
    )
}

export default Navbar