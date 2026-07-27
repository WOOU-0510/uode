import type * as React from "react";

export type NativeSelectOptionProps = React.ComponentPropsWithRef<"option">;

export const NativeSelectOption = (props: NativeSelectOptionProps) => (
  <option {...props} />
);
