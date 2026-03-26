"use client";

import { toErrorMessage } from "@/shared/utils";
import { createStore } from "@/shared/lib/zustand";
import { isTauriRuntime } from "@/shared/lib/tauri";

export type WindowPlaygroundState = {
  error: string;
  clearError: () => void;
  runWindowAction: (action: () => Promise<void>) => void;
};

export const {
  StoreProvider: WindowPlaygroundStoreProvider,
  useShallowPick: useWindowPlaygroundShallowPick,
} = createStore<WindowPlaygroundState>((set) => ({
  error: "",
  clearError: () => set({ error: "" }),
  runWindowAction: (action) => {
    if (!isTauriRuntime()) {
      set({ error: "Tauri 데스크톱 앱에서만 창 API가 동작합니다." });
      return;
    }
    set({ error: "" });
    void action().catch((err: unknown) => set({ error: toErrorMessage(err) }));
  },
}));
