import * as React from "react";
import { assignRef } from "../utils/assignRef";

export type CheckboxProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "type"
> & {
  readonly indeterminate?: boolean;
};

export const Checkbox = (props: CheckboxProps) => {
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
      aria-checked={indeterminate ? "mixed" : ariaChecked}
    />
  );
};
