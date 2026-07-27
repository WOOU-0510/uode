import type * as React from "react";

export type InputProps = React.ComponentPropsWithRef<"input">;

export const Input = (props: InputProps) => <input {...props} />;
