import { useFieldContext } from "../../field.context";
import type { FieldLabelProps } from "../../field.types";

export const FieldLabel = (props: FieldLabelProps) => {
  const { htmlFor, ...rest } = props;
  const context = useFieldContext();

  // biome-ignore lint/a11y/noLabelWithoutControl: Field.Context가 생성한 control id를 런타임에 연결합니다.
  return <label {...rest} htmlFor={htmlFor ?? context.controlId} />;
};
