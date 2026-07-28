"use client";

import type { IconName } from "@uode/base-ui-react/icons/registry";
import { createStore } from "@/shared/lib/zustand";

export type IconPlaygroundSetting = {
  color: string;
  sizePx: number;
};

const buildInitialSettings = (): Record<IconName, IconPlaygroundSetting> => {
  const settings = {
    arrow_range: { color: "#5a6478", sizePx: 48 },
    folder_filled: { color: "#5a6478", sizePx: 48 },
    folder_outlined: { color: "#5a6478", sizePx: 48 },
    folder_round: { color: "#5a6478", sizePx: 48 },
    folder_sharp: { color: "#5a6478", sizePx: 48 },
    folder_twotone: { color: "#5a6478", sizePx: 48 },
    react: { color: "#149eca", sizePx: 48 },
    tauri: { color: "#ffc131", sizePx: 48 },
    vite: { color: "#646cff", sizePx: 48 },
  } satisfies Record<IconName, IconPlaygroundSetting>;
  return settings;
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
