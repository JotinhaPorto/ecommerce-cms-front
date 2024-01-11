export type UseModal = {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export type ModalProps = {
    children: React.ReactNode;
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
}
