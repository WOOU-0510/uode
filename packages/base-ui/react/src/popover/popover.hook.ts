import * as React from "react";
import {
  createPopoverStore,
  type PopoverSnapshot,
  type PopoverStore,
} from "@uode/base-ui-core";
import { useStoreSnapshot } from "../utils/useStoreSnapshot";
import { PopoverContext } from "./popover.context";
import type {
  PopoverController,
  PopoverState,
  PopoverStateOptions,
} from "./popover.types";

export const usePopoverState = (
  options: PopoverStateOptions = {},
): PopoverState => {
  const generatedIdPrefix = React.useId();
  const { snapshot, store } = useStoreSnapshot<PopoverSnapshot, PopoverStore>(
    () =>
      createPopoverStore(
        { idPrefix: options.idPrefix ?? generatedIdPrefix },
        { entries: options.defaultEntries ?? [] },
      ),
  );
  const topEntry = snapshot.entries.at(-1) ?? null;

  return React.useMemo(
    () => ({
      entries: snapshot.entries,
      topEntry,
      setEntries: store.setEntries,
      openPanel: store.openPanel,
      closeTopPanel: store.closeTopPanel,
      closeAllPanels: store.closeAllPanels,
    }),
    [snapshot.entries, store, topEntry],
  );
};

export const usePopoverController = (): PopoverController => {
  const context = React.use(PopoverContext);
  if (context === null) {
    throw new Error(
      "usePopoverController는 Popover.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  return context.controller;
};
