import type * as React from "react";

export type TreeViewController = {
  readonly expandedValues: readonly string[];
  readonly focusedValue: string | null;
  readonly selectedValue: string | null;
  readonly select: (value: string) => void;
  readonly setExpanded: (value: string, expanded: boolean) => void;
  readonly setFocusedValue: (value: string) => void;
};

export type TreeViewStateOptions = {
  readonly defaultExpandedValues?: readonly string[];
  readonly defaultFocusedValue?: string | null;
  readonly defaultSelectedValue?: string | null;
};

export type TreeViewState = {
  readonly expandedValues: readonly string[];
  readonly focusedValue: string | null;
  readonly selectedValue: string | null;
  readonly setExpanded: (value: string, expanded: boolean) => void;
  readonly setExpandedValues: (values: readonly string[]) => void;
  readonly setFocusedValue: (value: string | null) => void;
  readonly setSelectedValue: (value: string | null) => void;
};

export type TreeViewContextValue = {
  readonly controller: TreeViewController;
  readonly rootRef: React.RefObject<HTMLDivElement | null>;
};

export type TreeViewItemContextValue = {
  readonly expanded: boolean;
};
