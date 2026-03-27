import {
  createStoreCore,
  type StoreCore,
} from "../store";

export type SurfaceSnapshot<TSurface extends string> = {
  activeSurface: TSurface | null;
};

export type SurfaceStore<TSurface extends string> = {
  getSnapshot: () => SurfaceSnapshot<TSurface>;
  subscribe: StoreCore<SurfaceSnapshot<TSurface>>["subscribe"];
  open: (surface: TSurface) => void;
  close: () => void;
  toggle: (surface: TSurface) => void;
  isOpen: (surface: TSurface) => boolean;
};

export function createSurfaceStore<TSurface extends string>(
  initialState: SurfaceSnapshot<TSurface> = { activeSurface: null },
): SurfaceStore<TSurface> {
  const storeCore = createStoreCore(initialState);

  const setActiveSurface = (activeSurface: TSurface | null) => {
    const current = storeCore.getSnapshot().activeSurface;
    if (current === activeSurface) return;
    storeCore.updateSnapshot((prev) => ({ ...prev, activeSurface }));
  };

  return {
    getSnapshot: storeCore.getSnapshot,
    subscribe: storeCore.subscribe,
    open: (surface) => setActiveSurface(surface),
    close: () => setActiveSurface(null),
    toggle: (surface) => {
      if (storeCore.getSnapshot().activeSurface === surface) {
        setActiveSurface(null);
        return;
      }
      setActiveSurface(surface);
    },
    isOpen: (surface) => storeCore.getSnapshot().activeSurface === surface,
  };
}
