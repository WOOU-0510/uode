import { createStoreCore, type StoreCore } from "../store";
import {
  addUniqueValue,
  areOrderedValuesEqual,
  getUniqueValues,
  removeValue,
} from "../collection";

export type TreeViewSnapshot = {
  readonly expandedValues: readonly string[];
  readonly focusedValue: string | null;
  readonly selectedValue: string | null;
};

export type TreeViewStoreOptions = {
  readonly initialExpandedValues?: readonly string[];
  readonly initialFocusedValue?: string | null;
  readonly initialSelectedValue?: string | null;
};

export const normalizeTreeViewExpandedValues = (
  values: readonly string[],
): readonly string[] => getUniqueValues(values);

export const getTreeViewExpandedValuesAfterChange = (
  values: readonly string[],
  value: string,
  expanded: boolean,
): readonly string[] =>
  expanded ? addUniqueValue(values, value) : removeValue(values, value);

export type TreeViewStore = {
  readonly getSnapshot: () => TreeViewSnapshot;
  readonly subscribe: StoreCore<TreeViewSnapshot>["subscribe"];
  readonly setExpanded: (value: string, expanded: boolean) => void;
  readonly setExpandedValues: (values: readonly string[]) => void;
  readonly setFocusedValue: (value: string | null) => void;
  readonly setSelectedValue: (value: string | null) => void;
};

export const createTreeViewStore = (
  options: TreeViewStoreOptions = {},
): TreeViewStore => {
  const core = createStoreCore<TreeViewSnapshot>({
    expandedValues: normalizeTreeViewExpandedValues(
      options.initialExpandedValues ?? [],
    ),
    focusedValue: options.initialFocusedValue ?? null,
    selectedValue: options.initialSelectedValue ?? null,
  });

  const setExpandedValues = (values: readonly string[]) => {
    const expandedValues = normalizeTreeViewExpandedValues(values);
    core.updateSnapshot((snapshot) => {
      const unchanged = areOrderedValuesEqual(
        snapshot.expandedValues,
        expandedValues,
      );
      return unchanged ? snapshot : { ...snapshot, expandedValues };
    });
  };

  return {
    getSnapshot: core.getSnapshot,
    subscribe: core.subscribe,
    setExpanded: (value, expanded) => {
      setExpandedValues(
        getTreeViewExpandedValuesAfterChange(
          core.getSnapshot().expandedValues,
          value,
          expanded,
        ),
      );
    },
    setExpandedValues,
    setFocusedValue: (focusedValue) => {
      core.updateSnapshot((snapshot) =>
        snapshot.focusedValue === focusedValue
          ? snapshot
          : { ...snapshot, focusedValue },
      );
    },
    setSelectedValue: (selectedValue) => {
      core.updateSnapshot((snapshot) =>
        snapshot.selectedValue === selectedValue
          ? snapshot
          : { ...snapshot, selectedValue },
      );
    },
  };
};
