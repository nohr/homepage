import { create } from "zustand";

interface UIState {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  loaded: false,
  setLoaded: (loaded: boolean) => set({ loaded }),
}));
