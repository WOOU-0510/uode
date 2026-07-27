import { useFieldContext } from "../../field.context";
import type { FieldErrorProps } from "../../field.types";

export const FieldError = (props: FieldErrorProps) => {
  const { role, ...rest } = props;
  const context = useFieldContext();

  return (
    <p
      {...rest}
      id={context.errorId}
      role={role ?? (context.invalid ? "alert" : undefined)}
    />
  );
};
