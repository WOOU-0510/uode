import { useFieldContext } from "../../field.context";
import type { FieldDescriptionProps } from "../../field.types";

export const FieldDescription = (props: FieldDescriptionProps) => {
  const context = useFieldContext();
  return <p {...props} id={context.descriptionId} />;
};
