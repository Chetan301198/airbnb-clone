import { create } from "zustand";

interface RegisterStore {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegisterModal = create<RegisterStore>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));

export default useRegisterModal;
