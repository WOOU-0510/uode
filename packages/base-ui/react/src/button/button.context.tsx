import * as React from "react";
import type { ButtonContextValue } from "./button.types";

export const ButtonContext = React.createContext<ButtonContextValue | null>(
  null,
);
