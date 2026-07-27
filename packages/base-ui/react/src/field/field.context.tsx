import * as React from "react";
import type { FieldContextValue } from "./field.types";

export const FieldContext = React.createContext<FieldContextValue | null>(null);

export const useFieldContext = (): FieldContextValue => {
  const context = React.use(FieldContext);
  if (context === null) {
    throw new Error("Field 컴포넌트는 Field.Root 안에서만 사용할 수 있습니다.");
  }
  return context;
};
