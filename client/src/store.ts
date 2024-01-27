import { create } from "zustand";

interface AppStore {
  open: boolean;
  setOpen: (open: boolean) => void;

  billTotal: number;
  setBillTotal: (billTotal: number) => void;

  paymentModalOpen: boolean;
  setPaymentModalOpen: (open: boolean) => void;

  billItems: Product[];
  setBillItems: (item: Product) => void;
  deleteBillItem: (productId: string) => void
}

export const useAppStore = create<AppStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),

  billTotal: 0,
  setBillTotal: (billTotal) => set({ billTotal }),

  paymentModalOpen: false,
  setPaymentModalOpen: (open) => set({ paymentModalOpen: open }),

  billItems: [],
  setBillItems: (item) =>
    set((state) => ({ billItems: [...state.billItems!, item] })),
    deleteBillItem: (productId) =>
    set((state) => ({ billItems: state.billItems?.filter((product) => product._id !== productId) })),
}));
