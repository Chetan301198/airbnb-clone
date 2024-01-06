import { create } from "zustand";

interface RentStore {
  show: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<RentStore>((set) => ({
  show: false,
  onOpen: () => set({ show: true }),
  onClose: () => set({ show: false }),
}));

export default useRentModal;
