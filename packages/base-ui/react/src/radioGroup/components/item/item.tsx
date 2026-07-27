import { useRadioGroupContext } from "../../radioGroup.context";
import type { RadioGroupItemProps } from "../../radioGroup.types";

export const RadioGroupItem = (props: RadioGroupItemProps) => {
  const { disabled = false, required: requiredProp, ...rest } = props;
  const context = useRadioGroupContext();

  return (
    <input
      {...rest}
      type="radio"
      name={context.name}
      disabled={context.disabled || disabled}
      required={requiredProp ?? context.required}
    />
  );
};
