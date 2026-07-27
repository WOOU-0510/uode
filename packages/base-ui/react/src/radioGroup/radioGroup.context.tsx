import * as React from "react";
import type { RadioGroupContextValue } from "./radioGroup.types";

export const RadioGroupContext =
  React.createContext<RadioGroupContextValue | null>(null);

export const useRadioGroupContext = (): RadioGroupContextValue => {
  const context = React.use(RadioGroupContext);
  if (context === null) {
    throw new Error(
      "RadioGroup 컴포넌트는 RadioGroup.Root 안에서만 사용할 수 있습니다.",
    );
  }
  return context;
};
