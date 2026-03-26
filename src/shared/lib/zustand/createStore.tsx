import { createContext, useContext, useRef, type ReactNode } from "react";
import { useStore } from "zustand/react";
import { useShallow } from "zustand/shallow";
import {
  createStore as createZustandStore,
  type StoreApi,
} from "zustand/vanilla";

type VanillaStateCreator<S> = (
  set: StoreApi<S>["setState"],
  get: StoreApi<S>["getState"],
) => S;

type PickFromKeys<S extends object, K extends readonly (keyof S & string)[]> = {
  [P in K[number]]: S[P];
};

/** React Context + zustand vanilla 스토어 + shallow pick 훅을 한 번에 만듭니다. */
export function createStore<S extends Record<string, unknown>>(
  initializer: VanillaStateCreator<S>,
) {
  const StoreContext = createContext<StoreApi<S> | null>(null);

  function StoreProvider({ children }: { children: ReactNode }) {
    const storeRef = useRef<StoreApi<S> | null>(null);
    if (storeRef.current === null) {
      storeRef.current = createZustandStore(initializer);
    }
    return (
      <StoreContext.Provider value={storeRef.current}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStoreApi(): StoreApi<S> {
    const api = useContext(StoreContext);
    if (api === null) {
      throw new Error("StoreProvider가 트리 상위에 없습니다.");
    }
    return api;
  }

  function useShallowPick<const K extends readonly (keyof S & string)[]>(
    keys: K,
  ): PickFromKeys<S, K> {
    const api = useStoreApi();
    return useStore(
      api,
      useShallow((state: S) => {
        const partial: Record<string, unknown> = {};
        for (const key of keys) {
          partial[key] = state[key];
        }
        function isPickFromKeys(
          partial: Record<string, unknown>,
        ): partial is PickFromKeys<S, K> {
          void partial;
          return true;
        }
        if (isPickFromKeys(partial)) {
          return partial;
        }
        throw new Error("useShallowPick: 불변식 위반");
      }),
    );
  }

  return { StoreProvider, useStoreApi, useShallowPick };
}
