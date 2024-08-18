// store.js
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useAuthStore = create(
  immer((set) => ({
    isAuthenticated: false,
    walletAddress: null,

    setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
    setWalletAddress: (address: string) => set({ walletAddress: address }),
  }))
);
