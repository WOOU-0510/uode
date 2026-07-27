import * as React from "react";
import { FieldContext } from "../../field.context";
import type { FieldContextValue, FieldRootProps } from "../../field.types";

export const FieldRoot = (props: FieldRootProps) => {
  const {
    children,
    controlId: controlIdProp,
    disabled = false,
    invalid = false,
    required = false,
    ...rest
  } = props;
  const generatedId = React.useId();
  const controlId = controlIdProp ?? `${generatedId}-control`;
  const context = React.useMemo(
    (): FieldContextValue => ({
      controlId,
      descriptionId: `${controlId}-description`,
      disabled,
      errorId: `${controlId}-error`,
      invalid,
      required,
    }),
    [controlId, disabled, invalid, required],
  );

  return (
    <FieldContext value={context}>
      <div
        {...rest}
        data-disabled={disabled ? "" : undefined}
        data-invalid={invalid ? "" : undefined}
        data-required={required ? "" : undefined}
      >
        {children}
      </div>
    </FieldContext>
  );
};
