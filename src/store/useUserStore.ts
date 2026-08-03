import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearStoredTokens } from "@/services/apiClient";
import type { User } from "@/types";

interface UserState {
  user: User | null;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  clearSession: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      hasHydrated: false,
      setUser: (user) => set({ user }),
      clearSession: () => {
        clearStoredTokens();
        set({ user: null });
      },
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "ara-user",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
