import { useFieldContext } from "../../field.context";
import type { FieldControlProps } from "../../field.types";

export const FieldControl = (props: FieldControlProps) => {
  const { children } = props;
  const context = useFieldContext();
  const describedBy = context.invalid
    ? `${context.descriptionId} ${context.errorId}`
    : context.descriptionId;

  return children({
    "aria-describedby": describedBy,
    "aria-invalid": context.invalid ? true : undefined,
    disabled: context.disabled,
    id: context.controlId,
    required: context.required,
  });
};
