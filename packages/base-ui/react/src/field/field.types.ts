import type * as React from "react";

export type FieldContextValue = {
  readonly controlId: string;
  readonly descriptionId: string;
  readonly disabled: boolean;
  readonly errorId: string;
  readonly invalid: boolean;
  readonly required: boolean;
};

export type FieldControlRenderProps = {
  readonly "aria-describedby": string;
  readonly "aria-invalid": true | undefined;
  readonly disabled: boolean;
  readonly id: string;
  readonly required: boolean;
};

export type FieldRootProps = React.ComponentPropsWithRef<"div"> & {
  readonly controlId?: string;
  readonly disabled?: boolean;
  readonly invalid?: boolean;
  readonly required?: boolean;
};

export type FieldLabelProps = React.ComponentPropsWithRef<"label">;

export type FieldControlProps = {
  readonly children: (props: FieldControlRenderProps) => React.ReactNode;
};

export type FieldDescriptionProps = Omit<
  React.ComponentPropsWithRef<"p">,
  "id"
>;

export type FieldErrorProps = Omit<React.ComponentPropsWithRef<"p">, "id">;
