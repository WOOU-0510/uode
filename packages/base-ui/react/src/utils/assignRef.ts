import type * as React from "react";

export const assignRef = <T>(
  ref: React.Ref<T> | undefined,
  value: T | null,
) => {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
};
