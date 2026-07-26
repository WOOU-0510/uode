import * as React from "react";

type SubscribableStore<TSnapshot> = {
  readonly getSnapshot: () => TSnapshot;
  readonly subscribe: (listener: () => void) => () => void;
};

type StoreState<TStore, TSnapshot> = {
  readonly store: TStore;
  readonly snapshot: TSnapshot;
};

export const useStoreSnapshot = <
  TSnapshot,
  TStore extends SubscribableStore<TSnapshot>,
>(
  createStore: () => TStore,
): StoreState<TStore, TSnapshot> => {
  const stateRef = React.useRef<{
    readonly serverSnapshot: TSnapshot;
    readonly store: TStore;
  } | null>(null);

  if (stateRef.current === null) {
    const store = createStore();
    stateRef.current = {
      serverSnapshot: store.getSnapshot(),
      store,
    };
  }

  const { serverSnapshot, store } = stateRef.current;
  const getServerSnapshot = React.useCallback(
    () => serverSnapshot,
    [serverSnapshot],
  );
  const snapshot = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerSnapshot,
  );

  return { snapshot, store };
};
