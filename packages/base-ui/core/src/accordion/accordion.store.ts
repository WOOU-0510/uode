import { createStoreCore, type StoreCore } from "../store";
import {
  addUniqueValue,
  areOrderedValuesEqual,
  getUniqueValues,
  removeValue,
} from "../collection";

export type AccordionType = "single" | "multiple";

export type AccordionSnapshot = {
  readonly expandedValues: readonly string[];
};

export type AccordionStoreOptions = {
  readonly type?: AccordionType;
  readonly initialExpandedValues?: readonly string[];
};

export const normalizeAccordionExpandedValues = (
  type: AccordionType,
  values: readonly string[],
): readonly string[] => {
  switch (type) {
    case "single":
      return values.slice(0, 1);
    case "multiple":
      return getUniqueValues(values);
  }
};

export const getAccordionExpandedValuesAfterExpand = (
  type: AccordionType,
  values: readonly string[],
  value: string,
): readonly string[] => {
  if (type === "single") return [value];
  return addUniqueValue(values, value);
};

export const getAccordionExpandedValuesAfterCollapse = (
  values: readonly string[],
  value: string,
): readonly string[] => removeValue(values, value);

export type AccordionStore = {
  readonly getSnapshot: () => AccordionSnapshot;
  readonly subscribe: StoreCore<AccordionSnapshot>["subscribe"];
  readonly setExpandedValues: (values: readonly string[]) => void;
  readonly expand: (value: string) => void;
  readonly collapse: (value: string) => void;
  readonly toggle: (value: string) => void;
  readonly isExpanded: (value: string) => boolean;
};

export const createAccordionStore = (
  options: AccordionStoreOptions = {},
): AccordionStore => {
  const type = options.type ?? "single";
  const initialExpandedValues = options.initialExpandedValues ?? [];
  const initialSnapshot: AccordionSnapshot = {
    expandedValues: normalizeAccordionExpandedValues(
      type,
      initialExpandedValues,
    ),
  };
  const core = createStoreCore(initialSnapshot);

  const setExpandedValues = (values: readonly string[]) => {
    const expandedValues = normalizeAccordionExpandedValues(type, values);
    core.updateSnapshot((snapshot) => {
      const unchanged = areOrderedValuesEqual(
        snapshot.expandedValues,
        expandedValues,
      );
      if (unchanged) return snapshot;
      return { expandedValues };
    });
  };

  const expand = (value: string) => {
    const snapshot = core.getSnapshot();
    setExpandedValues(
      getAccordionExpandedValuesAfterExpand(
        type,
        snapshot.expandedValues,
        value,
      ),
    );
  };

  const collapse = (value: string) => {
    const snapshot = core.getSnapshot();
    setExpandedValues(
      getAccordionExpandedValuesAfterCollapse(snapshot.expandedValues, value),
    );
  };

  return {
    getSnapshot: core.getSnapshot,
    subscribe: core.subscribe,
    setExpandedValues,
    expand,
    collapse,
    toggle: (value) => {
      if (core.getSnapshot().expandedValues.includes(value)) {
        collapse(value);
        return;
      }
      expand(value);
    },
    isExpanded: (value) => core.getSnapshot().expandedValues.includes(value),
  };
};
