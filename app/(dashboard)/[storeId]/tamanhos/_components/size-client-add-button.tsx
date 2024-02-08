"use client"
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const SizeClientAddButton = () => {

    const router = useRouter()
    const params = useParams()


    return (
        <Button onClick={() => router.push(`/${params.storeId}/tamanhos/new`)} >
            <Plus className="h-4 w-4 mr-2" />
            Criar
        </Button>
    )
}

export default SizeClientAddButton