export type StoreListener = () => void;

export type StoreCore<TSnapshot> = {
  getSnapshot: () => TSnapshot;
  subscribe: (listener: StoreListener) => () => void;
  setSnapshot: (nextSnapshot: TSnapshot) => void;
  updateSnapshot: (updater: (prev: TSnapshot) => TSnapshot) => void;
};

export function createStoreCore<TSnapshot>(
  initialSnapshot: TSnapshot,
): StoreCore<TSnapshot> {
  let snapshot = initialSnapshot;
  const listeners = new Set<StoreListener>();

  const notify = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const getSnapshot = () => snapshot;

  const subscribe = (listener: StoreListener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const setSnapshot = (nextSnapshot: TSnapshot) => {
    if (Object.is(nextSnapshot, snapshot)) return;
    snapshot = nextSnapshot;
    notify();
  };

  const updateSnapshot = (updater: (prev: TSnapshot) => TSnapshot) => {
    const nextSnapshot = updater(snapshot);
    setSnapshot(nextSnapshot);
  };

  return {
    getSnapshot,
    subscribe,
    setSnapshot,
    updateSnapshot,
  };
}
