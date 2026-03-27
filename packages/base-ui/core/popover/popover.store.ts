import {
  createSurfaceStore,
  type SurfaceSnapshot,
  type SurfaceStore,
} from "../surface";

export type PopoverSurface = "menu" | "settings";

export type PopoverStoreSnapshot = SurfaceSnapshot<PopoverSurface>;

export type PopoverStore = {
  getSnapshot: () => PopoverStoreSnapshot;
  subscribe: SurfaceStore<PopoverSurface>["subscribe"];
  openMenu: () => void;
  closeMenu: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  toggleByEscape: () => void;
};

export const createPopoverStore = (
  initialState: PopoverStoreSnapshot = { activeSurface: null },
): PopoverStore => {
  const surfaceStore = createSurfaceStore<PopoverSurface>(initialState);

  return {
    getSnapshot: surfaceStore.getSnapshot,
    subscribe: surfaceStore.subscribe,
    openMenu: () => surfaceStore.open("menu"),
    closeMenu: () => surfaceStore.close(),
    openSettings: () => surfaceStore.open("settings"),
    closeSettings: () => surfaceStore.close(),
    toggleByEscape: () => {
      const current = surfaceStore.getSnapshot().activeSurface;
      if (current === "settings") {
        surfaceStore.close();
        return;
      }
      if (current === "menu") {
        surfaceStore.close();
        return;
      }
      surfaceStore.open("menu");
    },
  };
};
