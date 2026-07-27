import * as React from "react";
import { RadioGroupContext } from "../../radioGroup.context";
import type {
  RadioGroupContextValue,
  RadioGroupRootProps,
} from "../../radioGroup.types";

export const RadioGroupRoot = (props: RadioGroupRootProps) => {
  const { children, disabled = false, name, required = false, ...rest } = props;
  const context = React.useMemo(
    (): RadioGroupContextValue => ({ disabled, name, required }),
    [disabled, name, required],
  );

  return (
    <RadioGroupContext value={context}>
      <fieldset {...rest} disabled={disabled}>
        {children}
      </fieldset>
    </RadioGroupContext>
  );
};
