import React from 'react'
import { Button } from './ui/button'
import { logout } from '@/actions/logout'
import { LogOut } from 'lucide-react'

const Logout = () => {
    return (
        <form action={logout}>
            <Button variant="ghost" >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
            </Button>
        </form >
    )
}

export default Logout