'use client'
import React, { useEffect } from 'react'
import { useLogin } from '../hooks/authentication/useLogin'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
    const { getCurrentUser, user, signOut } = useLogin()

    const logout = () => {
        signOut()
        router.push('/auth/login')
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await getCurrentUser();
            } catch (error) {
                router.push('/auth/login')
            }
        };

        fetchCurrentUser();
    }, [getCurrentUser]);

    return (
        <div>page of ROOT {user?.email} {user?.name}
            <button className='bg-red-500 p-2 rounded' onClick={logout}>Sair</button>
        </div>
    )
}

export default page