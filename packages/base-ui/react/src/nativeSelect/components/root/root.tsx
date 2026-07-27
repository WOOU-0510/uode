import type * as React from "react";

export type NativeSelectRootProps = React.ComponentPropsWithRef<"select">;

export const NativeSelectRoot = (props: NativeSelectRootProps) => (
  <select {...props} />
);
