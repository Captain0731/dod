import { create } from "zustand";

type StoreState = Record<string, never>;

export const useStore = create<StoreState>(() => ({}));
