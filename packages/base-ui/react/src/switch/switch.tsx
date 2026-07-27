import type * as React from "react";

export type SwitchProps = Omit<
  React.ComponentPropsWithRef<"input">,
  "role" | "type"
>;

export const Switch = (props: SwitchProps) => (
  // biome-ignore lint/a11y/useAriaPropsForRole: native checkbox의 checked 상태가 switch 접근성 상태로 노출됩니다.
  <input {...props} type="checkbox" role="switch" />
);
