import * as React from "react";
import {
  createTreeViewStore,
  type TreeViewSnapshot,
  type TreeViewStore,
} from "@uode/base-ui-core";
import { useStoreSnapshot } from "../utils/useStoreSnapshot";
import { TreeViewContext } from "./treeView.context";
import type {
  TreeViewContextValue,
  TreeViewController,
  TreeViewState,
  TreeViewStateOptions,
} from "./treeView.types";

export const useTreeViewState = (
  options: TreeViewStateOptions = {},
): TreeViewState => {
  const { snapshot, store } = useStoreSnapshot<TreeViewSnapshot, TreeViewStore>(
    () =>
      createTreeViewStore({
        initialExpandedValues: options.defaultExpandedValues,
        initialFocusedValue:
          options.defaultFocusedValue ?? options.defaultSelectedValue,
        initialSelectedValue: options.defaultSelectedValue,
      }),
  );

  return React.useMemo(
    () => ({
      expandedValues: snapshot.expandedValues,
      focusedValue: snapshot.focusedValue,
      selectedValue: snapshot.selectedValue,
      setExpanded: store.setExpanded,
      setExpandedValues: store.setExpandedValues,
      setFocusedValue: store.setFocusedValue,
      setSelectedValue: store.setSelectedValue,
    }),
    [
      snapshot.expandedValues,
      snapshot.focusedValue,
      snapshot.selectedValue,
      store,
    ],
  );
};

export const useTreeViewContext = (): TreeViewContextValue => {
  const context = React.use(TreeViewContext);
  if (context === null) {
    throw new Error(
      "TreeView 컴포넌트는 TreeView.Root 안에서만 사용할 수 있습니다.",
    );
  }
  return context;
};

export const useTreeViewController = (): TreeViewController =>
  useTreeViewContext().controller;
