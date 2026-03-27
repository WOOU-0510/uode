"use client";

import * as React from "react";
import { PopoverContext } from "../popover.context";
import type {
  PopoverController,
  PopoverContextValue,
  PopoverPanelEntry,
} from "../popover.types";

const createPanelId = (prefix: string, sequence: number) => {
  return `${prefix}-${sequence}`;
};

export type PopoverRootProps = {
  children: React.ReactNode;
  onPointerDownOutside?: (
    controller: PopoverController,
    event: PointerEvent,
  ) => void;
};

type PopoverRootComponentProps = PopoverRootProps;

export const PopoverRoot = (props: PopoverRootComponentProps) => {
  const { children, onPointerDownOutside } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const panelIdPrefix = React.useId();
  const panelSequenceRef = React.useRef(0);
  const [entries, setEntries] = React.useState<Array<PopoverPanelEntry>>([]);

  const topEntry = entries.length > 0 ? entries[entries.length - 1] : null;

  const openPanel = React.useCallback<PopoverController["openPanel"]>(
    (key, params, options) => {
      const mode = options?.mode ?? "replace";
      const nextSequence = panelSequenceRef.current + 1;
      panelSequenceRef.current = nextSequence;
      const entry: PopoverPanelEntry = {
        id: createPanelId(panelIdPrefix, nextSequence),
        key,
        params,
      };

      setEntries((prev) => {
        if (mode === "stack") {
          return [...prev, entry];
        }
        return [entry];
      });
    },
    [panelIdPrefix],
  );

  const closeTopPanel = React.useCallback(() => {
    setEntries((prev) => prev.slice(0, -1));
  }, []);

  const closeAllPanels = React.useCallback(() => {
    setEntries([]);
  }, []);

  const controller = React.useMemo(
    (): PopoverController => ({
      entries,
      topEntry,
      openPanel,
      closeTopPanel,
      closeAllPanels,
    }),
    [entries, topEntry, openPanel, closeTopPanel, closeAllPanels],
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

  React.useEffect(() => {
    if (controller.topEntry === null) return;
    if (onPointerDownOutside === undefined) return;

    const onPointerDown = (event: PointerEvent) => {
      const node = rootRef.current;
      if (node === null) return;
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (node.contains(target)) return;
      onPointerDownOutside(controller, event);
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [controller, controller.topEntry, onPointerDownOutside]);

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
