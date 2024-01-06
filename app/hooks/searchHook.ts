import { create } from "zustand";

interface SearchStore {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearchModal = create<SearchStore>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));

export default useSearchModal;
