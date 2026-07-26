import * as React from "react";
import type { TreeViewItemContextValue } from "./treeView.types";

export const TreeViewItemContext =
  React.createContext<TreeViewItemContextValue | null>(null);
