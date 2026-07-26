import * as React from "react";
import {
  areOrderedValuesEqual,
  createPopoverPanelEntry,
  getPopoverEntriesAfterCloseTop,
  getPopoverEntriesAfterOpen,
  type PopoverPanelEntry,
} from "@uode/base-ui-core";
import { PopoverContext } from "../../popover.context";
import { usePopoverState } from "../../popover.hook";
import type {
  PopoverController,
  PopoverContextValue,
} from "../../popover.types";

export type PopoverRootProps = {
  readonly children: React.ReactNode;
  readonly defaultEntries?: ReadonlyArray<PopoverPanelEntry>;
  readonly entries?: ReadonlyArray<PopoverPanelEntry>;
  readonly onEntriesChange?: (
    entries: ReadonlyArray<PopoverPanelEntry>,
  ) => void;
};

type PopoverRootComponentProps = PopoverRootProps;

export const PopoverRoot = (props: PopoverRootComponentProps) => {
  const {
    children,
    defaultEntries,
    entries: entriesProp,
    onEntriesChange,
  } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelIdPrefix = React.useId();
  const sequenceRef = React.useRef(0);
  const internalState = usePopoverState({
    defaultEntries,
    idPrefix: panelIdPrefix,
  });
  const entries = entriesProp ?? internalState.entries;
  const topEntry = entries.at(-1) ?? null;
  const setEntries = React.useCallback(
    (nextEntries: ReadonlyArray<PopoverPanelEntry>) => {
      if (areOrderedValuesEqual(entries, nextEntries)) return;
      if (entriesProp === undefined) {
        internalState.setEntries(nextEntries);
      }
      onEntriesChange?.(nextEntries);
    },
    [entries, entriesProp, internalState, onEntriesChange],
  );
  const openPanel = React.useCallback(
    (
      key: string,
      params: unknown,
      options?: { mode?: "replace" | "stack" },
    ) => {
      sequenceRef.current += 1;
      const entry = createPopoverPanelEntry(
        panelIdPrefix,
        sequenceRef.current,
        key,
        params,
      );
      setEntries(
        getPopoverEntriesAfterOpen(entries, entry, options?.mode ?? "replace"),
      );
    },
    [entries, panelIdPrefix, setEntries],
  );
  const closeTopPanel = React.useCallback(() => {
    setEntries(getPopoverEntriesAfterCloseTop(entries));
  }, [entries, setEntries]);
  const closeAllPanels = React.useCallback(() => {
    setEntries([]);
  }, [setEntries]);

  const controller = React.useMemo(
    (): PopoverController => ({
      entries,
      topEntry,
      openPanel,
      closeTopPanel,
      closeAllPanels,
    }),
    [closeAllPanels, closeTopPanel, entries, openPanel, topEntry],
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

  return <PopoverContext value={value}>{children}</PopoverContext>;
};
