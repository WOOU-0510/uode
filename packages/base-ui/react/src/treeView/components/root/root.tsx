import * as React from "react";
import {
  areOrderedValuesEqual,
  getTreeViewExpandedValuesAfterChange,
  normalizeTreeViewExpandedValues,
} from "@uode/base-ui-core";
import { assignRef } from "../../../utils/assignRef";
import { TreeViewContext } from "../../treeView.context";
import { getAvailableTreeItems } from "../../treeView.dom";
import { useTreeViewState } from "../../treeView.hook";
import type {
  TreeViewContextValue,
  TreeViewController,
} from "../../treeView.types";

export type TreeViewRootProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "defaultValue" | "onChange" | "role" | "tabIndex"
> & {
  readonly defaultExpandedValues?: readonly string[];
  readonly defaultFocusedValue?: string | null;
  readonly defaultSelectedValue?: string | null;
  readonly expandedValues?: readonly string[];
  readonly focusedValue?: string | null;
  readonly onExpandedValuesChange?: (values: readonly string[]) => void;
  readonly onFocusedValueChange?: (value: string | null) => void;
  readonly onSelectedValueChange?: (value: string | null) => void;
  readonly selectedValue?: string | null;
};

type TreeViewRootComponentProps = TreeViewRootProps;

export const TreeViewRoot = (props: TreeViewRootComponentProps) => {
  const {
    children,
    defaultExpandedValues = [],
    defaultFocusedValue,
    defaultSelectedValue = null,
    expandedValues: expandedValuesProp,
    focusedValue: focusedValueProp,
    onExpandedValuesChange,
    onFocus,
    onFocusedValueChange,
    onSelectedValueChange,
    ref,
    selectedValue: selectedValueProp,
    ...rest
  } = props;
  const internalState = useTreeViewState({
    defaultExpandedValues,
    defaultFocusedValue:
      defaultFocusedValue ?? selectedValueProp ?? defaultSelectedValue,
    defaultSelectedValue: selectedValueProp ?? defaultSelectedValue,
  });
  const rootRef = React.useRef<HTMLDivElement>(null);
  const expandedValues = normalizeTreeViewExpandedValues(
    expandedValuesProp ?? internalState.expandedValues,
  );
  const focusedValue = focusedValueProp ?? internalState.focusedValue;
  const selectedValue = selectedValueProp ?? internalState.selectedValue;
  const setRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      rootRef.current = node;
      assignRef(ref, node);
    },
    [ref],
  );
  const select = React.useCallback(
    (value: string) => {
      if (value === selectedValue) return;
      if (selectedValueProp === undefined) {
        internalState.setSelectedValue(value);
      }
      onSelectedValueChange?.(value);
    },
    [internalState, onSelectedValueChange, selectedValue, selectedValueProp],
  );
  const setExpanded = React.useCallback(
    (value: string, expanded: boolean) => {
      const nextValues = getTreeViewExpandedValuesAfterChange(
        expandedValues,
        value,
        expanded,
      );
      if (areOrderedValuesEqual(nextValues, expandedValues)) return;
      if (expandedValuesProp === undefined) {
        internalState.setExpandedValues(nextValues);
      }
      onExpandedValuesChange?.(nextValues);
    },
    [expandedValues, expandedValuesProp, internalState, onExpandedValuesChange],
  );
  const setFocusedValue = React.useCallback(
    (value: string) => {
      if (value === focusedValue) return;
      if (focusedValueProp === undefined) {
        internalState.setFocusedValue(value);
      }
      onFocusedValueChange?.(value);
    },
    [focusedValue, focusedValueProp, internalState, onFocusedValueChange],
  );
  const controller = React.useMemo(
    (): TreeViewController => ({
      expandedValues,
      focusedValue,
      selectedValue,
      select,
      setExpanded,
      setFocusedValue,
    }),
    [
      expandedValues,
      focusedValue,
      select,
      selectedValue,
      setExpanded,
      setFocusedValue,
    ],
  );
  const value = React.useMemo(
    (): TreeViewContextValue => ({ controller, rootRef }),
    [controller],
  );
  const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
    onFocus?.(event);
    if (event.defaultPrevented || event.target !== event.currentTarget) return;
    getAvailableTreeItems(event.currentTarget)[0]?.focus();
  };

  return (
    <TreeViewContext value={value}>
      <div
        {...rest}
        ref={setRef}
        role="tree"
        tabIndex={focusedValue === null ? 0 : undefined}
        onFocus={handleFocus}
      >
        {children}
      </div>
    </TreeViewContext>
  );
};
