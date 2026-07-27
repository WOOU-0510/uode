import type * as React from "react";

export type NativeSelectOptGroupProps = React.ComponentPropsWithRef<"optgroup">;

export const NativeSelectOptGroup = (props: NativeSelectOptGroupProps) => (
  <optgroup {...props} />
);
