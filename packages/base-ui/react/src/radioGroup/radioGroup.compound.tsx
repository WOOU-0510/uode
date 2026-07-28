import type * as React from "react";
import { RadioGroupItem, RadioGroupLegend, RadioGroupRoot } from "./components";

export type RadioGroupIndicatorProps = React.ComponentPropsWithRef<"span">;

const RadioGroupIndicator = (props: RadioGroupIndicatorProps) => {
  const { ...rest } = props;
  return <span {...rest} aria-hidden="true" data-part="indicator" />;
};

export type RadioGroupCompound = typeof RadioGroupRoot & {
  readonly Root: typeof RadioGroupRoot;
  readonly Legend: typeof RadioGroupLegend;
  readonly Item: typeof RadioGroupItem;
  readonly Indicator: typeof RadioGroupIndicator;
};

export const RadioGroup: RadioGroupCompound = Object.assign(RadioGroupRoot, {
  Root: RadioGroupRoot,
  Legend: RadioGroupLegend,
  Item: RadioGroupItem,
  Indicator: RadioGroupIndicator,
});
