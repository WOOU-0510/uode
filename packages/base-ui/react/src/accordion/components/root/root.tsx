import * as React from "react";
import {
  getAccordionExpandedValuesAfterCollapse,
  getAccordionExpandedValuesAfterExpand,
  normalizeAccordionExpandedValues,
  type AccordionType,
} from "@uode/base-ui-core";
import { AccordionContext } from "../../accordion.context";
import { useAccordionState } from "../../accordion.hook";
import type {
  AccordionContextValue,
  AccordionController,
} from "../../accordion.types";

export type AccordionRootProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
> & {
  readonly children: React.ReactNode;
  readonly type?: AccordionType;
  readonly expandedValues?: readonly string[];
  readonly defaultExpandedValues?: readonly string[];
  readonly onExpandedValuesChange?: (values: readonly string[]) => void;
};

type AccordionRootComponentProps = AccordionRootProps;

export const AccordionRoot = (props: AccordionRootComponentProps) => {
  const {
    children,
    type = "single",
    expandedValues: expandedValuesProp,
    defaultExpandedValues,
    onExpandedValuesChange,
    ...rest
  } = props;
  const internalState = useAccordionState({
    type,
    defaultExpandedValues,
  });
  const expandedValues =
    expandedValuesProp === undefined
      ? normalizeAccordionExpandedValues(type, internalState.expandedValues)
      : normalizeAccordionExpandedValues(type, expandedValuesProp);
  const setExpandedValues = React.useCallback(
    (nextExpandedValues: readonly string[]) => {
      const normalizedExpandedValues = normalizeAccordionExpandedValues(
        type,
        nextExpandedValues,
      );
      const unchanged =
        expandedValues.length === normalizedExpandedValues.length &&
        expandedValues.every(
          (expandedValue, index) =>
            expandedValue === normalizedExpandedValues[index],
        );
      if (unchanged) return;
      if (expandedValuesProp === undefined) {
        internalState.setExpandedValues(normalizedExpandedValues);
      }
      onExpandedValuesChange?.(normalizedExpandedValues);
    },
    [
      expandedValues,
      expandedValuesProp,
      internalState,
      onExpandedValuesChange,
      type,
    ],
  );
  const controller = React.useMemo(
    (): AccordionController => ({
      expandedValues,
      setExpandedValues,
      expand: (value) => {
        setExpandedValues(
          getAccordionExpandedValuesAfterExpand(type, expandedValues, value),
        );
      },
      collapse: (value) => {
        setExpandedValues(
          getAccordionExpandedValuesAfterCollapse(expandedValues, value),
        );
      },
      toggle: (value) => {
        if (expandedValues.includes(value)) {
          setExpandedValues(
            getAccordionExpandedValuesAfterCollapse(expandedValues, value),
          );
          return;
        }
        setExpandedValues(
          getAccordionExpandedValuesAfterExpand(type, expandedValues, value),
        );
      },
      isExpanded: (value) => expandedValues.includes(value),
    }),
    [expandedValues, setExpandedValues, type],
  );
  const value = React.useMemo(
    (): AccordionContextValue => ({ controller }),
    [controller],
  );

  return (
    <AccordionContext value={value}>
      <div {...rest} data-type={type}>
        {children}
      </div>
    </AccordionContext>
  );
};
