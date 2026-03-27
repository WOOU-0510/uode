"use client";

import { createStore } from "@/shared/lib/zustand";
import type { IconName } from "@/shared/lib/icons";

export type IconPlaygroundSetting = {
  color: string;
  sizePx: number;
};

const buildInitialSettings = (): Record<IconName, IconPlaygroundSetting> => {
  return {
    react: { color: "#149eca", sizePx: 48 },
    tauri: { color: "#ffc131", sizePx: 48 },
    vite: { color: "#646cff", sizePx: 48 },
  };
};

export type IconPlaygroundState = {
  settings: Record<IconName, IconPlaygroundSetting>;
  updateIcon: (name: IconName, patch: Partial<IconPlaygroundSetting>) => void;
};

export const {
  StoreProvider: IconPlaygroundStoreProvider,
  useShallowPick: useIconPlaygroundShallowPick,
} = createStore<IconPlaygroundState>((set) => ({
  settings: buildInitialSettings(),
  updateIcon: (name, patch) =>
    set((s) => {
      const current = s.settings[name];
      return {
        settings: {
          ...s.settings,
          [name]: {
            color: patch.color ?? current.color,
            sizePx: patch.sizePx ?? current.sizePx,
          },
        },
      };
    }),
}));
