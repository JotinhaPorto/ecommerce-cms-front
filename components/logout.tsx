import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/actions/logout'
import { LogOut } from 'lucide-react'

const Logout = () => {
    return (
        <form action={logout} className='flex w-full'>
            <Button variant="ghost" className='w-full justify-start'>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
            </Button>
        </form >
    )
}

export default Logout