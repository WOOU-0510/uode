import type * as React from "react";

export type RadioGroupContextValue = {
  readonly disabled: boolean;
  readonly name: string;
  readonly required: boolean;
};

export type RadioGroupRootProps = React.ComponentPropsWithRef<"fieldset"> & {
  readonly name: string;
  readonly required?: boolean;
};

export type RadioGroupLegendProps = React.ComponentPropsWithRef<"legend">;

export type RadioGroupItemProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "name" | "type"
> & {
  readonly value: string;
};
