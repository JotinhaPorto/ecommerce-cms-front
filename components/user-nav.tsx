import React from 'react'

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserFromUserNav } from '@/app/types/Auth'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

type UserNavProps = {
    user: UserFromUserNav;
}

const UserNav = ({ user }: UserNavProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align='end'>
                <DropdownMenuLabel className='flex'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className='ml-2'>
                        <h1 className='text-sm'>{user.name}</h1>
                        <span className='text-xs text-muted-foreground'>{user.email}</span>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuItem className='cursor-pointer'>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

export default UserNav


