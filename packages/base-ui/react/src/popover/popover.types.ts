import type * as React from "react";
import type { PopoverOpenMode, PopoverPanelEntry } from "@uode/base-ui-core";

export type PopoverController = {
  entries: ReadonlyArray<PopoverPanelEntry>;
  topEntry: PopoverPanelEntry | null;
  openPanel: (
    key: string,
    params: unknown,
    options?: { mode?: PopoverOpenMode },
  ) => void;
  closeTopPanel: () => void;
  closeAllPanels: () => void;
};

export type PopoverStateOptions = {
  readonly defaultEntries?: ReadonlyArray<PopoverPanelEntry>;
  readonly idPrefix?: string;
};

export type PopoverState = PopoverController & {
  readonly setEntries: (entries: ReadonlyArray<PopoverPanelEntry>) => void;
};

export type PopoverContextValue = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  controller: PopoverController;
};
