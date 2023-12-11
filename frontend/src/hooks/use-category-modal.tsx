import { create } from "zustand";

interface useCategoryModalStore {
  isEdit: boolean;
  categoryId: string;
  categoryName: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCategoryModal = create<useCategoryModalStore>((set) => ({
  isEdit: false,
  categoryId: "",
  categoryName: "",
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
