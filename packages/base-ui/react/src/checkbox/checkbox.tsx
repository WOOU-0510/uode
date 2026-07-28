import * as React from "react";
import { assignRef } from "../utils/assignRef";

export type CheckboxProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type"
> & {
  readonly indeterminate?: boolean;
};

export type CheckboxIndicatorProps = React.ComponentPropsWithRef<"span">;

const CheckboxControl = (props: CheckboxProps) => {
  const {
    "aria-checked": ariaChecked,
    indeterminate = false,
    ref,
    ...rest
  } = props;
  const setRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (node !== null) {
        node.indeterminate = indeterminate;
      }
      assignRef(ref, node);
    },
    [indeterminate, ref],
  );

  return (
    <input
      {...rest}
      ref={setRef}
      type="checkbox"
      data-part="control"
      aria-checked={indeterminate ? "mixed" : ariaChecked}
    />
  );
};

const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const { ...rest } = props;
  return <span {...rest} aria-hidden="true" data-part="indicator" />;
};

export type CheckboxCompound = typeof CheckboxControl & {
  readonly Indicator: typeof CheckboxIndicator;
};

export const Checkbox: CheckboxCompound = Object.assign(CheckboxControl, {
  Indicator: CheckboxIndicator,
});
