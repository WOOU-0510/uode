import * as React from "react";
import {
  createAccordionStore,
  type AccordionSnapshot,
  type AccordionStore,
} from "@uode/base-ui-core";
import { useStoreSnapshot } from "../utils/useStoreSnapshot";
import { AccordionContext } from "./accordion.context";
import type {
  AccordionController,
  AccordionState,
  AccordionStateOptions,
} from "./accordion.types";

export const useAccordionState = (
  options: AccordionStateOptions = {},
): AccordionState => {
  const { snapshot, store } = useStoreSnapshot<
    AccordionSnapshot,
    AccordionStore
  >(() =>
    createAccordionStore({
      type: options.type,
      initialExpandedValues: options.defaultExpandedValues,
    }),
  );

  return React.useMemo(
    () => ({
      expandedValues: snapshot.expandedValues,
      setExpandedValues: store.setExpandedValues,
      expand: store.expand,
      collapse: store.collapse,
      toggle: store.toggle,
      isExpanded: (value: string) => snapshot.expandedValues.includes(value),
    }),
    [snapshot.expandedValues, store],
  );
};

export const useAccordionController = (): AccordionController => {
  const context = React.use(AccordionContext);
  if (context === null) {
    throw new Error(
      "useAccordionController는 Accordion.Root 내부에서만 사용할 수 있습니다.",
    );
  }
  return context.controller;
};
