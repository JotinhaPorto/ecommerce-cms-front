/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useEffect } from "react"
import { useModal } from "../hooks/useModal"
import StoreModal from "@/components/modal/store-modal"

const page = () => {
    const onOpen = useModal((state) => state.openModal)
    const isOpen = useModal((state) => state.isOpen)

    useEffect(() => {
        if (!isOpen) {
            onOpen()
        }

    }, [isOpen, onOpen])

    return (
        <div>
            <StoreModal />
        </div>
    )
}

export default page