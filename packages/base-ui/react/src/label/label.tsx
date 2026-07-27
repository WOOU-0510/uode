import type * as React from "react";

export type LabelProps = React.ComponentPropsWithRef<"label">;

// biome-ignore lint/a11y/noLabelWithoutControl: htmlFor 또는 중첩 control은 소비처가 native label props/children으로 제공합니다.
export const Label = (props: LabelProps) => <label {...props} />;
