import * as React from "react";
import { TreeViewItemContext } from "./treeView.item.context";
import type { TreeViewItemContextValue } from "./treeView.types";

export const useTreeViewItem = (): TreeViewItemContextValue => {
  const context = React.use(TreeViewItemContext);
  if (context === null) {
    throw new Error(
      "TreeView.Group은 TreeView.Item 안에서만 사용할 수 있습니다.",
    );
  }
  return context;
};
