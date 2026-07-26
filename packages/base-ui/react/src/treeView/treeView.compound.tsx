import type * as React from "react";
import { TreeViewGroup, TreeViewItem, TreeViewRoot } from "./components";
import type { TreeViewGroupProps } from "./components/group";
import type { TreeViewItemProps } from "./components/item";
import type { TreeViewRootProps } from "./components/root";
import { useTreeViewController, useTreeViewState } from "./treeView.hook";
import type {
  TreeViewController,
  TreeViewState,
  TreeViewStateOptions,
} from "./treeView.types";

export type TreeViewCompound = {
  Root: (props: TreeViewRootProps) => React.ReactNode;
  Item: (props: TreeViewItemProps) => React.ReactNode;
  Group: (props: TreeViewGroupProps) => React.ReactNode;
  useState: (options?: TreeViewStateOptions) => TreeViewState;
  useController: () => TreeViewController;
};

export const TreeView: TreeViewCompound = Object.assign(TreeViewRoot, {
  Root: TreeViewRoot,
  Item: TreeViewItem,
  Group: TreeViewGroup,
  useState: useTreeViewState,
  useController: useTreeViewController,
});

export namespace TreeView {
  export type Controller = TreeViewController;
  export type State = TreeViewState;
  export type StateOptions = TreeViewStateOptions;
  export type RootProps = TreeViewRootProps;
  export type ItemProps = TreeViewItemProps;
  export type GroupProps = TreeViewGroupProps;
}
