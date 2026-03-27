"use client";

import type * as React from "react";

type OpenMode = "replace" | "stack";

export type PopoverPanelEntry = {
  id: string;
  key: string;
  params: unknown;
};

export type PopoverController = {
  entries: ReadonlyArray<PopoverPanelEntry>;
  topEntry: PopoverPanelEntry | null;
  openPanel: (key: string, params: unknown, options?: { mode?: OpenMode }) => void;
  closeTopPanel: () => void;
  closeAllPanels: () => void;
};

export type PopoverContextValue = {
  rootRef: React.RefObject<HTMLDivElement | null>;
  controller: PopoverController;
};
