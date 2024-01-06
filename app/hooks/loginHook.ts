import { create } from "zustand";

interface LoginStore {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginStore>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));

export default useLoginModal;
