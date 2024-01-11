import { create } from 'zustand'
import { UseModal } from '../types/Modal'



export const useModal = create<UseModal>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}))