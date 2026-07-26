import * as React from "react";
import type { TreeViewContextValue } from "./treeView.types";

export const TreeViewContext = React.createContext<TreeViewContextValue | null>(
  null,
);
