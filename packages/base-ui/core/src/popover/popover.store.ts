import {
  createStoreCore,
  type StoreCore,
} from "../store";

/** 패널을 교체할지 스택에 쌓을지 결정합니다. */
export type PopoverOpenMode = "replace" | "stack";

export type PopoverPanelEntry = {
  id: string;
  key: string;
  params: unknown;
};

export type PopoverSnapshot = {
  entries: ReadonlyArray<PopoverPanelEntry>;
};

export type PopoverStoreOptions = {
  idPrefix: string;
};

/**
 * `useSyncExternalStore` 등에 넘길 수 있는 팝오버 패널 스택 스토어.
 * `key`·`params`는 호출 측 도메인 문자열/데이터이며, 여기서는 해석하지 않습니다.
 */
export type PopoverStore = {
  getSnapshot: () => PopoverSnapshot;
  subscribe: StoreCore<PopoverSnapshot>["subscribe"];
  openPanel: (
    key: string,
    params: unknown,
    options?: { mode?: PopoverOpenMode },
  ) => void;
  closeTopPanel: () => void;
  closeAllPanels: () => void;
};

const createEntryId = (prefix: string, sequence: number) =>
  `${prefix}-${sequence}`;

export function createPopoverStore(
  options: PopoverStoreOptions,
  initialSnapshot: PopoverSnapshot = { entries: [] },
): PopoverStore {
  const core = createStoreCore<PopoverSnapshot>(initialSnapshot);
  let sequence = 0;

  return {
    getSnapshot: core.getSnapshot,
    subscribe: core.subscribe,
    openPanel: (key, params, opts) => {
      const mode = opts?.mode ?? "replace";
      sequence += 1;
      const entry: PopoverPanelEntry = {
        id: createEntryId(options.idPrefix, sequence),
        key,
        params,
      };
      core.updateSnapshot((prev) => {
        if (mode === "stack") {
          return { entries: [...prev.entries, entry] };
        }
        return { entries: [entry] };
      });
    },
    closeTopPanel: () => {
      core.updateSnapshot((prev) => ({
        entries: prev.entries.slice(0, -1),
      }));
    },
    closeAllPanels: () => {
      core.setSnapshot({ entries: [] });
    },
  };
}
