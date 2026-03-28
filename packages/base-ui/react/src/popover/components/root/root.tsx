import * as React from "react";
import {
  createPopoverStore,
  type PopoverSnapshot,
  type PopoverStore,
} from "@uode/base-ui-core";
import { PopoverContext } from "../../popover.context";
import type {
  PopoverController,
  PopoverContextValue,
} from "../../popover.types";

/** `getServerSnapshot`은 매번 동일한 참조를 돌려줘야 합니다. */
const serverPopoverSnapshot: PopoverSnapshot = { entries: [] };

const getServerPopoverSnapshot = (): PopoverSnapshot => serverPopoverSnapshot;

export type PopoverRootProps = {
  children: React.ReactNode;
};

type PopoverRootComponentProps = PopoverRootProps;

export const PopoverRoot = (props: PopoverRootComponentProps) => {
  const { children } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelIdPrefix = React.useId();
  const storeRef = React.useRef<PopoverStore | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createPopoverStore({ idPrefix: panelIdPrefix });
  }
  const store = storeRef.current;

  const snapshot = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    getServerPopoverSnapshot,
  );

  const lastEntry = snapshot.entries.at(-1);
  const topEntry = lastEntry === undefined ? null : lastEntry;

  const controller = React.useMemo(
    (): PopoverController => ({
      entries: snapshot.entries,
      topEntry,
      openPanel: store.openPanel,
      closeTopPanel: store.closeTopPanel,
      closeAllPanels: store.closeAllPanels,
    }),
    [snapshot.entries, topEntry, store],
  );

  React.useEffect(() => {
    const node = rootRef.current;
    if (node === null) return;

    if (controller.topEntry !== null) {
      node.showPopover();
      return;
    }
    node.hidePopover();
  }, [controller.topEntry]);

  const value = React.useMemo(
    (): PopoverContextValue => ({
      rootRef,
      controller,
    }),
    [controller],
  );

  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};
