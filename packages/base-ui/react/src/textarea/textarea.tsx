import type * as React from "react";

export type TextareaProps = React.ComponentPropsWithRef<"textarea">;

export const Textarea = (props: TextareaProps) => <textarea {...props} />;
