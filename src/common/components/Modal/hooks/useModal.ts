import { create } from 'zustand';

export interface ModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModal = create<ModalState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}));
